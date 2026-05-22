import type { Component } from 'vue';
import MetricCard from './components/MetricCard.vue';
import SimpleBarChart from './components/SimpleBarChart.vue';
import type { RegisteredWidgetType, WidgetViewportConfig } from './types';

export interface WidgetRegistration {
  component: Component;
  description: string;
  defaultViewport?: WidgetViewportConfig;
}

export const widgetRegistry: Record<RegisteredWidgetType, WidgetRegistration> = {
  MetricCard: {
    component: MetricCard,
    description: '用于展示单个核心指标、单位、趋势和补充说明。',
  },
  SimpleBarChart: {
    component: SimpleBarChart,
    description: '用于展示少量分类数据的轻量柱状图，不依赖图表库。',
  },
};
