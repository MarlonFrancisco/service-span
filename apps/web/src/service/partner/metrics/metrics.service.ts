import { apiClient } from '@/service/api';
import {
  IDashboardCustomers,
  IDashboardOperational,
  IDashboardOverview,
  IDashboardSales,
  PeriodType,
} from '@/types/api/metrics.types';

export class MetricsService {
  static apiClient = apiClient;

  static async getOverview(storeId: string, period: PeriodType = 'week') {
    return await this.apiClient.get<IDashboardOverview>(
      `/partner/stores/${storeId}/metrics/overview?period=${period}`,
    );
  }

  static async getSales(storeId: string, period: PeriodType = 'month') {
    return await this.apiClient.get<IDashboardSales>(
      `/partner/stores/${storeId}/metrics/sales?period=${period}`,
    );
  }

  static async getOperational(storeId: string, period: PeriodType = 'month') {
    return await this.apiClient.get<IDashboardOperational>(
      `/partner/stores/${storeId}/metrics/operational?period=${period}`,
    );
  }

  static async getCustomers(storeId: string, period: PeriodType = 'month') {
    return await this.apiClient.get<IDashboardCustomers>(
      `/partner/stores/${storeId}/metrics/customers?period=${period}`,
    );
  }
}
