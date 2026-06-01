import type { DashboardActionConfig, DashboardRuntimeContext, DashboardWidgetActionEvent } from '../types/actions';

export interface DashboardActionControls {
  openModal: (id: string, params?: Record<string, unknown>, title?: string) => void;
  closeModal: () => void;
  // 单页模板中保留该方法仅用于兼容自定义动作签名；调用时不会切换页面。
  switchNav: (id: string) => void;
  setFilters: (filters: Record<string, string>) => void;
  resetFilters: () => void;
  print: () => void;
  fullscreen: () => Promise<void>;
  refresh: () => void;
}

export interface DashboardActionHandlerRuntime {
  action: DashboardActionConfig;
  event: DashboardWidgetActionEvent;
  context: DashboardRuntimeContext;
  filters: Record<string, string>;
  controls: DashboardActionControls;
}

export type DashboardActionHandler = (
  runtime: DashboardActionHandlerRuntime,
) => void | Promise<void>;

// 自定义动作注册表。
// 框架已内置 openModal、setFilters、navigateUrl、print、fullscreen、refresh 等动作。
// switchNav 在单页模板中是兼容性 no-op，不建议在新组件中使用。
// 只有遇到业务专属动作时，才需要在这里登记。
//
// 示例：
// export const customActionRegistry = {
//   openExternalReport: ({ action, context }) => {
//     console.log(action, context);
//   },
// };
export const customActionRegistry: Record<string, DashboardActionHandler | undefined> = {};
