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
import type { DashboardConfig, NavItem, ThemeMode } from '../types/dashboard';
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

const iconMap: Record<NavItem['icon'], Component> = {
  Gauge,
  Factory,
  BarChart3,
  Network,
  Settings,
};

const getDefaultFilters = () =>
  Object.fromEntries(props.config.filters.map((group) => [group.id, group.options[0]?.id ?? '']));

const activeNavId = ref(props.config.nav[0]?.id ?? '');
const activeFilters = ref<Record<string, string>>(getDefaultFilters());
const isNavOpen = ref(props.config.screen.defaultNavOpen);
const isFiltersOpen = ref(props.config.screen.defaultFiltersOpen);
const theme = ref<ThemeMode>(props.config.screen.defaultTheme);
const pageScrollX = ref(0);
const openPanelStyle = {
  opacity: '1',
  pointerEvents: 'auto',
  transform: 'translateX(0)',
} as const;
const scrollTargets: EventTarget[] = [];
const emptyGridMarks = new Set(['.', ' ']);

const activeNavItem = computed(() => props.config.nav.find((item) => item.id === activeNavId.value) ?? props.config.nav[0]);
const layoutRows = computed(() => {
  const configuredRows = activeNavItem.value?.layoutRows.filter((row) => row.length > 0) ?? [];

  if (configuredRows.length > 0) {
    return configuredRows;
  }

  return ['A'];
});
const layoutColumnCount = computed(() => Math.max(...layoutRows.value.map((row) => Array.from(row).length), 1));
const layoutRowCount = computed(() => Math.max(layoutRows.value.length, 1));
const layoutBlocks = computed<LayoutBlock[]>(() => {
  const cells = new Map<string, string>();

  layoutRows.value.forEach((row, rowIndex) => {
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
});
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

const setNav = (id: string) => {
  activeNavId.value = id;
};

const getWidgetForBlock = (blockId: string): RegisteredWidgetConfig | undefined => activeNavItem.value?.widgets?.[blockId];

const getBlockTitle = (blockId: string) => getWidgetForBlock(blockId)?.title ?? blockId;

const getWidgetContext = (blockId: string): WidgetContext => ({
  navId: activeNavItem.value?.id ?? '',
  navLabel: activeNavItem.value?.label ?? '',
  blockId,
  filters: activeFilters.value,
});

const setFilter = (groupId: string, optionId: string) => {
  activeFilters.value = {
    ...activeFilters.value,
    [groupId]: optionId,
  };
};

const refreshDashboard = () => {
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
    activeFilters.value = getDefaultFilters();
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
            @click.stop="isNavOpen = !isNavOpen"
          >
            <Menu :size="16" />
          </button>
          <button
            class="title-tool title-tool-icon"
            type="button"
            :aria-label="config.screen.controls.filters"
            :title="config.screen.controls.filters"
            @click.stop="isFiltersOpen = !isFiltersOpen"
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
              v-for="option in group.options"
              :key="option.id"
              class="filter-option"
              :class="{ active: activeFilters[group.id] === option.id }"
              type="button"
              @click="setFilter(group.id, option.id)"
            >
              {{ option.label }}
            </button>
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
                <span>{{ getBlockTitle(block.label) }}</span>
              </div>
              <div class="placeholder-cell-body">
                <WidgetRenderer :context="getWidgetContext(block.label)" :widget="getWidgetForBlock(block.label)" />
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  </main>
</template>
