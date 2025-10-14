import { IUser } from '@/types/api';
import { getQueryClient } from '@/utils/helpers/query.helper';
import { apiClient } from '../api';
import { HttpClientService } from '../api/http-client.service';

export class UsersService {
  private static apiClient: HttpClientService = apiClient;

  static async getUser() {
    const queryClient = getQueryClient();
    const response = await queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: () => this.apiClient.get<IUser>('/users/me'),
    });

    return response;
  }
}
