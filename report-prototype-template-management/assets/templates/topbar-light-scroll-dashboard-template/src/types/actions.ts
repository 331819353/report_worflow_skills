export type DashboardActionPrimitive = string | number | boolean | null;

export type DashboardExpressionValue =
  | DashboardActionPrimitive
  | DashboardExpressionValue[]
  | { [key: string]: DashboardExpressionValue };

export type DashboardParams = Record<string, DashboardExpressionValue>;

export type DashboardActionType = 'dashboardAction' | (string & {});

export interface DashboardRuntimeContext {
  // 当前组件所在区域。全局壳层只负责主画布分块，组件私有弹窗/下钻自行维护上下文。
  area: 'page';
  navId: string;
  navLabel: string;
  blockId: string;
  // filters 是当前组件作用域内可见的筛选值。
  filters: Record<string, string>;
  // allFilters 是全量筛选值，只有少数跨作用域组件需要读取。
  allFilters?: Record<string, string>;
  // 当前组件声明的筛选作用域。空数组表示只接收全局筛选。
  filterScope?: string[];
  // 组件内部本地筛选值，只作用于当前组件已加载数据，不参与接口或数据源传参。
  localFilters?: Record<string, string>;
}

export interface DashboardWidgetActionEvent {
  // 组件抛出的事件名，例如 barClick、rowClick、nodeClick。
  // 壳层只会转发给 customActionRegistry[event.name] 或 dashboardAction 钩子。
  name: string;
  // 组件抛出的业务数据。组件私有交互可直接消费，也可让预留钩子读取。
  payload?: Record<string, unknown>;
}

export interface DashboardActionConfig {
  // 动作配置仅作为预留钩子的元数据；壳层不内置执行业务交互。
  type: DashboardActionType;
  // 可选业务目标元数据，具体含义由注册的钩子自行约定。
  target?: DashboardExpressionValue;
  // 传给预留钩子的业务参数。
  params?: DashboardParams;
  // 传给预留钩子的查询/定位参数元数据；支持 $event/$filters/$context/$params 表达式。
  query?: DashboardParams;
  // 其他业务元数据。
  meta?: DashboardParams;
}

export type DashboardActionList = DashboardActionConfig | DashboardActionConfig[];

export type DashboardActionMap = Record<string, DashboardActionList>;
