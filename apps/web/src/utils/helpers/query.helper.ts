import { isServer, QueryClient } from '@tanstack/react-query';

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        retry: (failureCount, error) => {
          // Extract status from error cause
          let status: number | undefined;

          console.log('Retry attempt:', { failureCount, error, errorType: error?.constructor?.name });

          if (error instanceof Error && error.cause) {
            const cause = error.cause as { response?: { status: number } };
            status = cause?.response?.status;
            console.log('Extracted status from error.cause:', status);
          }

          // Don't retry 404 errors
          if (status === 404) {
            console.log('Not retrying 404 error');
            return false;
          }

          // Retry other errors up to 2 times
          const shouldRetry = failureCount < 2;
          console.log('Retrying error:', { shouldRetry, failureCount, status });
          return shouldRetry;
        },
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
  notificationsHistory: (
    storeId: string,
    params?: {
      page?: number;
      limit?: number;
      type?: string;
      status?: string;
      search?: string;
    },
  ) => [`partner/stores/${storeId}/notifications/history`, { params }],
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
  whatsappConfig: (storeId: string) => [`partner/stores/${storeId}/whatsapp`],
};
