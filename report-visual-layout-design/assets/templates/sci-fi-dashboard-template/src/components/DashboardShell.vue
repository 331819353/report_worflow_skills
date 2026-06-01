<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { Component } from 'vue';
import {
  BarChart3,
  Download,
  Factory,
  Gauge,
  Maximize2,
  Menu,
  Network,
  RefreshCw,
  Settings,
  SlidersHorizontal,
} from '@lucide/vue';
import { customActionRegistry } from '../actions/registry';
import { resolveDataSource } from '../dataSources/registry';
import type { DashboardActionConfig, DashboardExpressionValue, DashboardWidgetActionEvent } from '../types/actions';
import type { DashboardFilterScope } from '../types/data-source';
import type { DashboardConfig, DashboardFilterGroup, DashboardFilterOption, NavItem, ThemeMode } from '../types/dashboard';
import { resolveDashboardParams, resolveDashboardValue } from '../utils/dashboardExpressions';
import WidgetRenderer from '../widgets/WidgetRenderer.vue';
import type { RegisteredWidgetConfig, WidgetContext } from '../widgets/types';

const props = defineProps<{
  config: DashboardConfig;
}>();

interface LayoutBlock {
  id: string;
  label: string;
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
}

interface ActiveModalState {
  id: string;
  params: Record<string, unknown>;
  sourceFilters: Record<string, string>;
  title?: string;
}

interface WidgetActionRuntime {
  event: DashboardWidgetActionEvent;
  widget: RegisteredWidgetConfig;
  context: WidgetContext;
}

interface PersistedDashboardState {
  navId?: string;
  filters?: Record<string, string>;
  theme?: ThemeMode;
  scrollX?: number;
  scrollY?: number;
}

const iconMap: Record<NavItem['icon'], Component> = {
  Gauge,
  Factory,
  BarChart3,
  Network,
  Settings,
};

const emptyGridMarks = new Set(['.', ' ']);

const getStaticFilterOptions = (group: DashboardFilterGroup) => group.options ?? [];

const getDefaultFiltersFromGroups = (groups: DashboardFilterGroup[]) =>
  Object.fromEntries(groups.map((group) => [group.id, getStaticFilterOptions(group)[0]?.id ?? '']));

const dashboardStateStorageKey = 'operation-cockpit:runtime-state';

const readPersistedDashboardState = (): PersistedDashboardState => {
  try {
    return JSON.parse(sessionStorage.getItem(dashboardStateStorageKey) ?? '{}') as PersistedDashboardState;
  } catch {
    return {};
  }
};

const normalizeScope = (scope?: DashboardFilterScope) => {
  if (!scope) {
    return [];
  }

  return Array.isArray(scope) ? scope : [scope];
};

const areStringRecordsEqual = (left: Record<string, string>, right: Record<string, string>) => {
  const keys = new Set([...Object.keys(left), ...Object.keys(right)]);

  return Array.from(keys).every((key) => (left[key] ?? '') === (right[key] ?? ''));
};

const normalizeLayoutRows = (rows?: string[]) => {
  const configuredRows = rows?.filter((row) => row.length > 0) ?? [];

  return configuredRows.length > 0 ? configuredRows : ['A'];
};

const buildLayoutBlocks = (rowsToBuild: string[]) => {
  const cells = new Map<string, string>();

  rowsToBuild.forEach((row, rowIndex) => {
    Array.from(row).forEach((label, columnIndex) => {
      if (!emptyGridMarks.has(label)) {
        cells.set(`${rowIndex}:${columnIndex}`, label);
      }
    });
  });

  const visited = new Set<string>();
  const blocks: LayoutBlock[] = [];
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const toKey = (row: number, column: number) => `${row}:${column}`;

  cells.forEach((label, cellKey) => {
    if (visited.has(cellKey)) {
      return;
    }

    const queue = [cellKey];
    const component: Array<[number, number]> = [];
    visited.add(cellKey);

    while (queue.length > 0) {
      const currentKey = queue.shift();

      if (!currentKey) {
        continue;
      }

      const [row, column] = currentKey.split(':').map(Number);
      component.push([row, column]);

      directions.forEach(([rowOffset, columnOffset]) => {
        const nextKey = toKey(row + rowOffset, column + columnOffset);

        if (!visited.has(nextKey) && cells.get(nextKey) === label) {
          visited.add(nextKey);
          queue.push(nextKey);
        }
      });
    }

    const rows = component.map(([row]) => row);
    const columns = component.map(([, column]) => column);
    const minRow = Math.min(...rows);
    const maxRow = Math.max(...rows);
    const minColumn = Math.min(...columns);
    const maxColumn = Math.max(...columns);
    const isRectangle = component.length === (maxRow - minRow + 1) * (maxColumn - minColumn + 1);

    if (isRectangle) {
      blocks.push({
        id: `${label}-${minRow}-${minColumn}`,
        label,
        columnStart: minColumn + 1,
        columnEnd: maxColumn + 2,
        rowStart: minRow + 1,
        rowEnd: maxRow + 2,
      });
      return;
    }

    component.forEach(([row, column]) => {
      blocks.push({
        id: `${label}-${row}-${column}`,
        label,
        columnStart: column + 1,
        columnEnd: column + 2,
        rowStart: row + 1,
        rowEnd: row + 2,
      });
    });
  });

  return blocks;
};

