import { isServer, QueryClient } from '@tanstack/react-query';

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
      },
    },
  });
};

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!window.browserQueryClient) {
      window.browserQueryClient = makeQueryClient();
    }

    return window.browserQueryClient;
  }
};

export const CACHE_QUERY_KEYS = {
  reviews: (storeId: string) => [`partner/stores/${storeId}/reviews`],
  recommendationStores: () => ['recommendation/popular-stores'],
  user: (userIdentification: string) => ['user', { userIdentification }],
  plans: () => ['plans'],
  currentPlan: () => ['subscription/current-plan'],
  stores: () => ['partner/stores'],
  schedules: (storeId: string) => [`partner/schedules/${storeId}`],
  blockedTimes: (storeId: string) => [
    `partner/schedules/blocked-times/${storeId}`,
  ],
  store: (storeId: string) => [`partner/stores/${storeId}`],
  categories: (storeId: string) => [`partner/categories/${storeId}`],
  notificationsHistory: (storeId: string) => [
    `partner/stores/${storeId}/notifications/history`,
  ],
  notificationsSettings: (storeId: string) => [
    `partner/stores/${storeId}/notifications/settings`,
  ],
  metricsOverview: (storeId: string, period: string = 'week') => [
    `partner/stores/${storeId}/metrics/overview`,
    { period },
  ],
  metricsSales: (storeId: string, period: string = 'month') => [
    `partner/stores/${storeId}/metrics/sales`,
    { period },
  ],
  metricsOperational: (storeId: string, period: string = 'month') => [
    `partner/stores/${storeId}/metrics/operational`,
    { period },
  ],
  metricsCustomers: (storeId: string, period: string = 'month') => [
    `partner/stores/${storeId}/metrics/customers`,
    { period },
  ],
  search: (query: string) => ['search', { query }],
};
