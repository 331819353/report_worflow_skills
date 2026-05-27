<script setup lang="ts">
import { computed } from 'vue';
import { widgetRegistry } from './registry';
import type { DashboardWidgetActionEvent } from '../types/actions';
import type { RegisteredWidgetConfig, WidgetContext, WidgetViewportConfig } from './types';
import WidgetViewport from './WidgetViewport.vue';

const props = defineProps<{
  widget?: RegisteredWidgetConfig;
  context: WidgetContext;
  data?: unknown[];
}>();

const emit = defineEmits<{
  (event: 'dashboard-action', payload: DashboardWidgetActionEvent): void;
}>();

const registration = computed(() => {
  if (!props.widget) {
    return null;
  }

  return widgetRegistry[props.widget.type] ?? null;
});

const viewportConfig = computed<WidgetViewportConfig | null>(() => {
  if (!props.widget) {
    return null;
  }

  if (props.widget.viewport === true) {
    return registration.value?.defaultViewport ?? {};
  }

  if (props.widget.viewport && typeof props.widget.viewport === 'object') {
    return props.widget.viewport;
  }

  return registration.value?.defaultViewport ?? null;
});

const visualTypeClass = computed(() => `widget-renderer-visual-${props.widget?.visualType ?? 'empty'}`);

const handleDashboardAction = (event: DashboardWidgetActionEvent) => {
  if (!event?.name) {
    return;
  }

  emit('dashboard-action', event);
};
</script>

<template>
  <div
    class="widget-renderer"
    :class="[visualTypeClass, { 'widget-renderer-has-content': registration && widget }]"
  >
    <div class="widget-renderer-content">
      <WidgetViewport v-if="registration && widget && viewportConfig" :config="viewportConfig">
        <component
          :is="registration.component"
          v-bind="widget.props"
          :context="context"
          :data="data ?? []"
          @dashboard-action="handleDashboardAction"
        />
      </WidgetViewport>

      <component
        :is="registration.component"
        v-else-if="registration && widget"
        v-bind="widget.props"
        :context="context"
        :data="data ?? []"
        @dashboard-action="handleDashboardAction"
      />

      <div v-else class="widget-empty"></div>
    </div>
  </div>
</template>

<style scoped>
.widget-renderer {
  display: grid;
  place-items: stretch;
  contain: layout paint;
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  box-sizing: border-box;
  isolation: isolate;
}

.widget-renderer-content,
.widget-empty {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  box-sizing: border-box;
  contain: layout paint;
}

.widget-renderer-content {
  display: grid;
  place-items: stretch;
}

.widget-renderer-content :deep(*) {
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
}

.widget-renderer-content :deep(.echarts-for-react),
.widget-renderer-content :deep(.echarts),
.widget-renderer-content :deep(.chart),
.widget-renderer-content :deep(.chart-container),
.widget-renderer-content :deep(.s2-container),
.widget-renderer-content :deep(.antv-s2-container) {
  max-width: 100%;
  max-height: 100%;
}

.widget-renderer:not(.widget-renderer-visual-table) .widget-renderer-content :deep(canvas),
.widget-renderer:not(.widget-renderer-visual-table) .widget-renderer-content :deep(svg) {
  max-width: 100%;
  max-height: 100%;
}

.widget-renderer-visual-table .widget-renderer-content {
  display: block;
  overflow: auto;
  scrollbar-gutter: stable both-edges;
}

.widget-renderer-visual-table .widget-renderer-content :deep(table) {
  width: max-content;
  min-width: 100%;
  max-width: none;
  border-collapse: collapse;
  table-layout: auto;
}

.widget-renderer-visual-table .widget-renderer-content :deep(th),
.widget-renderer-visual-table .widget-renderer-content :deep(td) {
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.widget-renderer-visual-table .widget-renderer-content :deep(.antv-s2-container),
.widget-renderer-visual-table .widget-renderer-content :deep(.s2-container),
.widget-renderer-visual-table .widget-renderer-content :deep(.s2-table) {
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
}

.widget-renderer-has-content::before {
  position: absolute;
  inset: 8px;
  z-index: -1;
  border-radius: 6px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 42%),
    linear-gradient(90deg, rgba(32, 168, 255, 0.06), transparent 40%, rgba(105, 226, 189, 0.035));
  content: "";
  opacity: 0.86;
}

.widget-empty {
  background: transparent;
}
</style>
