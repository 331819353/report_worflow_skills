import type { DashboardActionConfig, DashboardRuntimeContext, DashboardWidgetActionEvent } from '../types/actions';

export interface DashboardActionControls {
  openModal: (id: string, params?: Record<string, unknown>, title?: string) => void;
  closeModal: () => void;
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
// 框架已内置 openModal、switchNav、setFilters、navigateUrl、print、fullscreen、refresh 等动作。
// 只有遇到业务专属动作时，才需要在这里登记。
//
// 示例：
// export const customActionRegistry = {
//   openExternalReport: ({ action, context }) => {
//     console.log(action, context);
//   },
// };
export const customActionRegistry: Record<string, DashboardActionHandler | undefined> = {};
