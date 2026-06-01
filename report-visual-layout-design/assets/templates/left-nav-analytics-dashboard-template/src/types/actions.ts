export type DashboardActionPrimitive = string | number | boolean | null;

export type DashboardExpressionValue =
  | DashboardActionPrimitive
  | DashboardExpressionValue[]
  | { [key: string]: DashboardExpressionValue };

export type DashboardParams = Record<string, DashboardExpressionValue>;

export type DashboardActionType =
  | 'openModal'
  | 'closeModal'
  | 'switchNav'
  | 'setFilters'
  | 'resetFilters'
  | 'navigateUrl'
  | 'print'
  | 'fullscreen'
  | 'refresh'
  | (string & {});

export interface DashboardRuntimeContext {
  // page 表示主画布分块，modal 表示弹窗里的分块。
  area: 'page' | 'modal';
  navId: string;
  navLabel: string;
  blockId: string;
  // filters 是当前组件作用域内可见的筛选值。
  filters: Record<string, string>;
  // allFilters 是全量筛选值，只有少数跨作用域动作需要读取。
  allFilters?: Record<string, string>;
  // 当前组件声明的筛选作用域。空数组表示只接收全局筛选。
  filterScope?: string[];
  // 弹窗内组件会拿到 modalId 和 params，主画布组件没有这两个字段。
  modalId?: string;
  params?: Record<string, unknown>;
  // 弹窗打开后如果全局筛选变化，框架会标记 stale，业务组件可据此清空旧选择或提示用户同步。
  isStale?: boolean;
  sourceFilters?: Record<string, string>;
}

export interface DashboardWidgetActionEvent {
  // 组件抛出的事件名，例如 barClick、rowClick、nodeClick。
  // 框架会用它去匹配 widget.actions[event.name]。
  name: string;
  // 组件抛出的业务数据。配置里可以通过 $event.xxx 读取。
  payload?: Record<string, unknown>;
}

export interface DashboardActionConfig {
  // 内置动作见 DashboardActionType；业务特殊动作可以在 actions/registry.ts 里扩展。
  type: DashboardActionType;
  // 通用目标字段。openModal 用弹窗 id，switchNav 用导航 id。
  target?: DashboardExpressionValue;
  // openModal 的语义化别名，和 target 二选一即可。
  modal?: DashboardExpressionValue;
  // switchNav 的语义化别名，和 target 二选一即可。
  navId?: DashboardExpressionValue;
  // openModal 会把 params 传给弹窗；custom action 也可以读取。
  params?: DashboardParams;
  // openModal 可临时覆盖弹窗标题；不写则使用 dashboard.config.ts modals[id].title。
  title?: DashboardExpressionValue;
  // setFilters 使用，key 是筛选项 id，value 可以写字面量或 $event/$filters 表达式。
  filters?: DashboardParams;
  // navigateUrl 使用。
  url?: DashboardExpressionValue;
  // navigateUrl 使用，可追加业务参数；支持 $event/$filters/$context/$params 表达式。
  query?: DashboardParams;
  // navigateUrl 默认会把当前全局 filters 写入 URL 查询参数。设为 false 可关闭。
  includeFilters?: boolean;
  openInNewTab?: boolean;
  replace?: boolean;
}

export type DashboardActionList = DashboardActionConfig | DashboardActionConfig[];

export type DashboardActionMap = Record<string, DashboardActionList>;
