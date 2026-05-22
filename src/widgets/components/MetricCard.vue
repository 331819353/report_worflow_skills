<script setup lang="ts">
import type { WidgetContext } from '../types';

defineProps<{
  value: string;
  unit?: string;
  trend?: string;
  caption?: string;
  context: WidgetContext;
}>();
</script>

<template>
  <section class="metric-widget">
    <div class="metric-value">
      <strong>{{ value }}</strong>
      <span v-if="unit">{{ unit }}</span>
    </div>
    <div class="metric-meta">
      <span v-if="trend">{{ trend }}</span>
      <span v-if="caption">{{ caption }}</span>
    </div>
  </section>
</template>

<style scoped>
.metric-widget {
  position: relative;
  display: grid;
  align-content: center;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  gap: 12px;
  overflow: hidden;
  padding: 10px 18px 14px;
}

.metric-widget::before {
  position: absolute;
  inset: 12px auto 14px 0;
  width: 2px;
  background: linear-gradient(180deg, transparent, rgba(105, 226, 189, 0.94), rgba(32, 168, 255, 0.76), transparent);
  box-shadow: 0 0 14px rgba(37, 201, 255, 0.62);
  content: "";
}

.metric-widget::after {
  position: absolute;
  right: 14px;
  bottom: 10px;
  width: 86px;
  height: 86px;
  border: 1px solid rgba(37, 201, 255, 0.12);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(37, 201, 255, 0.08), transparent 66%);
  content: "";
}

.metric-value {
  display: flex;
  align-items: baseline;
  gap: 8px;
  color: #ffffff;
}

.metric-value strong {
  font-size: 50px;
  font-weight: 800;
  line-height: 1;
  text-shadow:
    0 0 16px rgba(32, 168, 255, 0.38),
    0 4px 20px rgba(0, 8, 16, 0.72);
}

.metric-value span,
.metric-meta {
  color: rgba(224, 248, 255, 0.78);
  font-size: 16px;
}

.metric-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
}

.metric-meta span:first-child {
  color: rgba(105, 226, 189, 0.92);
  text-shadow: 0 0 10px rgba(105, 226, 189, 0.28);
}
</style>
