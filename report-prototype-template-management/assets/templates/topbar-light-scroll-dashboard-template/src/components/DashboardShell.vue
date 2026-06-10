<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Download, RefreshCw, SlidersHorizontal } from '@lucide/vue';
import { customActionRegistry } from '../actions/registry';
import { resolveDataSource } from '../dataSources/registry';
import type { DashboardActionConfig, DashboardExpressionValue, DashboardWidgetActionEvent } from '../types/actions';
import type { DashboardFilterScope } from '../types/data-source';
import type { DashboardConfig, DashboardFilterGroup, DashboardFilterOption, ThemeMode } from '../types/dashboard';
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
  filters?: Record<string, string>;
  scrollX?: number;
  scrollY?: number;
}

const emptyGridMarks = new Set(['.', ' ']);
const pageId = 'single-page';
const pageTitle = computed(() => props.config.screen.title);
const dashboardStateStorageKey = 'topbar-light-scroll-dashboard:runtime-state';

const getStaticFilterOptions = (group: DashboardFilterGroup) => group.options ?? [];

const getDefaultFiltersFromGroups = (groups: DashboardFilterGroup[]) =>
  Object.fromEntries(groups.map((group) => [group.id, group.defaultValue ?? '']));

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

const getInitialFilters = () =>
  Object.fromEntries(
    props.config.filters.map((group) => [
      group.id,
      persistedDashboardState.filters?.[group.id] ?? defaultFilters[group.id] ?? '',
    ]),
  );

const getInitialTheme = (): ThemeMode => props.config.screen.defaultTheme;

const activeFilters = ref<Record<string, string>>(getInitialFilters());
const filterOptionMap = ref<Record<string, DashboardFilterOption[]>>({});
const widgetDataMap = ref<Record<string, unknown[]>>({});
const localWidgetFilters = ref<Record<string, Record<string, string>>>({});
const activeLocalFilterPanel = ref<string | null>(null);
const isFiltersOpen = ref(props.config.screen.defaultFiltersOpen);
const theme = ref<ThemeMode>(getInitialTheme());
const pageScrollX = ref(0);
const scrollTargets: EventTarget[] = [];

const layoutRows = computed(() => normalizeLayoutRows(props.config.page.layoutRows));
const layoutColumnCount = computed(() => Math.max(...layoutRows.value.map((row) => Array.from(row).length), 1));
const layoutRowCount = computed(() => Math.max(layoutRows.value.length, 1));
const layoutBlocks = computed<LayoutBlock[]>(() => buildLayoutBlocks(layoutRows.value));
const contentRowHeight = computed(() => Math.max(props.config.screen.grid.rowHeight ?? 220, 220));
const contentAreaHeight = computed(() => props.config.screen.grid.contentEndY - props.config.screen.grid.contentStartY);
const contentGridHeight = computed(
  () => layoutRowCount.value * contentRowHeight.value + Math.max(layoutRowCount.value - 1, 0) * props.config.screen.layout.contentGap,
);
const canvasHeight = computed(() => Math.max(contentAreaHeight.value, contentGridHeight.value));
const resolvedDesignHeight = computed(() =>
  Math.max(props.config.screen.layout.designHeight, props.config.screen.grid.contentStartY + canvasHeight.value),
);
const appStyle = computed(() => ({
  '--page-background-image': props.config.assets.backgroundSrc
    ? `url("${props.config.assets.backgroundSrc}")`
    : 'none',
  '--design-width': `${props.config.screen.layout.designWidth}px`,
  '--design-height': `${resolvedDesignHeight.value}px`,
  '--topbar-height': `${props.config.screen.layout.topbarHeight}px`,
  '--content-gap': `${props.config.screen.layout.contentGap}px`,
  '--grid-columns': String(layoutColumnCount.value),
  '--grid-rows': String(layoutRowCount.value),
  '--content-start-y': `${props.config.screen.grid.contentStartY}px`,
  '--content-end-y': `${props.config.screen.grid.contentEndY}px`,
  '--content-row-height': `${contentRowHeight.value}px`,
  '--content-grid-height': `${contentGridHeight.value}px`,
  '--canvas-height': `${canvasHeight.value}px`,
  '--cell-padding': `${props.config.screen.grid.cellPadding}px`,
  '--cell-inner-background': props.config.screen.grid.innerBackgroundColor,
  '--title-dominant-color': props.config.screen.grid.dominantTitleColor,
  '--page-scroll-x': `${pageScrollX.value}px`,
}));

