import type { DashboardExpressionValue, DashboardParams } from './actions';

export type DashboardFilterScope = string | string[];
export type DashboardApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type DashboardApiArrayFormat = 'comma' | 'repeat';

export interface DashboardApiSourceConfig {
  // 支持相对路径、绝对路径或完整 URL。常规项目建议通过 Vite proxy 使用 /api/...。
  url: string;
  method?: DashboardApiMethod;
  // 将表达式结果替换到 url 中的 :key 或 {key} 占位，例如 /api/regions/:regionId。
  pathParams?: DashboardParams;
  // 查询参数。支持 $filters、$context、$params 表达式。
  query?: DashboardParams;
  // 请求头。支持 $filters、$context、$params 表达式；空值会自动忽略。
  headers?: DashboardParams;
  // 请求体。GET/DELETE 默认不发送 body；对象会自动 JSON.stringify。
  body?: DashboardExpressionValue;
  // 从响应体中取数组的路径，例如 data.rows。未配置时直接使用整个响应体。
  responsePath?: string;
  // 响应适配器名称，对应 dataSources/registry.ts 中 responseAdapterRegistry 的 key。
  adapter?: string;
  // 数组查询参数格式。默认 comma：a=1,2；repeat：a=1&a=2。
  arrayFormat?: DashboardApiArrayFormat;
  // 默认 true，自动忽略空字符串、all、__all、undefined、null。
  omitEmptyQuery?: boolean;
  credentials?: RequestCredentials;
}

export interface DashboardDataSourceRef {
  // 对应 dataSources/registry.ts 中 dataSourceRegistry 的 key。
  id: string;
  // 标准 API 配置。id 使用 apiData/httpData 时生效；复杂接口仍可自定义 resolver。
  api?: DashboardApiSourceConfig;
  // 数据源参数。支持 $event、$filters、$context、$params 表达式。
  params?: DashboardParams;
  // 筛选字段映射。默认按筛选项 id 匹配数据行同名字段；字段名不一致时在这里映射。
  // 例如 { org: 'regionId', cycle: ['period', 'cycle'] }。
  filterFields?: Record<string, string | string[]>;
  // 明确声明该数据源不受哪些筛选影响，避免全局筛选被误认为漏配字段。
  ignoredFilters?: string[];
  // 明确声明必须命中的筛选字段。若数据行缺少对应字段，该行不会通过筛选。
  requiredFilters?: string[];
  // 明确声明必须命中的固定参数。用于防止 params 字段拼错后 staticData 静默不过滤。
  requiredParams?: string[];
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
