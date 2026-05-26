import type { DashboardParams } from './actions';

export type DashboardFilterScope = string | string[];

export interface DashboardDataSourceRef {
  // 对应 dataSources/registry.ts 中 dataSourceRegistry 的 key。
  id: string;
  // 数据源参数。支持 $event、$filters、$context、$params 表达式。
  params?: DashboardParams;
  // 当数据源返回对象数组时，用哪个字段作为显示文本。
  labelField?: string;
  // 当数据源返回对象数组时，用哪个字段作为真实值。
  valueField?: string;
}

export interface DashboardDataSourceRequest {
  source: DashboardDataSourceRef;
  // filters 是按当前 widget/filterScope 过滤后的筛选值。
  filters: Record<string, string>;
  // allFilters 是全量筛选值，只有少数跨作用域数据源需要读取。
  allFilters: Record<string, string>;
  params: Record<string, unknown>;
  context: Record<string, unknown>;
  filterScope: string[];
}