const persistedDashboardState = readPersistedDashboardState();
const defaultFilters = getDefaultFiltersFromGroups(props.config.filters);

const getInitialNavId = () => {
  if (persistedDashboardState.navId && props.config.nav.some((item) => item.id === persistedDashboardState.navId)) {
    return persistedDashboardState.navId;
  }

  return props.config.nav[0]?.id ?? '';
};

const getInitialFilters = () =>
  Object.fromEntries(
    props.config.filters.map((group) => [
      group.id,
      persistedDashboardState.filters?.[group.id] ?? defaultFilters[group.id] ?? '',
    ]),
  );

const getInitialTheme = (): ThemeMode => {
  if (persistedDashboardState.theme === 'dark' || persistedDashboardState.theme === 'light') {
    return persistedDashboardState.theme;
  }

  return props.config.screen.defaultTheme;
};

const activeNavId = ref(getInitialNavId());
const activeFilters = ref<Record<string, string>>(getInitialFilters());
const filterOptionMap = ref<Record<string, DashboardFilterOption[]>>({});
const widgetDataMap = ref<Record<string, unknown[]>>({});
const activeModal = ref<ActiveModalState | null>(null);
const isNavOpen = ref(props.config.screen.defaultNavOpen);
const isFiltersOpen = ref(props.config.screen.defaultFiltersOpen);
const theme = ref<ThemeMode>(getInitialTheme());
const pageScrollX = ref(0);
const openPanelStyle = {
  opacity: '1',
  pointerEvents: 'auto',
  transform: 'translateX(0)',
} as const;
const scrollTargets: EventTarget[] = [];

