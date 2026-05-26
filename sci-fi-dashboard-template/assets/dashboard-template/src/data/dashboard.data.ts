export type DashboardDataRow = Record<string, string | number | boolean | null>;

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
//     cycle: '$filters.cycle',
//     scope: '$filters.scope',
//   },
// }
export const dashboardData: Record<string, DashboardDataRow[]> = {};
