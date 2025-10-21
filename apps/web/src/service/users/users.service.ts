import { IUser } from '@/types/api';
import { apiClient } from '../api';
import { HttpClientService } from '../api/http-client.service';

export class UsersService {
  public static apiClient: HttpClientService = apiClient;

  static async getUser() {
    return await this.apiClient.get<IUser>('/users/me');
  }

  static async isSubscribed() {
    const { data: user } = await this.getUser();
    return user.isSubscribed;
  }
}
