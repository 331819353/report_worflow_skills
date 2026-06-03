import type { Component } from 'vue';
import type { RegisteredWidgetType, WidgetViewportConfig } from './types';

export interface WidgetRegistration {
  component: Component;
  description: string;
  defaultViewport?: WidgetViewportConfig;
}

// 模板默认不内置业务组件，保持干净。
// 复制 WidgetTemplate.vue 开发组件后，在这里 import 并注册。
export const widgetRegistry: Partial<Record<RegisteredWidgetType, WidgetRegistration>> &
  Record<string, WidgetRegistration | undefined> = {};
