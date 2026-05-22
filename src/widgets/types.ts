export interface WidgetContext {
  navId: string;
  navLabel: string;
  blockId: string;
  filters: Record<string, string>;
}

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
  viewport?: boolean | WidgetViewportConfig;
}

export interface MetricCardWidgetProps extends Record<string, unknown> {
  value: string;
  unit?: string;
  trend?: string;
  caption?: string;
}

export interface SimpleBarChartWidgetProps extends Record<string, unknown> {
  categories: string[];
  values: number[];
  unit?: string;
}

export interface WidgetPropsRegistry {
  MetricCard: MetricCardWidgetProps;
  SimpleBarChart: SimpleBarChartWidgetProps;
}

export type RegisteredWidgetType = keyof WidgetPropsRegistry & string;

export type RegisteredWidgetConfig = {
  [Type in RegisteredWidgetType]: BaseWidgetConfig<Type, WidgetPropsRegistry[Type]>;
}[RegisteredWidgetType];

export type WidgetMap = Partial<Record<string, RegisteredWidgetConfig>>;
