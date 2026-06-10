<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { Component } from 'vue';
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Download,
  Factory,
  Gauge,
  Maximize2,
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
import {
  applyWidgetLocalFilters,
  getLocalFilterOptionsFromRows,
  getWidgetLocalFilterConfigs,
  resolveWidgetLocalFilterValues,
  shouldUseInlineLocalFilter,
} from '../widgets/localFilters';
import type { RegisteredWidgetConfig, WidgetContext, WidgetLocalFilterConfig } from '../widgets/types';

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
  Object.fromEntries(groups.map((group) => [group.id, group.defaultValue ?? '']));

const dashboardStateStorageKey = 'left-nav-analytics-workbench:runtime-state';

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
const localWidgetFilters = ref<Record<string, Record<string, string>>>({});
const activeLocalFilterPanel = ref<string | null>(null);
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
const navToggleLabel = computed(() => (isNavOpen.value ? props.config.screen.controls.navigation : '展开'));
const navToggleIcon = computed(() => (isNavOpen.value ? ChevronLeft : ChevronRight));
const contentRowHeight = computed(() => Math.max(props.config.screen.grid.rowHeight ?? 220, 220));
const contentGridHeight = computed(
  () => layoutRowCount.value * contentRowHeight.value + Math.max(layoutRowCount.value - 1, 0) * props.config.screen.layout.contentGap,
);
const appStyle = computed(() => ({
  '--design-width': `${props.config.screen.layout.designWidth}px`,
  '--design-height': `${props.config.screen.layout.designHeight}px`,
  '--sidebar-expanded-width': `${props.config.screen.layout.sidebarWidth}px`,
  '--sidebar-collapsed-width': `${props.config.screen.layout.sidebarCollapsedWidth}px`,
  '--content-gap': `${props.config.screen.layout.contentGap}px`,
  '--grid-columns': String(layoutColumnCount.value),
  '--grid-rows': String(layoutRowCount.value),
  '--content-start-y': `${props.config.screen.grid.contentStartY}px`,
  '--content-end-y': `${props.config.screen.grid.contentEndY}px`,
  '--content-row-height': `${contentRowHeight.value}px`,
  '--content-grid-height': `${contentGridHeight.value}px`,
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
    activeLocalFilterPanel.value = null;
  }
};

const getWidgetForBlock = (blockId: string): RegisteredWidgetConfig | undefined => activeNavItem.value?.widgets?.[blockId];

const getBlockTitle = (blockId: string) => getWidgetForBlock(blockId)?.title ?? blockId;

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

const getWidgetDataKey = (ownerId: string, blockId: string) => `page:${ownerId}:${blockId}`;

const getWidgetOwnerId = () => activeNavItem.value?.id ?? '';

const getWidgetInstanceKey = (blockId: string) => getWidgetDataKey(getWidgetOwnerId(), blockId);

const getRawWidgetDataForBlock = (blockId: string) => widgetDataMap.value[getWidgetInstanceKey(blockId)] ?? [];

const getLocalWidgetFilterValues = (blockId: string, widget = getWidgetForBlock(blockId)) =>
  resolveWidgetLocalFilterValues(widget, localWidgetFilters.value[getWidgetInstanceKey(blockId)]);

const getWidgetContext = (blockId: string, widget = getWidgetForBlock(blockId)): WidgetContext => ({
  area: 'page',
  navId: activeNavItem.value?.id ?? '',
  navLabel: activeNavItem.value?.label ?? '',
  blockId,
  filters: getScopedFilters(widget),
  allFilters: activeFilters.value,
  filterScope: getWidgetFilterScope(widget),
  localFilters: getLocalWidgetFilterValues(blockId, widget),
});

const getWidgetDataForBlock = (blockId: string) => {
  const widget = getWidgetForBlock(blockId);

  return applyWidgetLocalFilters(getRawWidgetDataForBlock(blockId), widget, getLocalWidgetFilterValues(blockId, widget));
};

const hasLocalFilterTools = (blockId: string, widget = getWidgetForBlock(blockId)) =>
  getWidgetLocalFilterConfigs(widget).length > 0;

const getLocalFilterOptions = (blockId: string, filter: WidgetLocalFilterConfig) =>
  getLocalFilterOptionsFromRows(getRawWidgetDataForBlock(blockId), filter);

const getInlineLocalFilter = (blockId: string, widget = getWidgetForBlock(blockId)) => {
  const filters = getWidgetLocalFilterConfigs(widget);
  const filter = filters[0];

  if (!filter) {
    return undefined;
  }

  return shouldUseInlineLocalFilter(filters.length, filter, getLocalFilterOptions(blockId, filter).length)
    ? filter
    : undefined;
};

const getInlineLocalFilterId = (blockId: string) => getInlineLocalFilter(blockId)?.id ?? '';

const getInlineLocalFilterOptions = (blockId: string) => {
  const filter = getInlineLocalFilter(blockId);

  return filter ? getLocalFilterOptions(blockId, filter) : [];
};

const getDropdownLocalFilter = (blockId: string, widget = getWidgetForBlock(blockId)) => {
  const filters = getWidgetLocalFilterConfigs(widget);
  const filter = filters[0];

  if (!filter || filters.length !== 1 || filter.mode === 'panel') {
    return undefined;
  }

  return shouldUseInlineLocalFilter(filters.length, filter, getLocalFilterOptions(blockId, filter).length)
    ? undefined
    : filter;
};

const getDropdownLocalFilterId = (blockId: string) => getDropdownLocalFilter(blockId)?.id ?? '';

const getDropdownLocalFilterOptions = (blockId: string) => {
  const filter = getDropdownLocalFilter(blockId);

  return filter ? getLocalFilterOptions(blockId, filter) : [];
};

const getSelectEventValue = (event: Event) =>
  event.target instanceof HTMLSelectElement ? event.target.value : '';

const getLocalFilterValue = (blockId: string, filterId: string) =>
  getLocalWidgetFilterValues(blockId)[filterId] ?? '';

const getWidgetLocalFilterCount = (blockId: string, widget = getWidgetForBlock(blockId)) =>
  Object.values(getLocalWidgetFilterValues(blockId, widget)).filter(Boolean).length;

const isLocalFilterPanelOpen = (blockId: string) => activeLocalFilterPanel.value === getWidgetInstanceKey(blockId);

const closeLocalFilterPanel = () => {
  activeLocalFilterPanel.value = null;
};

const toggleLocalFilterPanel = (blockId: string) => {
  const key = getWidgetInstanceKey(blockId);
  activeLocalFilterPanel.value = activeLocalFilterPanel.value === key ? null : key;
};

const setLocalWidgetFilter = (blockId: string, filterId: string, optionId: string) => {
  if (!filterId) {
    return;
  }

  const key = getWidgetInstanceKey(blockId);
  const current = localWidgetFilters.value[key] ?? {};
  const nextValue = current[filterId] === optionId ? '' : optionId;

  localWidgetFilters.value = {
    ...localWidgetFilters.value,
    [key]: {
      ...current,
      [filterId]: nextValue,
    },
  };
};

const clearLocalWidgetFilters = (blockId: string, widget = getWidgetForBlock(blockId)) => {
  const filters = getWidgetLocalFilterConfigs(widget);

  if (filters.length === 0) {
    return;
  }

  localWidgetFilters.value = {
    ...localWidgetFilters.value,
    [getWidgetInstanceKey(blockId)]: Object.fromEntries(filters.map((filter) => [filter.id, ''])),
  };
};

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

const getValidDefaultFilterValue = (group: DashboardFilterGroup) => {
  const defaultValue = group.defaultValue ?? '';

  if (!defaultValue) {
    return '';
  }

  const options = getFilterOptions(group);

  if (options.length === 0) {
    return defaultValue;
  }

  return options.some((option) => option.id === defaultValue && !option.disabled) ? defaultValue : '';
};

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

    if (selected === '') {
      return;
    }

    if (!options.some((option) => option.id === selected && !option.disabled)) {
      nextFilters[group.id] = getValidDefaultFilterValue(group);
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
          params: {},
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
  ownerId: string,
  blockId: string,
  widget: RegisteredWidgetConfig,
  context: WidgetContext,
) => {
  const key = getWidgetDataKey(ownerId, blockId);

  if (!widget.data) {
    return [key, [] as unknown[]] as const;
  }

  try {
    const params = resolveDashboardParams(widget.data.params, {
      filters: context.filters,
      context: context as unknown as Record<string, unknown>,
      params: {},
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

    jobs.push(resolveWidgetData(navId, blockId, widget, getWidgetContext(blockId, widget)));
  });
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
    [groupId]: activeFilters.value[groupId] === optionId ? '' : optionId,
  };
};

const resetFilters = () => {
  activeFilters.value = Object.fromEntries(
    props.config.filters.map((group) => [group.id, getValidDefaultFilterValue(group)]),
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
  isFiltersOpen.value = false;
  closeLocalFilterPanel();
};

const toggleNavPanel = () => {
  isNavOpen.value = !isNavOpen.value;
};

const toggleFiltersPanel = () => {
  isFiltersOpen.value = !isFiltersOpen.value;
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

const buildActionScope = (runtime: WidgetActionRuntime) => ({
  event: {
    name: runtime.event.name,
    ...(runtime.event.payload ?? {}),
  },
  filters: activeFilters.value,
  context: runtime.context as unknown as Record<string, unknown>
});

const runDashboardAction = async (rawAction: DashboardActionConfig, runtime: WidgetActionRuntime) => {
  const action = resolveDashboardValue(
    rawAction as unknown as DashboardExpressionValue,
    buildActionScope(runtime),
  ) as DashboardActionConfig;

  const customHandler =
    customActionRegistry[action.type] ??
    customActionRegistry[runtime.event.name] ??
    customActionRegistry.dashboardAction;

  if (!customHandler) {
    return;
  }

  await customHandler({
    action,
    event: runtime.event,
    context: runtime.context,
    filters: activeFilters.value,
    controls: {
      print: printDashboard,
      fullscreen: toggleFullscreen,
      refresh: refreshDashboard,
    },
  });
};

const handleWidgetAction = async (blockId: string, event: DashboardWidgetActionEvent) => {
  const widget = getWidgetForBlock(blockId);

  if (!widget) {
    return;
  }

  const actionConfig = widget.actions?.[event.name];
  const actions = Array.isArray(actionConfig) ? actionConfig : actionConfig ? [actionConfig] : [];
  const runtime = {
    event,
    widget,
    context: getWidgetContext(blockId, widget),
  };

  if (actions.length === 0) {
    await runDashboardAction({ type: event.name }, runtime);
    return;
  }

  for (const action of actions) {
    await runDashboardAction(action, runtime);
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
    document.documentElement.classList.toggle('dark', value === 'dark');
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
  activeNavId,
  () => {
    void loadWidgetData();
  },
  { deep: true, immediate: true },
);

watch(
  () => props.config.nav,
  () => {
    void loadWidgetData();
  },
  { deep: true },
);
</script>

<template>
  <main
    class="analytics-app"
    :class="[`theme-${theme}`, { 'sidebar-collapsed': !isNavOpen, 'filters-open': isFiltersOpen }]"
    :style="appStyle"
  >
    <aside class="analytics-sidebar" :aria-label="config.screen.navTitle">
      <div class="brand-lockup">
        <div class="brand-mark" :aria-label="config.assets.logoAlt" role="img">
          <img :src="config.assets.logoSrc" :alt="config.assets.logoAlt" />
        </div>
        <div class="brand-text">
          <strong>{{ config.screen.title }}</strong>
          <span>{{ activeNavItem?.label }}</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <button
          v-for="item in config.nav"
          :key="item.id"
          class="nav-item"
          :class="{ active: activeNavId === item.id }"
          type="button"
          :title="item.label"
          @click="setNav(item.id)"
        >
          <component :is="iconMap[item.icon]" :size="20" />
          <span class="nav-text">{{ item.label }}</span>
        </button>
      </nav>

      <div class="sidebar-tools" @click.stop>
        <button class="tool-button" type="button" :title="config.screen.controls.download" @click.stop="printDashboard">
          <Download :size="19" />
          <span class="nav-text">{{ config.screen.controls.download }}</span>
        </button>
        <button class="tool-button" type="button" :title="config.screen.controls.refresh" @click.stop="refreshDashboard">
          <RefreshCw :size="19" />
          <span class="nav-text">{{ config.screen.controls.refresh }}</span>
        </button>
        <button class="tool-button" type="button" :title="config.screen.controls.filters" @click.stop="toggleFiltersPanel">
          <SlidersHorizontal :size="19" />
          <span class="nav-text">{{ config.screen.controls.filters }}</span>
        </button>
        <button class="tool-button" type="button" :title="config.screen.controls.fullscreen" @click.stop="toggleFullscreen">
          <Maximize2 :size="19" />
          <span class="nav-text">{{ config.screen.controls.fullscreen }}</span>
        </button>
        <button
          class="tool-button tool-button-primary"
          type="button"
          :aria-label="navToggleLabel"
          :title="navToggleLabel"
          @click.stop="toggleNavPanel"
        >
          <component :is="navToggleIcon" :size="19" />
          <span class="nav-text">{{ navToggleLabel }}</span>
        </button>
      </div>
    </aside>

    <button
      v-if="isFiltersOpen"
      class="panel-dismiss-layer"
      type="button"
      aria-label="关闭筛选项"
      @click="closePanels"
    ></button>

    <aside
      class="filter-popover"
      :class="{ open: isFiltersOpen }"
      :aria-label="config.screen.filterTitle"
      @click.stop
    >
      <header class="filter-popover-header">
        <div>
          <span>筛选</span>
          <strong>{{ config.screen.filterTitle }}</strong>
        </div>
        <button class="filter-close" type="button" aria-label="关闭筛选项" @click="closePanels">×</button>
      </header>

      <section class="filter-popover-body">
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
      </section>

      <footer class="filter-popover-footer">
        <button type="button" @click="resetFilters">重置</button>
        <button type="button" @click="closePanels">应用</button>
      </footer>
    </aside>

    <section class="analytics-main" :aria-label="activeNavItem?.label">
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
                <span class="placeholder-cell-title-text" :title="getBlockTitle(block.label)">
                  {{ getBlockTitle(block.label) }}
                </span>
                <div
                  v-if="hasLocalFilterTools(block.label)"
                  class="widget-local-filter-tools"
                  @click.stop
                >
                  <div v-if="getInlineLocalFilter(block.label)" class="widget-local-filter-strip">
                    <button
                      class="widget-local-filter-chip"
                      :class="{ active: getLocalFilterValue(block.label, getInlineLocalFilterId(block.label)) === '' }"
                      type="button"
                      :aria-pressed="getLocalFilterValue(block.label, getInlineLocalFilterId(block.label)) === ''"
                      @click="setLocalWidgetFilter(block.label, getInlineLocalFilterId(block.label), '')"
                    >
                      全部
                    </button>
                    <button
                      v-for="option in getInlineLocalFilterOptions(block.label)"
                      :key="option.id"
                      class="widget-local-filter-chip"
                      :class="{ active: getLocalFilterValue(block.label, getInlineLocalFilterId(block.label)) === option.id }"
                      type="button"
                      :aria-pressed="getLocalFilterValue(block.label, getInlineLocalFilterId(block.label)) === option.id"
                      :disabled="option.disabled"
                      :title="option.reason ?? option.label"
                      @click="setLocalWidgetFilter(block.label, getInlineLocalFilterId(block.label), option.id)"
                    >
                      <span>{{ option.label }}</span>
                    </button>
                  </div>
                  <label v-else-if="getDropdownLocalFilter(block.label)" class="widget-local-filter-select">
                    <span>{{ getDropdownLocalFilter(block.label)?.label }}</span>
                    <select
                      :value="getLocalFilterValue(block.label, getDropdownLocalFilterId(block.label))"
                      @change="setLocalWidgetFilter(block.label, getDropdownLocalFilterId(block.label), getSelectEventValue($event))"
                    >
                      <option value="">全部</option>
                      <option
                        v-for="option in getDropdownLocalFilterOptions(block.label)"
                        :key="option.id"
                        :value="option.id"
                        :disabled="option.disabled"
                        :title="option.reason ?? option.label"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </label>
                  <div v-else class="widget-local-filter-panel-wrap">
                    <button
                      class="widget-local-filter-trigger"
                      :class="{ active: isLocalFilterPanelOpen(block.label) || getWidgetLocalFilterCount(block.label) > 0 }"
                      type="button"
                      @click="toggleLocalFilterPanel(block.label)"
                    >
                      <SlidersHorizontal :size="13" />
                      <span>筛选</span>
                      <em v-if="getWidgetLocalFilterCount(block.label) > 0">{{ getWidgetLocalFilterCount(block.label) }}</em>
                    </button>
                    <section v-if="isLocalFilterPanelOpen(block.label)" class="widget-local-filter-panel">
                      <header>
                        <strong>组件筛选</strong>
                        <button type="button" @click="clearLocalWidgetFilters(block.label)">清空</button>
                        <button type="button" aria-label="关闭组件筛选" @click="closeLocalFilterPanel">×</button>
                      </header>
                      <section
                        v-for="filter in getWidgetLocalFilterConfigs(getWidgetForBlock(block.label))"
                        :key="filter.id"
                        class="widget-local-filter-group"
                      >
                        <p>{{ filter.label }}</p>
                        <div>
                          <button
                            class="widget-local-filter-chip"
                            :class="{ active: getLocalFilterValue(block.label, filter.id) === '' }"
                            type="button"
                            :aria-pressed="getLocalFilterValue(block.label, filter.id) === ''"
                            @click="setLocalWidgetFilter(block.label, filter.id, '')"
                          >
                            全部
                          </button>
                          <button
                            v-for="option in getLocalFilterOptions(block.label, filter)"
                            :key="option.id"
                            class="widget-local-filter-chip"
                            :class="{ active: getLocalFilterValue(block.label, filter.id) === option.id }"
                            type="button"
                            :aria-pressed="getLocalFilterValue(block.label, filter.id) === option.id"
                            :disabled="option.disabled"
                            :title="option.reason ?? option.label"
                            @click="setLocalWidgetFilter(block.label, filter.id, option.id)"
                          >
                            <span>{{ option.label }}</span>
                            <em v-if="option.count !== undefined">{{ option.count }}</em>
                          </button>
                          <span v-if="getLocalFilterOptions(block.label, filter).length === 0" class="widget-local-filter-empty">
                            暂无选项
                          </span>
                        </div>
                      </section>
                    </section>
                  </div>
                </div>
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
    </section>
  </main>
</template>
