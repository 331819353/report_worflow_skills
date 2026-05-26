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
      if (key === 'key' || value === undefined || value === null || value === '') {
        return true;
      }

      if (!(key in row)) {
        return true;
      }

      return toComparableText(row[key]) === toComparableText(value);
    }),
  );

// 数据源注册表。
// 新人接真实接口时，只需要在这里登记数据源函数，然后在 dashboard.config.ts 中引用 source.id。
//
// 内置 staticData 只读取 src/data/dashboard.data.ts：
// - params.key 指定 dashboardData 里的数据集名称。
// - 其他 params 会按同名字段过滤数据行，例如 cycle/scope/org。
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
  staticData: ({ params }) => filterRowsByParams(readStaticDataRows(params.key), params),
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
