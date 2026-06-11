import type { AxiosRequestConfig } from 'axios';

export const dashboardOverview: AxiosRequestConfig = {
  url: '/api/dashboard/overview',
  method: 'GET',
};

export const dashboardDetail = (id: string | number): AxiosRequestConfig => ({
  url: `/api/dashboard/${id}`,
  method: 'GET',
});
