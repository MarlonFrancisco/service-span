import { IProfessional } from '@/types/api/users.types';
import { apiClient } from '../api';
import { HttpClientService } from '../api/http-client.service';

export class StoreMembersService {
  public static apiClient: HttpClientService = apiClient;

  static async get(storeId: string) {
    return await this.apiClient.get<IProfessional[]>(
      `/partner/stores/${storeId}/members`,
    );
  }

  static async create(storeId: string, professional: Partial<IProfessional>) {
    return await this.apiClient.post<IProfessional>(
      `/partner/stores/${storeId}/members`,
      professional,
    );
  }

  static async update(storeId: string, professional: Partial<IProfessional>) {
    return await this.apiClient.put<IProfessional>(
      `/partner/stores/${storeId}/members/${professional.id}`,
      professional,
    );
  }

  static async delete(storeId: string, professionalId: string) {
    return await this.apiClient.delete<{ id: string; store: { id: string } }>(
      `/partner/stores/${storeId}/members/${professionalId}`,
    );
  }
}
