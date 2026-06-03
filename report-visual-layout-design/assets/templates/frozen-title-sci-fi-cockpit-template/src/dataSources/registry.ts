import type {
  DashboardApiSourceConfig,
  DashboardDataSourceRef,
  DashboardDataSourceRequest,
} from '../types/data-source';
import { readDashboardBusinessRows, readDashboardFilterRows } from '../data/dashboard.loader';
import { resolveDashboardParams, resolveDashboardValue } from '../utils/dashboardExpressions';

export type DashboardDataSourceResolver = (
  request: DashboardDataSourceRequest,
) => unknown[] | Promise<unknown[]>;

export type DashboardResponseAdapter = (
  payload: unknown,
  request: DashboardDataSourceRequest,
) => unknown[];

const toComparableText = (value: unknown) => {
  if (value === undefined || value === null) {
    return '';
  }

  return String(value);
};

const isEmptyFilterValue = (value: unknown) => {
  const text = toComparableText(value).trim();

  return text === '' || text === 'all' || text === '__all';
};

const toComparableValues = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map(toComparableText).filter(Boolean);
  }

  return toComparableText(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const filterRowsByParams = (
  rows: Record<string, unknown>[],
  params: Record<string, unknown>,
  source: DashboardDataSourceRef,
) =>
  rows.filter((row) =>
    Object.entries(params).every(([key, value]) => {
      if (key === 'key' || isEmptyFilterValue(value)) {
        return true;
      }

      if (!(key in row)) {
        return !source.requiredParams?.includes(key);
      }

      const acceptedValues = toComparableValues(value);

      return toComparableValues(row[key]).some((item) => acceptedValues.includes(item));
    }),
  );

const normalizeFilterFields = (fields: string | string[] | undefined, fallback: string) => {
  if (!fields) {
    return [fallback];
  }

  return Array.isArray(fields) ? fields : [fields];
};

const filterRowsByFilters = (
  rows: Record<string, unknown>[],
  filters: Record<string, string>,
  source: DashboardDataSourceRef,
) =>
  rows.filter((row) =>
    Object.entries(filters).every(([filterId, value]) => {
      if (isEmptyFilterValue(value)) {
        return true;
      }

      if (source.ignoredFilters?.includes(filterId)) {
        return true;
      }

      const fields = normalizeFilterFields(source.filterFields?.[filterId], filterId);
      const existingFields = fields.filter((field) => field in row);

      if (existingFields.length === 0) {
        return !source.requiredFilters?.includes(filterId);
      }

      const acceptedValues = toComparableValues(value);

      return existingFields.some((field) => toComparableValues(row[field]).some((item) => acceptedValues.includes(item)));
    }),
  );

const getByPath = (source: unknown, path?: string) => {
  if (!path) {
    return source;
  }

  return path.split('.').reduce<unknown>((current, segment) => {
    if (current && typeof current === 'object' && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, source);
};

const toRowArray = (payload: unknown) => (Array.isArray(payload) ? payload : []);

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const resolveApiScope = (request: DashboardDataSourceRequest) => ({
  filters: request.filters,
  params: request.params,
  context: {
    ...request.context,
    allFilters: request.allFilters,
    filterScope: request.filterScope,
  },
});

const resolveApiParams = (
  params: DashboardApiSourceConfig['query'],
  request: DashboardDataSourceRequest,
) => resolveDashboardParams(params, resolveApiScope(request));

const applyPathParams = (url: string, pathParams: Record<string, unknown>) =>
  Object.entries(pathParams).reduce((nextUrl, [key, value]) => {
    const pattern = new RegExp(`:${escapeRegExp(key)}\\b|\\{${escapeRegExp(key)}\\}`, 'g');
    return nextUrl.replace(pattern, encodeURIComponent(toComparableValues(value).join(',')));
  }, url);

const appendQueryValue = (
  searchParams: URLSearchParams,
  key: string,
  value: unknown,
  api: DashboardApiSourceConfig,
) => {
  const omitEmpty = api.omitEmptyQuery !== false;

  if (value === undefined || value === null) {
    return;
  }

  if (Array.isArray(value)) {
    const values = value.map(toComparableText).filter((item) => !omitEmpty || !isEmptyFilterValue(item));

    if (values.length === 0) {
      return;
    }

    if (api.arrayFormat === 'repeat') {
      values.forEach((item) => searchParams.append(key, item));
      return;
    }

    searchParams.set(key, values.join(','));
    return;
  }

  const text = typeof value === 'object' ? JSON.stringify(value) : toComparableText(value);

  if (omitEmpty && isEmptyFilterValue(text)) {
    return;
  }

  searchParams.set(key, text);
};

const buildApiUrl = (api: DashboardApiSourceConfig, request: DashboardDataSourceRequest) => {
  const pathParams = resolveApiParams(api.pathParams, request);
  const resolvedUrl = applyPathParams(api.url, pathParams);
  const origin = typeof window === 'undefined' ? 'http://localhost' : window.location.origin;
  const url = new URL(resolvedUrl, origin);
  const query = resolveApiParams(api.query, request);

  Object.entries(query).forEach(([key, value]) => appendQueryValue(url.searchParams, key, value, api));

  return url.toString();
};

const normalizeHeaders = (headers: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(headers)
      .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
      .map(([key, value]) => [key, String(value)]),
  );

const hasHeader = (headers: Record<string, string>, name: string) =>
  Object.keys(headers).some((key) => key.toLowerCase() === name.toLowerCase());

const createRequestBody = (
  api: DashboardApiSourceConfig,
  request: DashboardDataSourceRequest,
  headers: Record<string, string>,
) => {
  if (api.body === undefined || api.body === null) {
    return undefined;
  }

  const body = resolveDashboardValue(api.body, resolveApiScope(request));

  if (body === undefined || body === null) {
    return undefined;
  }

  if (typeof body === 'string') {
    return body;
  }

  if (!hasHeader(headers, 'content-type')) {
    headers['Content-Type'] = 'application/json';
  }

  return JSON.stringify(body);
};

const parseApiResponse = async (response: Response) => {
  if (response.status === 204) {
    return [];
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();

  if (!text) {
    return [];
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

// 常规响应适配器注册表。大多数接口只需要配置 responsePath；字段重命名、嵌套拉平、
// 单位/枚举转换等差异，再新增具名 adapter。
export const responseAdapterRegistry: Record<string, DashboardResponseAdapter | undefined> = {
  rows: (payload) => toRowArray(payload),
};

const resolveApiData: DashboardDataSourceResolver = async (request) => {
  const { api } = request.source;

  if (!api) {
    return [];
  }

  const method = api.method ?? 'GET';
  const headers = normalizeHeaders(resolveApiParams(api.headers, request));
  const init: RequestInit = {
    method,
    credentials: api.credentials,
  };

  const body = createRequestBody(api, request, headers);

  if (Object.keys(headers).length > 0) {
    init.headers = headers;
  }

  if (body !== undefined && method !== 'GET' && method !== 'DELETE') {
    init.body = body;
  }

  const response = await fetch(buildApiUrl(api, request), init);

  if (!response.ok) {
    throw new Error(`Dashboard API source failed: ${response.status} ${response.statusText}`);
  }

  const payload = await parseApiResponse(response);
  const selectedPayload = getByPath(payload, api.responsePath);
  const adapter = api.adapter ? responseAdapterRegistry[api.adapter] : responseAdapterRegistry.rows;

  if (!adapter) {
    console.warn(`Dashboard API adapter "${api.adapter}" is not registered.`);
    return [];
  }

  return adapter(selectedPayload, request);
};

// 数据源注册表。
// 常规 API 不需要写 resolver，直接在 dashboard.config.ts 中使用 id: 'apiData' 并配置 api。
// 只有签名、特殊鉴权、复杂分页、实时流等场景，才需要在这里登记自定义数据源函数。
//
// 内置数据源通过 src/data/dashboard.loader.ts 读取 src/data/dashboard.dataset.json：
// - filterData 读取筛选维表，businessData/staticData 读取业务数据。
// - params.key 指定 filterData 或 businessData 里的数据集名称。
// - 其他 params 会按同名字段过滤数据行，例如 cycle/scope/org。
// - 当前组件可见的 filters 会自动按同名字段过滤；字段名不一致时配置 source.filterFields。
// - 筛选值为空、all 或 __all 时表示不过滤。
// - 组件确实不受某个全局筛选影响时，写 source.ignoredFilters 显式声明。
// - 组件必须受某个筛选影响时，写 source.requiredFilters 防止字段漏配后静默失效。
// - 固定 params 也必须参与过滤时，写 source.requiredParams 防止字段漏配后静默失效。
// - apiData/httpData 根据 source.api 发起请求，支持 query、headers、body、responsePath 和 adapter。
//
// 示例：
// export const dataSourceRegistry = {
//   ...builtinDataSourceRegistry,
//   signedRevenueRows: async ({ filters }) => {
//     const response = await fetch(`/api/revenue/rows?regionId=${filters.regionId}`, {
//       headers: { 'X-Signature': createSignature(filters) },
//     });
//     const payload = await response.json();
//     return payload.data.rows;
//   },
// };
export const builtinDataSourceRegistry: Record<string, DashboardDataSourceResolver | undefined> = {
  filterData: ({ source, filters, params }) =>
    filterRowsByFilters(filterRowsByParams(readDashboardFilterRows(params.key), params, source), filters, source),
  businessData: ({ source, filters, params }) =>
    filterRowsByFilters(filterRowsByParams(readDashboardBusinessRows(params.key), params, source), filters, source),
  staticData: ({ source, filters, params }) =>
    filterRowsByFilters(filterRowsByParams(readDashboardBusinessRows(params.key), params, source), filters, source),
  apiData: resolveApiData,
  httpData: resolveApiData,
};

export const dataSourceRegistry: Record<string, DashboardDataSourceResolver | undefined> = {
  ...builtinDataSourceRegistry,
};

export const resolveDataSource = async (
  source: DashboardDataSourceRef,
  request: Omit<DashboardDataSourceRequest, 'source'>,
) => {
  const resolver = dataSourceRegistry[source.id];

  if (!resolver) {
    return [];
  }

  const result = await resolver({
    ...request,
    source,
  });

  return Array.isArray(result) ? result : [];
};