const activeNavItem = computed(() => props.config.nav.find((item) => item.id === activeNavId.value) ?? props.config.nav[0]);
const layoutRows = computed(() => normalizeLayoutRows(activeNavItem.value?.layoutRows));
const layoutColumnCount = computed(() => Math.max(...layoutRows.value.map((row) => Array.from(row).length), 1));
const layoutRowCount = computed(() => Math.max(layoutRows.value.length, 1));
const layoutBlocks = computed<LayoutBlock[]>(() => buildLayoutBlocks(layoutRows.value));
const activeModalConfig = computed(() => (activeModal.value ? props.config.modals?.[activeModal.value.id] : null));
const isActiveModalStale = computed(
  () => !!activeModal.value && !areStringRecordsEqual(activeFilters.value, activeModal.value.sourceFilters),
);
const modalLayoutRows = computed(() => normalizeLayoutRows(activeModalConfig.value?.layoutRows));
const modalLayoutColumnCount = computed(() => Math.max(...modalLayoutRows.value.map((row) => Array.from(row).length), 1));
const modalLayoutRowCount = computed(() => Math.max(modalLayoutRows.value.length, 1));
const modalLayoutBlocks = computed<LayoutBlock[]>(() => buildLayoutBlocks(modalLayoutRows.value));
const modalStyle = computed(() => ({
  '--modal-width': `${activeModalConfig.value?.width ?? 800}px`,
  '--modal-height': `${activeModalConfig.value?.height ?? 600}px`,
  '--modal-columns': String(modalLayoutColumnCount.value),
  '--modal-rows': String(modalLayoutRowCount.value),
}));
const titleRenderedWidth = computed(() => props.config.screen.layout.titleBackgroundWidth);
const titleScale = computed(() => titleRenderedWidth.value / props.config.screen.layout.titleBackgroundWidth);
const titleBackgroundRenderedHeight = computed(
  () => props.config.screen.layout.titleBackgroundHeight * titleScale.value,
);
const titleRenderedHeight = computed(() => props.config.screen.layout.titleVisibleHeight * titleScale.value);
const titleBackgroundOffsetY = computed(() => -(props.config.screen.layout.titleVisibleTop * titleScale.value));
const appStyle = computed(() => ({
  '--page-background-image': `url("${props.config.assets.backgroundSrc}")`,
  '--title-background-image': `url("${props.config.assets.titleBackgroundSrc}")`,
  '--design-width': `${props.config.screen.layout.designWidth}px`,
  '--design-height': `${props.config.screen.layout.designHeight}px`,
  '--title-background-width': `${props.config.screen.layout.titleBackgroundWidth}px`,
  '--title-background-height': `${props.config.screen.layout.titleBackgroundHeight}px`,
  '--title-current-width': `${titleRenderedWidth.value}px`,
  '--title-current-height': `${titleRenderedHeight.value}px`,
  '--title-background-current-height': `${titleBackgroundRenderedHeight.value}px`,
  '--title-background-offset-y': `${titleBackgroundOffsetY.value}px`,
  '--title-offset-y': `${props.config.screen.layout.titleOffsetY}px`,
  '--control-height': `${props.config.screen.layout.controlSize}px`,
  '--control-logo-width': `${props.config.screen.layout.controlLogoWidth}px`,
  '--control-logo-offset-x': `${props.config.screen.layout.controlLogoOffsetX}px`,
  '--control-logo-lift': `${props.config.screen.layout.controlLogoLift}px`,
  '--control-icon-width': `${props.config.screen.layout.controlIconWidth}px`,
  '--control-gap': `${props.config.screen.layout.controlGroupGap}px`,
  '--control-bottom': `${props.config.screen.layout.controlBottom}px`,
  '--control-inset': `${props.config.screen.layout.controlInset}px`,
  '--background-tile-width': `${props.config.screen.layout.backgroundTileWidth}px`,
  '--background-tile-height': `${props.config.screen.layout.backgroundTileHeight}px`,
  '--content-gap': `${props.config.screen.layout.contentGap}px`,
  '--grid-columns': String(layoutColumnCount.value),
  '--grid-rows': String(layoutRowCount.value),
  '--content-start-y': `${props.config.screen.grid.contentStartY}px`,
  '--content-end-y': `${props.config.screen.grid.contentEndY}px`,
  '--cell-padding': `${props.config.screen.grid.cellPadding}px`,
  '--cell-inner-background': props.config.screen.grid.innerBackgroundColor,
  '--title-dominant-color': props.config.screen.grid.dominantTitleColor,
  '--page-scroll-x': `${pageScrollX.value}px`,
}));

let filterLoadToken = 0;
let widgetDataLoadToken = 0;
let hasInitializedFilters = false;

const setNav = (id: string) => {
  if (props.config.nav.some((item) => item.id === id)) {
    activeNavId.value = id;
    closeModal();
  }
};

const getWidgetForBlock = (blockId: string): RegisteredWidgetConfig | undefined => activeNavItem.value?.widgets?.[blockId];

const getModalWidgetForBlock = (blockId: string): RegisteredWidgetConfig | undefined =>
  activeModalConfig.value?.widgets?.[blockId];

const getBlockTitle = (blockId: string) => getWidgetForBlock(blockId)?.title ?? blockId;

const getModalBlockTitle = (blockId: string) => getModalWidgetForBlock(blockId)?.title ?? blockId;

const isFilterVisibleForWidget = (group: DashboardFilterGroup, widget?: RegisteredWidgetConfig) => {
  const filterScopes = normalizeScope(group.scope);

  if (filterScopes.length === 0) {
    return true;
  }

  const widgetScopes = normalizeScope(widget?.filterScope);

  return widgetScopes.some((scope) => filterScopes.includes(scope));
};

const getScopedFilters = (widget?: RegisteredWidgetConfig) =>
  Object.fromEntries(
    props.config.filters
      .filter((group) => isFilterVisibleForWidget(group, widget))
      .map((group) => [group.id, activeFilters.value[group.id] ?? '']),
  );

const getWidgetFilterScope = (widget?: RegisteredWidgetConfig) => normalizeScope(widget?.filterScope);

const getWidgetContext = (blockId: string, widget = getWidgetForBlock(blockId)): WidgetContext => ({
  area: 'page',
  navId: activeNavItem.value?.id ?? '',
  navLabel: activeNavItem.value?.label ?? '',
  blockId,
  filters: getScopedFilters(widget),
  allFilters: activeFilters.value,
  filterScope: getWidgetFilterScope(widget),
});

