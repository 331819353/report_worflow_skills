import type { DashboardActionMap, DashboardRuntimeContext } from '../types/actions';
import type { DashboardDataSourceRef, DashboardFilterScope } from '../types/data-source';

export interface WidgetViewportConfig {
  pannable?: boolean;
  zoomable?: boolean;
  minZoom?: number;
  maxZoom?: number;
  defaultZoom?: number;
  naturalWidth?: number;
  naturalHeight?: number;
}

export interface WidgetLocalFilterOption {
  id: string;
  label: string;
  disabled?: boolean;
  reason?: string;
  count?: number;
  sortOrder?: number;
}

export interface WidgetLocalFilterConfig {
  id: string;
  label: string;
  // 本地筛选基于组件已加载的全量 data，field 支持单字段或候选字段数组。
  field: string | string[];
  defaultValue?: string;
  options?: WidgetLocalFilterOption[];
  labelField?: string | string[];
  valueField?: string | string[];
  mode?: 'auto' | 'buttons' | 'panel';
  // Override only for deliberate exceptions; default is 2 so 3+ auto filters render as dropdown.
  maxButtonOptions?: number;
}

export interface WidgetContext extends DashboardRuntimeContext {
  // 组件自有标题区/控制区可读取并渲染本地筛选；Shell 只维护筛选值和数据过滤。
  localFilterConfigs?: WidgetLocalFilterConfig[];
  getLocalFilterOptions?: (filter: WidgetLocalFilterConfig) => WidgetLocalFilterOption[];
  setLocalFilter?: (filterId: string, value: string) => void;
  clearLocalFilters?: () => void;
}


export interface WidgetAnalysisInsightContract {
  subtype:
    | 'conclusion-card'
    | 'insight-card'
    | 'anomaly-alert'
    | 'attribution-card'
    | 'impact-factor-card'
    | 'comparison-interpretation'
    | 'trend-interpretation'
    | 'target-diagnosis'
    | 'recommendation-card'
    | 'risk-card'
    | 'definition-card'
    | 'data-quality-card'
    | 'chart-annotation'
    | 'summary-bar'
    | 'change-explanation'
    | 'ranking-interpretation'
    | 'forecast-note'
    | 'review-card'
    | 'explanatory-empty-state'
    | 'task-card'
    | 'permission-no-result-delay-note';
  insightFamily: 'conclusion' | 'insight' | 'diagnosis' | 'recommendation' | 'explanation' | 'state';
  conclusion: string;
  evidence?: string[];
  affectedObjects?: string[];
  compareWith?: string;
  changeValue?: string;
  reasonFields?: string[];
  recommendedActions?: string[];
  confidence?: 'high' | 'medium' | 'low' | 'insufficient';
  definitionRefs?: string[];
  dataQualityScope?: string;
  annotationTarget?: { componentId: string; field?: string; markId?: string; range?: string };
  maxVisibleItems?: number;
  localFilters?: string[];
  tooltipPayload?: string[];
  detailRoute?: string;
  sourceDataset?: string;
  freshnessField?: string;
  validationRules: string[];
}

export type WidgetVisualType =
  | 'line'
  | 'bar'
  | 'combo'
  | 'candlestick'
  | 'heatmap'
  | 'pie'
  | 'radar'
  | 'path'
  | 'sunburst'
  | 'gauge'
  | 'scatter'
  | 'boxplot'
  | 'parallel'
  | 'map'
  | 'graph'
  | 'tree'
  | 'treemap'
  | 'sankey'
  | 'funnel'
  | 'metric-card'
  | 'text-summary'
  | 'table'
  | 'pivot'
  | 'other';

export interface BaseWidgetConfig<TType extends string, TProps extends Record<string, unknown>> {
  type: TType;
  // Optional component metadata. Visible titles are rendered by the business component itself.
  title?: string;
  // Optional copy for the block-level no-data mask when widget.data resolves to no rows.
  emptyState?: {
    title?: string;
    message?: string;
  };
  props: TProps;
  // 组件视觉类型。框架校验会用它检查当前 layoutRows 占位是否属于允许尺寸。
  visualType: WidgetVisualType;
  // 组件抛出 dashboard-action 后，壳层只会转发给预留钩子，不会替组件执行弹窗、跳转或下钻。
  actions?: DashboardActionMap;
  // 组件数据源。离线/mock 数据放在 dashboard.dataset.json；常规 API 使用 apiData/httpData + api 配置；复杂 provider 在 dataSources/registry.ts 注册。
  // 配置里只保留引用和参数映射，避免把业务数据塞进 dashboard.config.ts。
  data?: DashboardDataSourceRef;
  // 无 data 的组件必须声明原因：static 表示纯静态叙述/说明，external 表示自行管理外部运行态。
  dataPolicy?: 'static' | 'external';
  // 结论卡/洞察卡/异常风险/归因建议/口径质量/预测标注/解释型状态等分析说明组件必须声明该契约。
  analysisInsightContract?: WidgetAnalysisInsightContract;
  // 筛选作用域。未配置时只接收全局筛选；配置后会接收全局筛选 + 匹配 scope 的筛选。
  filterScope?: DashboardFilterScope;
  // 组件内部本地筛选。可视控件由组件自己渲染，只过滤当前组件已加载的全量 data，不参与接口或数据源传参。
  localFilters?: WidgetLocalFilterConfig[];
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
