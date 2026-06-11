import type { RouteRecordRaw } from 'vue-router';

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'DashboardHome',
    component: () => import('@/views/index.vue'),
    meta: {
      title: 'Dashboard',
      requiresAuth: false,
    },
  },
];

export default dashboardRoutes;