const getModalWidgetContext = (blockId: string, widget = getModalWidgetForBlock(blockId)): WidgetContext => ({
  area: 'modal',
  navId: activeNavItem.value?.id ?? '',
  navLabel: activeNavItem.value?.label ?? '',
  blockId,
  filters: getScopedFilters(widget),
  allFilters: activeFilters.value,
  filterScope: getWidgetFilterScope(widget),
  modalId: activeModal.value?.id,
  params: activeModal.value?.params ?? {},
  isStale: isActiveModalStale.value,
  sourceFilters: activeModal.value?.sourceFilters,
});

const getWidgetDataKey = (area: 'page' | 'modal', ownerId: string, blockId: string) => `${area}:${ownerId}:${blockId}`;

const getWidgetDataForBlock = (blockId: string) =>
  widgetDataMap.value[getWidgetDataKey('page', activeNavItem.value?.id ?? '', blockId)] ?? [];

const getModalWidgetDataForBlock = (blockId: string) =>
  widgetDataMap.value[getWidgetDataKey('modal', activeModal.value?.id ?? '', blockId)] ?? [];

const getFilterOptions = (group: DashboardFilterGroup) => filterOptionMap.value[group.id] ?? getStaticFilterOptions(group);

const getFiltersExcluding = (filterId: string) =>
  Object.fromEntries(Object.entries(activeFilters.value).filter(([id]) => id !== filterId));

const normalizeFilterOptions = (rows: unknown[], group: DashboardFilterGroup): DashboardFilterOption[] => {
  const labelField = group.source?.labelField ?? 'label';
  const valueField = group.source?.valueField ?? 'id';

  const toOptionalNumber = (value: unknown) => {
    const numberValue = Number(value);

    return Number.isFinite(numberValue) ? numberValue : undefined;
  };

  const toOptionalText = (value: unknown) =>
    value === undefined || value === null || value === '' ? undefined : String(value);

  const options: DashboardFilterOption[] = rows.flatMap((row) => {
    if (typeof row === 'string' || typeof row === 'number') {
      const value = String(row);
      return [{ id: value, label: value }];
    }

    if (!row || typeof row !== 'object') {
      return [];
    }

    const record = row as Record<string, unknown>;
    const id = record[valueField] ?? record.id ?? record.value;
    const label = record[labelField] ?? record.label ?? record.name ?? id;

    if (id === undefined || label === undefined) {
      return [];
    }

    return [
      {
        id: String(id),
        label: String(label),
        disabled: record.disabled === true,
        reason: toOptionalText(record.reason),
        count: toOptionalNumber(record.count),
        parentId: toOptionalText(record.parentId ?? record.parent_id),
        level: toOptionalNumber(record.level),
        sortOrder: toOptionalNumber(record.sortOrder ?? record.sort_order),
        permissionScope: toOptionalText(record.permissionScope ?? record.permission_scope),
        meta: record.meta && typeof record.meta === 'object' ? (record.meta as Record<string, unknown>) : undefined,
      },
    ];
  });

  return options.sort((left, right) => (left.sortOrder ?? Number.MAX_SAFE_INTEGER) - (right.sortOrder ?? Number.MAX_SAFE_INTEGER));
};

const getFirstEnabledFilterOption = (group: DashboardFilterGroup) =>
  getFilterOptions(group).find((option) => !option.disabled);

const syncFilterSelections = () => {
  const nextFilters = { ...activeFilters.value };
  let changed = false;

  props.config.filters.forEach((group) => {
    const options = getFilterOptions(group);
    const selected = nextFilters[group.id];

    const enabledOptions = options.filter((option) => !option.disabled);

    if (enabledOptions.length === 0) {
      if (selected !== '') {
        nextFilters[group.id] = '';
        changed = true;
      }
      return;
    }

    if (!options.some((option) => option.id === selected && !option.disabled)) {
      nextFilters[group.id] = enabledOptions[0]?.id ?? '';
      changed = true;
    }
  });

  if (changed) {
    activeFilters.value = nextFilters;
  }
};

const loadFilterOptions = async () => {
  const currentToken = ++filterLoadToken;
  const context = getWidgetContext('');
  const nextOptions: Record<string, DashboardFilterOption[]> = {};

  await Promise.all(
    props.config.filters.map(async (group) => {
      if (!group.source) {
        nextOptions[group.id] = getStaticFilterOptions(group);
        return;
      }

      try {
        const optionFilters = getFiltersExcluding(group.id);
        const params = resolveDashboardParams(group.source.params, {
          filters: activeFilters.value,
          context: context as unknown as Record<string, unknown>,
          params: activeModal.value?.params ?? {},
        });
        const rows = await resolveDataSource(group.source, {
          filters: optionFilters,
          allFilters: activeFilters.value,
          params,
          context: context as unknown as Record<string, unknown>,
          filterScope: normalizeScope(group.scope),
        });

        nextOptions[group.id] = normalizeFilterOptions(rows, group);
      } catch {
        nextOptions[group.id] = getStaticFilterOptions(group);
      }
    }),
  );

  if (currentToken !== filterLoadToken) {
    return;
  }

  filterOptionMap.value = nextOptions;
  syncFilterSelections();
};

