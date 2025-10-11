import { apiClient } from '../api';
import { HttpClientService } from '../api/http-client.service';

export class AuthService {
  private static apiClient: HttpClientService = apiClient;

  static async login(email?: string, telephone?: string) {
    const response = await this.apiClient.post<{
      access_token: string;
    }>('/auth/create-session', {
      email,
      telephone,
    });
    return response.data;
  }
}
