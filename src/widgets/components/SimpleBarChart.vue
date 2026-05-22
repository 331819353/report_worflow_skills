<script setup lang="ts">
import { computed } from 'vue';
import type { WidgetContext } from '../types';

const props = defineProps<
  {
    categories: string[];
    values: number[];
    unit?: string;
    context: WidgetContext;
  }
>();

const maxValue = computed(() => Math.max(...props.values, 1));
const bars = computed(() =>
  props.values.map((value, index) => ({
    id: `${props.categories[index] ?? index}-${index}`,
    label: props.categories[index] ?? '',
    value,
    height: `${Math.max(4, (value / maxValue.value) * 100)}%`,
  })),
);
</script>

<template>
  <section class="simple-bar-widget">
    <div class="simple-bar-plot">
      <div v-for="bar in bars" :key="bar.id" class="simple-bar-item">
        <span class="simple-bar-value">{{ bar.value }}{{ unit ?? '' }}</span>
        <i :style="{ height: bar.height }"></i>
        <span class="simple-bar-label">{{ bar.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.simple-bar-widget {
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: 12px 10px 8px;
}

.simple-bar-widget::before {
  position: absolute;
  inset: 26px 8px 28px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px) 0 0 / 100% 25%,
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px) 0 0 / 25% 100%;
  content: "";
  opacity: 0.4;
}

.simple-bar-plot {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: end;
  justify-content: center;
  min-height: 0;
  height: 100%;
  gap: 12px;
  padding: 2px 2px 0;
}

.simple-bar-item {
  display: grid;
  flex: 1 1 0;
  grid-template-rows: 24px minmax(0, 1fr) 24px;
  align-items: end;
  justify-items: center;
  min-width: 0;
  height: 100%;
  color: rgba(224, 248, 255, 0.78);
  font-size: 13px;
  font-weight: 700;
}

.simple-bar-value,
.simple-bar-label {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.simple-bar-item i {
  display: block;
  width: min(30px, 74%);
  min-height: 4px;
  border-radius: 4px 4px 1px 1px;
  background: linear-gradient(180deg, rgba(105, 226, 189, 0.92), rgba(32, 168, 255, 0.82));
  box-shadow:
    0 0 14px rgba(32, 168, 255, 0.46),
    inset 0 1px 0 rgba(255, 255, 255, 0.34);
}
</style>