const resolveWidgetData = async (
  area: 'page' | 'modal',
  ownerId: string,
  blockId: string,
  widget: RegisteredWidgetConfig,
  context: WidgetContext,
) => {
  const key = getWidgetDataKey(area, ownerId, blockId);

  if (!widget.data) {
    return [key, [] as unknown[]] as const;
  }

  try {
    const params = resolveDashboardParams(widget.data.params, {
      filters: context.filters,
      context: context as unknown as Record<string, unknown>,
      params: context.params ?? {},
    });
    const rows = await resolveDataSource(widget.data, {
      filters: context.filters,
      allFilters: activeFilters.value,
      params,
      context: context as unknown as Record<string, unknown>,
      filterScope: context.filterScope ?? [],
    });

    return [key, rows] as const;
  } catch {
    return [key, [] as unknown[]] as const;
  }
};

const loadWidgetData = async () => {
  const currentToken = ++widgetDataLoadToken;
  const jobs: Array<Promise<readonly [string, unknown[]]>> = [];
  const navId = activeNavItem.value?.id ?? '';

  Object.entries(activeNavItem.value?.widgets ?? {}).forEach(([blockId, widget]) => {
    if (!widget) {
      return;
    }

    jobs.push(resolveWidgetData('page', navId, blockId, widget, getWidgetContext(blockId, widget)));
  });

  if (activeModal.value && activeModalConfig.value) {
    const modalId = activeModal.value.id;

    Object.entries(activeModalConfig.value.widgets ?? {}).forEach(([blockId, widget]) => {
      if (!widget) {
        return;
      }

      jobs.push(resolveWidgetData('modal', modalId, blockId, widget, getModalWidgetContext(blockId, widget)));
    });
  }

  const entries = await Promise.all(jobs);

  if (currentToken !== widgetDataLoadToken) {
    return;
  }

  widgetDataMap.value = Object.fromEntries(entries);
};

const setFilter = (groupId: string, optionId: string) => {
  const group = props.config.filters.find((item) => item.id === groupId);
  const option = group ? getFilterOptions(group).find((item) => item.id === optionId) : null;

  if (!group || option?.disabled) {
    return;
  }

  activeFilters.value = {
    ...activeFilters.value,
    [groupId]: optionId,
  };
};

const resetFilters = () => {
  activeFilters.value = Object.fromEntries(
    props.config.filters.map((group) => [group.id, getFirstEnabledFilterOption(group)?.id ?? '']),
  );
};

const refreshDashboard = () => {
  persistDashboardState();
  window.location.reload();
};

const printDashboard = () => {
  window.print();
};

const toggleFullscreen = async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
    return;
  }

  await document.documentElement.requestFullscreen();
};

const closePanels = () => {
  isNavOpen.value = false;
  isFiltersOpen.value = false;
};

const toggleNavPanel = () => {
  const nextOpen = !isNavOpen.value;
  isNavOpen.value = nextOpen;

  if (nextOpen) {
    isFiltersOpen.value = false;
  }
};

const toggleFiltersPanel = () => {
  const nextOpen = !isFiltersOpen.value;
  isFiltersOpen.value = nextOpen;

  if (nextOpen) {
    isNavOpen.value = false;
  }
};

const persistDashboardState = () => {
  try {
    sessionStorage.setItem(
      dashboardStateStorageKey,
      JSON.stringify({
        navId: activeNavId.value,
        filters: activeFilters.value,
        theme: theme.value,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      } satisfies PersistedDashboardState),
    );
  } catch {
    // sessionStorage may be blocked by the browser; refresh can still proceed safely.
  }
};

const restorePersistedScroll = () => {
  if (typeof persistedDashboardState.scrollX !== 'number' && typeof persistedDashboardState.scrollY !== 'number') {
    return;
  }

  window.requestAnimationFrame(() => {
    window.scrollTo(persistedDashboardState.scrollX ?? 0, persistedDashboardState.scrollY ?? 0);
    syncPageScroll();
  });
};

