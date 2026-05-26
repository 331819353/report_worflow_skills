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

const handleDashboardAction = (event: DashboardWidgetActionEvent) => {
  if (!event?.name) {
    return;
  }

  emit('dashboard-action', event);
};
</script>

<template>
  <div class="widget-renderer" :class="{ 'widget-renderer-has-content': registration && widget }">
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
</template>

<style scoped>
.widget-renderer,
.widget-empty {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.widget-renderer {
  position: relative;
  isolation: isolate;
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
