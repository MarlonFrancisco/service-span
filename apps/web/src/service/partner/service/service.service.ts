import { apiClient } from '@/service/api';
import { IService } from '@/types/api/service.types';

export class ServiceService {
  static apiClient = apiClient;
  static headers?: HeadersInit;

  static async getAll(storeId: string, categoryId: string) {
    return await this.apiClient.get<IService[]>(
      `/partner/stores/${storeId}/categories/${categoryId}/services`,
    );
  }

  static async get(storeId: string, categoryId: string, serviceId: string) {
    return await this.apiClient.get<IService>(
      `/partner/stores/${storeId}/categories/${categoryId}/services/${serviceId}`,
    );
  }

  static async create(storeId: string, service: Partial<IService>) {
    return await this.apiClient.post<IService>(
      `/partner/stores/${storeId}/categories/${service.category?.id}/services`,
      service,
    );
  }

  static async update(storeId: string, service: Partial<IService>) {
    return await this.apiClient.put<IService>(
      `/partner/stores/${storeId}/categories/${service.category?.id}/services/${service.id}`,
      service,
    );
  }

  static async delete(storeId: string, categoryId: string, serviceId: string) {
    return await this.apiClient.delete<IService>(
      `/partner/stores/${storeId}/categories/${categoryId}/services/${serviceId}`,
    );
  }
}
