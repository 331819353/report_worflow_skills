<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { WidgetViewportConfig } from './types';

const props = defineProps<{
  config?: WidgetViewportConfig;
}>();

const translateX = ref(0);
const translateY = ref(0);
const zoom = ref(props.config?.defaultZoom ?? 1);
const dragStart = ref<{ x: number; y: number; translateX: number; translateY: number } | null>(null);

const pannable = computed(() => props.config?.pannable ?? true);
const zoomable = computed(() => props.config?.zoomable ?? true);
const minZoom = computed(() => props.config?.minZoom ?? 0.4);
const maxZoom = computed(() => props.config?.maxZoom ?? 2);
const stageStyle = computed(() => ({
  width: props.config?.naturalWidth ? `${props.config.naturalWidth}px` : '100%',
  height: props.config?.naturalHeight ? `${props.config.naturalHeight}px` : '100%',
  transform: `translate(-50%, -50%) translate(${translateX.value}px, ${translateY.value}px) scale(${zoom.value})`,
}));

const clampZoom = (value: number) => Math.min(maxZoom.value, Math.max(minZoom.value, value));

const resetViewport = () => {
  translateX.value = 0;
  translateY.value = 0;
  zoom.value = props.config?.defaultZoom ?? 1;
};

const onWheel = (event: WheelEvent) => {
  if (!zoomable.value) {
    return;
  }

  event.preventDefault();
  const nextZoom = clampZoom(zoom.value - event.deltaY * 0.001);
  zoom.value = Number(nextZoom.toFixed(3));
};

const onPointerDown = (event: PointerEvent) => {
  if (!pannable.value) {
    return;
  }

  event.currentTarget instanceof HTMLElement && event.currentTarget.setPointerCapture(event.pointerId);
  dragStart.value = {
    x: event.clientX,
    y: event.clientY,
    translateX: translateX.value,
    translateY: translateY.value,
  };
};

const onPointerMove = (event: PointerEvent) => {
  if (!dragStart.value) {
    return;
  }

  translateX.value = dragStart.value.translateX + event.clientX - dragStart.value.x;
  translateY.value = dragStart.value.translateY + event.clientY - dragStart.value.y;
};

const onPointerEnd = () => {
  dragStart.value = null;
};

watch(
  () => props.config?.defaultZoom,
  () => {
    resetViewport();
  },
);
</script>

<template>
  <div
    class="widget-viewport"
    :class="{ dragging: dragStart }"
    @dblclick="resetViewport"
    @pointercancel="onPointerEnd"
    @pointerdown="onPointerDown"
    @pointerleave="onPointerEnd"
    @pointermove="onPointerMove"
    @pointerup="onPointerEnd"
    @wheel="onWheel"
  >
    <div class="widget-viewport-stage" :style="stageStyle">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.widget-viewport {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  cursor: grab;
  touch-action: none;
}

.widget-viewport.dragging {
  cursor: grabbing;
}

.widget-viewport-stage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  will-change: transform;
}
</style>
