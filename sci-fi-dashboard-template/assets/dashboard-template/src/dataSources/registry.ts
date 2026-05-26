import type { DashboardDataSourceRef, DashboardDataSourceRequest } from '../types/data-source';
import { dashboardData } from '../data/dashboard.data';

export type DashboardDataSourceResolver = (
  request: DashboardDataSourceRequest,
) => unknown[] | Promise<unknown[]>;

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

const readStaticDataRows = (key: unknown) => {
  const dataKey = toComparableText(key);

  if (!dataKey) {
    return [];
  }

  return dashboardData[dataKey] ?? [];
};

const filterRowsByParams = (rows: Record<string, unknown>[], params: Record<string, unknown>) =>
  rows.filter((row) =>
    Object.entries(params).every(([key, value]) => {
      if (key === 'key' || isEmptyFilterValue(value)) {
        return true;
      }

      if (!(key in row)) {
        return true;
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

// 数据源注册表。
// 新人接真实接口时，只需要在这里登记数据源函数，然后在 dashboard.config.ts 中引用 source.id。
//
// 内置 staticData 只读取 src/data/dashboard.data.ts：
// - params.key 指定 dashboardData 里的数据集名称。
// - 其他 params 会按同名字段过滤数据行，例如 cycle/scope/org。
// - 当前组件可见的 filters 会自动按同名字段过滤；字段名不一致时配置 source.filterFields。
// - 筛选值为空、all 或 __all 时表示不过滤。
// - 组件确实不受某个全局筛选影响时，写 source.ignoredFilters 显式声明。
// - 组件必须受某个筛选影响时，写 source.requiredFilters 防止字段漏配后静默失效。
// - 如果要接 API，可以新增一个 resolver，不需要改组件。
//
// 示例：
// export const dataSourceRegistry = {
//   ...builtinDataSourceRegistry,
//   regionOptions: async ({ filters }) => {
//     const response = await fetch(`/api/regions?cycle=${filters.cycle}`);
//     return response.json();
//   },
// };
export const builtinDataSourceRegistry: Record<string, DashboardDataSourceResolver | undefined> = {
  staticData: ({ source, filters, params }) => filterRowsByFilters(filterRowsByParams(readStaticDataRows(params.key), params), filters, source),
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
