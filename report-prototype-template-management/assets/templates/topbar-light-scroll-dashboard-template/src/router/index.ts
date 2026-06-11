import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import dashboardRoutes from './modules/dashboard';

const routes: RouteRecordRaw[] = [
  ...dashboardRoutes,
  {
    path: '/no-access',
    name: 'NoAccess',
    component: () => import('@/views/no-access.vue'),
    meta: {
      title: 'No access',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
    meta: {
      title: 'Not found',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
