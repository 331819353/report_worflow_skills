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

      <div v-else class="widget-empty">
        <span class="widget-empty-pill">建设中</span>
      </div>
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
  border-radius: inherit;
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
  width: 100%;
  height: 100%;
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

.widget-renderer-visual-table .widget-renderer-content :deep(.wide-table table),
.widget-renderer-visual-table .widget-renderer-content :deep(table[data-wide='true']) {
  width: max-content;
  min-width: 100%;
  max-width: none;
  table-layout: auto;
}

.widget-renderer-visual-table .widget-renderer-content :deep(th),
.widget-renderer-visual-table .widget-renderer-content :deep(td) {
  min-width: 96px;
  max-width: 320px;
  overflow: visible;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.widget-renderer-content :deep(.numeric),
.widget-renderer-content :deep(.metric-number),
.widget-renderer-content :deep([data-align='number']) {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.widget-renderer-content :deep(.status-badge),
.widget-renderer-content :deep(.status-pill),
.widget-renderer-content :deep(.badge),
.widget-renderer-content :deep(.pill) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

.widget-renderer-content :deep(.status-badge.is-danger),
.widget-renderer-content :deep(.status-pill.is-danger),
.widget-renderer-content :deep(.badge-danger) {
  color: #ba1a1a;
  background: rgba(186, 26, 26, 0.1);
}

.widget-renderer-content :deep(.status-badge.is-success),
.widget-renderer-content :deep(.status-pill.is-success),
.widget-renderer-content :deep(.badge-success) {
  color: #0f8f5f;
  background: rgba(15, 143, 95, 0.1);
}

.widget-renderer-content :deep(.chart-legend),
.widget-renderer-content :deep(.legend) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  align-items: center;
  justify-content: flex-end;
  max-width: 100%;
  font-size: 12px;
  color: var(--muted);
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
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: transparent;
  content: "";
  opacity: 1;
}

.widget-empty {
  display: grid;
  place-items: center;
  border: 1px dashed var(--line, rgba(127, 213, 255, 0.26));
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.04), transparent 44%),
    var(--accent-soft, rgba(37, 201, 255, 0.1));
}

.widget-empty-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 82px;
  height: 28px;
  padding: 0 18px;
  border: 1px solid var(--line-strong, rgba(127, 213, 255, 0.46));
  border-radius: 999px;
  color: var(--text-strong, #ffffff);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.05)),
    var(--panel, rgba(5, 18, 30, 0.62));
  box-shadow: 0 0 18px rgba(37, 201, 255, 0.14);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1;
}
</style>
