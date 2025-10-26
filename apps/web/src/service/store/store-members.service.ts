import { IProfessional, TProfessionalRole } from '@/types/api/users.types';
import { apiClient } from '../api';
import { HttpClientService } from '../api/http-client.service';

export class StoreMembersService {
  public static apiClient: HttpClientService = apiClient;

  static async getStoreMembers(storeId: string) {
    return await this.apiClient.get<IProfessional[]>(
      `/partner/stores/${storeId}/members`,
    );
  }

  static async createStoreMember(
    storeId: string,
    professional: { user: { email: string }; role: TProfessionalRole },
  ) {
    return await this.apiClient.post<IProfessional>(
      `/partner/stores/${storeId}/members`,
      professional,
    );
  }

  static async updateStoreMember(
    storeId: string,
    professional: {
      id: string;
      role: TProfessionalRole;
      user: { email: string };
    },
  ) {
    return await this.apiClient.put<IProfessional>(
      `/partner/stores/${storeId}/members/${professional.id}`,
      professional,
    );
  }

  static async deleteStoreMember(storeId: string, professionalId: string) {
    return await this.apiClient.delete<void>(
      `/partner/stores/${storeId}/members/${professionalId}`,
    );
  }
}