const openModal = (id: string, params: Record<string, unknown> = {}, title?: string) => {
  if (!props.config.modals?.[id]) {
    return;
  }

  const sourceFilters = { ...activeFilters.value };
  activeModal.value = {
    id,
    params: {
      ...params,
      __filters: sourceFilters,
    },
    sourceFilters,
    title,
  };
  closePanels();
};

const closeModal = () => {
  activeModal.value = null;
};

const syncModalFilterContext = () => {
  if (!activeModal.value) {
    return;
  }

  const sourceFilters = { ...activeFilters.value };
  activeModal.value = {
    ...activeModal.value,
    params: {
      ...activeModal.value.params,
      __filters: sourceFilters,
    },
    sourceFilters,
  };
};

const toStringRecord = (value: unknown): Record<string, string> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, item === undefined ? '' : String(item)]),
  );
};

const toActionText = (value: unknown) => {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  return '';
};

const buildUrlWithQuery = (url: string, query: Record<string, string>) => {
  const entries = Object.entries(query).filter(([, value]) => value !== '');

  if (entries.length === 0) {
    return url;
  }

  try {
    const nextUrl = new URL(url, window.location.href);
    entries.forEach(([key, value]) => nextUrl.searchParams.set(key, value));
    return nextUrl.toString();
  } catch {
    const queryText = new URLSearchParams(entries).toString();
    const connector = url.includes('?') ? '&' : '?';
    return `${url}${connector}${queryText}`;
  }
};

const buildActionScope = (runtime: WidgetActionRuntime) => ({
  event: {
    name: runtime.event.name,
    ...(runtime.event.payload ?? {}),
  },
  filters: activeFilters.value,
  context: runtime.context as unknown as Record<string, unknown>,
  params: runtime.context.params ?? {},
});

const runDashboardAction = async (rawAction: DashboardActionConfig, runtime: WidgetActionRuntime) => {
  const action = resolveDashboardValue(
    rawAction as unknown as DashboardExpressionValue,
    buildActionScope(runtime),
  ) as DashboardActionConfig;

  switch (action.type) {
    case 'openModal': {
      const modalId = toActionText(action.target ?? action.modal);
      openModal(modalId, (action.params ?? {}) as Record<string, unknown>, toActionText(action.title) || undefined);
      break;
    }
    case 'closeModal':
      closeModal();
      break;
    case 'switchNav': {
      const navId = toActionText(action.target ?? action.navId);
      setNav(navId);
      closePanels();
      break;
    }
    case 'setFilters':
      activeFilters.value = {
        ...activeFilters.value,
        ...toStringRecord(action.filters),
      };
      break;
    case 'resetFilters':
      resetFilters();
      break;
    case 'navigateUrl': {
      const url = toActionText(action.url ?? action.target);
      const query = {
        ...(action.includeFilters === false ? {} : activeFilters.value),
        ...toStringRecord(action.query),
      };
      const nextUrl = url ? buildUrlWithQuery(url, query) : '';

      if (nextUrl && action.openInNewTab) {
        window.open(nextUrl, '_blank', 'noopener,noreferrer');
      } else if (nextUrl && action.replace) {
        window.location.replace(nextUrl);
      } else if (nextUrl) {
        window.location.assign(nextUrl);
      }
      break;
    }
    case 'print':
      printDashboard();
      break;
    case 'fullscreen':
      await toggleFullscreen();
      break;
    case 'refresh':
      refreshDashboard();
      break;
    default: {
      const customHandler = customActionRegistry[action.type];

      if (customHandler) {
        await customHandler({
          action,
          event: runtime.event,
          context: runtime.context,
          filters: activeFilters.value,
          controls: {
            openModal,
            closeModal,
            switchNav: setNav,
            setFilters: (filters) => {
              activeFilters.value = {
                ...activeFilters.value,
                ...filters,
              };
            },
            resetFilters,
            print: printDashboard,
            fullscreen: toggleFullscreen,
            refresh: refreshDashboard,
          },
        });
      }
    }
  }
};

const handleWidgetAction = async (blockId: string, event: DashboardWidgetActionEvent) => {
  const widget = getWidgetForBlock(blockId);

  if (!widget) {
    return;
  }

  const actionConfig = widget.actions?.[event.name];
  const actions = Array.isArray(actionConfig) ? actionConfig : actionConfig ? [actionConfig] : [];

  for (const action of actions) {
    await runDashboardAction(action, {
      event,
      widget,
      context: getWidgetContext(blockId, widget),
    });
  }
};

