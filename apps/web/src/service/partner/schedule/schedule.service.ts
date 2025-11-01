import { IAppointment } from '@/types/api/schedule.types';
import { apiClient } from '../../api';
import { HttpClientService } from '../../api/http-client.service';

export class ScheduleService {
  static apiClient: HttpClientService = apiClient;
  static headers?: HeadersInit;

  static async create(storeId: string, schedule: Partial<IAppointment>) {
    return await this.apiClient.post<IAppointment>(
      `/partner/stores/${storeId}/schedules`,
      schedule,
    );
  }

  static async getAll(storeId: string) {
    return await this.apiClient.get<IAppointment[]>(
      `/partner/stores/${storeId}/schedules`,
    );
  }

  static async update(
    storeId: string,
    scheduleId: string,
    schedule: Partial<IAppointment>,
  ) {
    return await this.apiClient.put<IAppointment>(
      `/partner/stores/${storeId}/schedules/${scheduleId}`,
      schedule,
    );
  }

  static async delete(storeId: string, scheduleId: string) {
    return await this.apiClient.delete<IAppointment>(
      `/partner/stores/${storeId}/schedules/${scheduleId}`,
    );
  }
}
