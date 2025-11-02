import { apiClient } from '@/service/api';
import { IDashboardOverview, PeriodType } from '@/types/api/metrics.types';

export class MetricsService {
  static apiClient = apiClient;

  static async getOverview(storeId: string, period: PeriodType = 'week') {
    return await this.apiClient.get<IDashboardOverview>(
      `/partner/stores/${storeId}/metrics/overview?period=${period}`,
    );
  }
}