const handleModalWidgetAction = async (blockId: string, event: DashboardWidgetActionEvent) => {
  const widget = getModalWidgetForBlock(blockId);

  if (!widget) {
    return;
  }

  const actionConfig = widget.actions?.[event.name];
  const actions = Array.isArray(actionConfig) ? actionConfig : actionConfig ? [actionConfig] : [];

  for (const action of actions) {
    await runDashboardAction(action, {
      event,
      widget,
      context: getModalWidgetContext(blockId, widget),
    });
  }
};

const syncPageScroll = () => {
  pageScrollX.value =
    window.scrollX ||
    document.documentElement.scrollLeft ||
    document.body.scrollLeft ||
    document.scrollingElement?.scrollLeft ||
    0;
};

onMounted(() => {
  syncPageScroll();
  restorePersistedScroll();
  scrollTargets.push(window, document, document.documentElement, document.body);
  scrollTargets.forEach((target) => target.addEventListener('scroll', syncPageScroll, { passive: true }));
  window.addEventListener('resize', syncPageScroll);
});

onBeforeUnmount(() => {
  scrollTargets.forEach((target) => target.removeEventListener('scroll', syncPageScroll));
  scrollTargets.length = 0;
  window.removeEventListener('resize', syncPageScroll);
});

watch(
  theme,
  (value) => {
    document.documentElement.dataset.theme = value;
  },
  { immediate: true },
);

watch(
  () => props.config.filters,
  () => {
    if (hasInitializedFilters) {
      activeFilters.value = getDefaultFiltersFromGroups(props.config.filters);
    }

    hasInitializedFilters = true;
    void loadFilterOptions();
  },
  { deep: true, immediate: true },
);

watch(
  activeFilters,
  () => {
    void loadFilterOptions();
    void loadWidgetData();
  },
  { deep: true },
);

watch(
  [activeNavId, activeModal],
  () => {
    void loadWidgetData();
  },
  { deep: true, immediate: true },
);

watch(
  () => [props.config.nav, props.config.modals],
  () => {
    void loadWidgetData();
  },
  { deep: true },
);
</script>

