import type { DashboardActionConfig, DashboardRuntimeContext, DashboardWidgetActionEvent } from '../types/actions';

export interface DashboardActionControls {
  // 全局层面只保留页面级工具能力；弹窗、跳转、下钻由组件内部自行实现。
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

// 全局动作预留接口。
// DashboardShell 不再内置业务弹窗、页面跳转、下钻或筛选改写等交互动作。
// 组件需要弹窗、跳转、下钻时，应在组件内部实现；如需把事件抛给外部系统，
// 可按事件名注册处理器，或注册 dashboardAction 作为兜底处理器。
//
// 示例：
// export const customActionRegistry = {
//   dashboardAction: ({ action, event, context }) => {
//     console.log(action, event, context);
//   },
// };
export const customActionRegistry: Record<string, DashboardActionHandler | undefined> = {};
