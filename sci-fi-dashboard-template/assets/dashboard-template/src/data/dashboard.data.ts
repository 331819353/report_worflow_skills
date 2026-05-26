export type DashboardDataValue = string | number | boolean | null;
export type DashboardDataRow = Record<string, DashboardDataValue | DashboardDataValue[]>;

// 业务静态数据统一放在这里，dashboard.config.ts 只引用数据源 key，不直接承载数据。
//
// 示例：
// export const dashboardData = {
//   revenueMonthly: [
//     { cycle: 'month', scope: 'china', name: '1月', value: 128 },
//     { cycle: 'month', scope: 'overseas', name: '1月', value: 92 },
//   ],
// };
//
// 然后在 dashboard.config.ts 的 widget 中引用：
// data: {
//   id: 'staticData',
//   params: {
//     key: 'revenueMonthly',
//   },
//   // staticData 会自动用当前组件可见的 filters 过滤同名字段。
//   // 如果筛选项 id 和数据字段不同，在这里映射。
//   filterFields: {
//     scope: 'regionId',
//   },
//   requiredFilters: ['scope'],
//   ignoredFilters: ['range'],
// }
export const dashboardData: Record<string, DashboardDataRow[]> = {};
