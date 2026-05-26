import type { DashboardActionMap, DashboardRuntimeContext } from '../types/actions';
import type { DashboardDataSourceRef, DashboardFilterScope } from '../types/data-source';

export interface WidgetContext extends DashboardRuntimeContext {}

export interface WidgetViewportConfig {
  pannable?: boolean;
  zoomable?: boolean;
  minZoom?: number;
  maxZoom?: number;
  defaultZoom?: number;
  naturalWidth?: number;
  naturalHeight?: number;
}

export interface BaseWidgetConfig<TType extends string, TProps extends Record<string, unknown>> {
  type: TType;
  title?: string;
  props: TProps;
  // 组件抛出 dashboard-action 后，框架会按 actions[event.name] 执行对应动作。
  // 业务组件不直接打开弹窗或跳转，保持可复用。
  actions?: DashboardActionMap;
  // 组件数据源。真实数据放在 src/data，或由 src/dataSources/registry.ts 请求接口。
  // 配置里只保留引用和参数映射，避免把业务数据塞进 dashboard.config.ts。
  data?: DashboardDataSourceRef;
  // 筛选作用域。未配置时只接收全局筛选；配置后会接收全局筛选 + 匹配 scope 的筛选。
  filterScope?: DashboardFilterScope;
  viewport?: boolean | WidgetViewportConfig;
}

export interface WidgetPropsRegistry {
  // 复制 WidgetTemplate.vue 开发组件后，在这里登记 props 类型。
  // 示例：
  // MyWidget: MyWidgetProps;
}

export type RegisteredWidgetType = keyof WidgetPropsRegistry & string;

export type RegisteredWidgetConfig = [RegisteredWidgetType] extends [never]
  ? BaseWidgetConfig<string, Record<string, unknown>>
  : {
      [Type in RegisteredWidgetType]: BaseWidgetConfig<Type, WidgetPropsRegistry[Type]>;
    }[RegisteredWidgetType];

export type WidgetMap = Partial<Record<string, RegisteredWidgetConfig>>;
