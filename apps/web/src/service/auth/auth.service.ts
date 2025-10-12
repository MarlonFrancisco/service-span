import { apiClient } from '../api';
import { HttpClientService } from '../api/http-client.service';

export class AuthService {
  private static apiClient: HttpClientService = apiClient;

  static async login(email?: string, telephone?: string) {
    const response = await this.apiClient.post<{
      isNewUser: boolean;
    }>('/auth/code', {
      email,
      telephone,
    });
    return response.data;
  }

  static async validateCode(code: string, email?: string, telephone?: string) {
    const response = await this.apiClient.post<void>('/auth/validate-code', {
      code,
      email,
      telephone,
    });
    return response.data;
  }

  static async register(payload: {
    email: string;
    telephone: string;
    firstName: string;
    lastName: string;
  }) {
    const response = await this.apiClient.post<void>('/auth/register', payload);
    return response;
  }
}