<template>
  <main
    class="cockpit-app"
    :class="[`theme-${theme}`, { 'nav-open': isNavOpen, 'filters-open': isFiltersOpen }]"
    :style="appStyle"
  >
    <div class="cockpit-background" aria-hidden="true"></div>

    <section class="cockpit-shell">
      <header class="cockpit-header">
        <div class="header-actions header-actions-left" @click.stop>
          <div class="title-logo-floating" :aria-label="config.assets.logoAlt" role="img">
            <img :src="config.assets.logoSrc" :alt="config.assets.logoAlt" />
          </div>
          <div v-if="activeNavItem" class="title-nav-current" :aria-label="activeNavItem.label">
            <component :is="iconMap[activeNavItem.icon]" :size="15" />
            <span>{{ activeNavItem.label }}</span>
          </div>
        </div>

        <div class="title-crown" :aria-label="config.screen.title">
          <h1>{{ config.screen.title }}</h1>
        </div>

        <div class="header-actions header-actions-right" @click.stop>
          <button
            class="title-tool title-tool-icon"
            type="button"
            :aria-label="config.screen.controls.refresh"
            :title="config.screen.controls.refresh"
            @click.stop="refreshDashboard"
          >
            <RefreshCw :size="14" />
          </button>
          <button
            class="title-tool title-tool-icon"
            type="button"
            :aria-label="config.screen.controls.navigation"
            :title="config.screen.controls.navigation"
            @click.stop="toggleNavPanel"
          >
            <Menu :size="16" />
          </button>
          <button
            class="title-tool title-tool-icon"
            type="button"
            :aria-label="config.screen.controls.filters"
            :title="config.screen.controls.filters"
            @click.stop="toggleFiltersPanel"
          >
            <SlidersHorizontal :size="16" />
          </button>
          <button
            class="title-tool title-tool-icon"
            type="button"
            :aria-label="config.screen.controls.download"
            :title="config.screen.controls.download"
            @click.stop="printDashboard"
          >
            <Download :size="16" />
          </button>
          <button
            class="title-tool title-tool-logo title-fullscreen-floating"
            type="button"
            :aria-label="config.screen.controls.fullscreen"
            :title="config.screen.controls.fullscreen"
            @click.stop="toggleFullscreen"
          >
            <Maximize2 :size="14" />
          </button>
        </div>
      </header>

      <button
        v-if="isNavOpen || isFiltersOpen"
        class="panel-dismiss-layer"
        type="button"
        aria-label="关闭弹窗"
        @click="closePanels"
      ></button>

      <nav
        class="side-panel nav-panel"
        :class="{ open: isNavOpen }"
        :style="isNavOpen ? openPanelStyle : undefined"
        :aria-label="config.screen.navTitle"
        @click.stop
      >
        <p class="panel-title">{{ config.screen.navTitle }}</p>
        <button
          v-for="item in config.nav"
          :key="item.id"
          class="nav-item"
          :class="{ active: activeNavId === item.id }"
          type="button"
          @click="setNav(item.id)"
        >
          <component :is="iconMap[item.icon]" :size="19" />
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <aside
        class="side-panel filter-panel"
        :class="{ open: isFiltersOpen }"
        :style="isFiltersOpen ? openPanelStyle : undefined"
        :aria-label="config.screen.filterTitle"
        @click.stop
      >
        <p class="panel-title">{{ config.screen.filterTitle }}</p>
        <section v-for="group in config.filters" :key="group.id" class="filter-group">
          <p>{{ group.label }}</p>
          <div>
            <button
              v-for="option in getFilterOptions(group)"
              :key="option.id"
              class="filter-option"
              :class="{ active: activeFilters[group.id] === option.id }"
              type="button"
              :disabled="option.disabled"
              :title="option.reason ?? option.label"
              @click="setFilter(group.id, option.id)"
            >
              <span>{{ option.label }}</span>
              <em v-if="option.count !== undefined" class="filter-option-count">{{ option.count }}</em>
            </button>
            <span v-if="getFilterOptions(group).length === 0" class="filter-empty">暂无选项</span>
          </div>
        </section>
      </aside>

      <section class="canvas-shell">
        <section class="placeholder-grid" :aria-label="`${layoutColumnCount}乘${layoutRowCount}内容占位区`">
          <div
            v-for="block in layoutBlocks"
            :key="block.id"
            class="placeholder-cell"
            :style="{
              gridColumn: `${block.columnStart} / ${block.columnEnd}`,
              gridRow: `${block.rowStart} / ${block.rowEnd}`,
            }"
            :aria-label="block.label"
          >
            <div class="placeholder-cell-inner">
              <div class="placeholder-cell-title">
                <span :title="getBlockTitle(block.label)">{{ getBlockTitle(block.label) }}</span>
              </div>
              <div class="placeholder-cell-body">
                <WidgetRenderer
                  :context="getWidgetContext(block.label)"
                  :data="getWidgetDataForBlock(block.label)"
                  :widget="getWidgetForBlock(block.label)"
                  @dashboard-action="handleWidgetAction(block.label, $event)"
                />
              </div>
            </div>
          </div>
        </section>
      </section>

      <section v-if="activeModal && activeModalConfig" class="dashboard-modal-layer" aria-modal="true" role="dialog">
        <button class="dashboard-modal-dismiss" type="button" aria-label="关闭弹窗" @click="closeModal"></button>
        <section class="dashboard-modal" :style="modalStyle" @click.stop>
          <header class="dashboard-modal-header">
            <div class="dashboard-modal-heading">
              <span>{{ isActiveModalStale ? 'FILTER CHANGED' : 'DATA PANEL' }}</span>
              <strong>{{ activeModal.title ?? activeModalConfig.title }}</strong>
            </div>
            <div class="dashboard-modal-actions">
              <button
                v-if="isActiveModalStale"
                class="dashboard-modal-sync"
                type="button"
                title="用当前筛选同步弹窗上下文"
                @click="syncModalFilterContext"
              >
                同步筛选
              </button>
              <button class="dashboard-modal-close" type="button" aria-label="关闭弹窗" @click="closeModal">×</button>
            </div>
          </header>

          <section class="dashboard-modal-grid" :aria-label="`${modalLayoutColumnCount}乘${modalLayoutRowCount}弹窗内容区`">
            <div
              v-for="block in modalLayoutBlocks"
              :key="block.id"
              class="placeholder-cell modal-cell"
              :style="{
                gridColumn: `${block.columnStart} / ${block.columnEnd}`,
                gridRow: `${block.rowStart} / ${block.rowEnd}`,
              }"
              :aria-label="block.label"
            >
              <div class="placeholder-cell-inner">
                <div class="placeholder-cell-title">
                  <span :title="getModalBlockTitle(block.label)">{{ getModalBlockTitle(block.label) }}</span>
                </div>
                <div class="placeholder-cell-body">
                  <WidgetRenderer
                    :context="getModalWidgetContext(block.label)"
                    :data="getModalWidgetDataForBlock(block.label)"
                    :widget="getModalWidgetForBlock(block.label)"
                    @dashboard-action="handleModalWidgetAction(block.label, $event)"
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </section>
  </main>
</template>