let filterLoadToken = 0;
let widgetDataLoadToken = 0;
let hasInitializedFilters = false;

const getWidgetForBlock = (blockId: string): RegisteredWidgetConfig | undefined => props.config.page.widgets?.[blockId];

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

const getWidgetOwnerId = () => pageId;

const getWidgetInstanceKey = (blockId: string) => getWidgetDataKey(getWidgetOwnerId(), blockId);

const getRawWidgetDataForBlock = (blockId: string) => widgetDataMap.value[getWidgetInstanceKey(blockId)] ?? [];

const getLocalWidgetFilterValues = (blockId: string, widget = getWidgetForBlock(blockId)) =>
  resolveWidgetLocalFilterValues(widget, localWidgetFilters.value[getWidgetInstanceKey(blockId)]);

const getWidgetContext = (blockId: string, widget = getWidgetForBlock(blockId)): WidgetContext => ({
  area: 'page',
  navId: pageId,
  navLabel: pageTitle.value,
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

  Object.entries(props.config.page.widgets ?? {}).forEach(([blockId, widget]) => {
    if (!widget) {
      return;
    }

    jobs.push(resolveWidgetData(pageId, blockId, widget, getWidgetContext(blockId, widget)));
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

const toggleFiltersPanel = () => {
  isFiltersOpen.value = !isFiltersOpen.value;
};


const persistDashboardState = () => {
  try {
    sessionStorage.setItem(
      dashboardStateStorageKey,
      JSON.stringify({
        filters: activeFilters.value,
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
  () => props.config.page,
  () => {
    void loadWidgetData();
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <main
    class="dashboard-app"
    :class="[`theme-${theme}`, { 'filters-open': isFiltersOpen }]"
    :style="appStyle"
  >
    <div class="dashboard-background" aria-hidden="true"></div>

    <section class="dashboard-shell">
      <header class="topbar">
        <div class="topbar-actions topbar-actions-left" @click.stop>
          <div class="topbar-logo" :aria-label="config.assets.logoAlt" role="img">
            <img :src="config.assets.logoSrc" :alt="config.assets.logoAlt" />
          </div>
        </div>

        <h1 class="topbar-title">
          <span class="topbar-title-ornament topbar-title-ornament-left" aria-hidden="true">
            <i class="title-arrow"></i>
            <i class="title-arrow"></i>
            <i class="title-arrow"></i>
            <i class="title-arrow"></i>
          </span>
          <span class="topbar-title-text">{{ config.screen.title }}</span>
          <span class="topbar-title-ornament topbar-title-ornament-right" aria-hidden="true">
            <i class="title-arrow"></i>
            <i class="title-arrow"></i>
            <i class="title-arrow"></i>
            <i class="title-arrow"></i>
          </span>
        </h1>

        <div class="topbar-actions topbar-actions-right" @click.stop>
          <button
            class="topbar-button"
            type="button"
            :aria-label="config.screen.controls.refresh"
            :title="config.screen.controls.refresh"
            @click.stop="refreshDashboard"
          >
            <RefreshCw :size="18" />
          </button>
          <button
            class="topbar-button"
            type="button"
            :aria-label="config.screen.controls.filters"
            :title="config.screen.controls.filters"
            @click.stop="toggleFiltersPanel"
          >
            <SlidersHorizontal :size="18" />
          </button>
          <button
            class="topbar-button"
            type="button"
            :aria-label="config.screen.controls.download"
            :title="config.screen.controls.download"
            @click.stop="printDashboard"
          >
            <Download :size="18" />
          </button>
        </div>
      </header>

      <button
        v-if="isFiltersOpen"
        class="panel-dismiss-layer"
        type="button"
        aria-label="关闭筛选项"
        @click="closePanels"
      ></button>

      <aside
        class="filter-panel"
        :class="{ open: isFiltersOpen }"
        :aria-label="config.screen.filterTitle"
        @click.stop
      >
        <header class="filter-panel-header">
          <div>
            <span>FILTER</span>
            <strong>{{ config.screen.filterTitle }}</strong>
          </div>
          <button class="filter-close" type="button" aria-label="关闭筛选项" @click="closePanels">×</button>
        </header>

        <section class="filter-panel-body">
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

        <footer class="filter-panel-footer">
          <button type="button" @click="resetFilters">重置</button>
          <button type="button" @click="closePanels">应用</button>
        </footer>
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
