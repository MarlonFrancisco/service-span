import type {
  IWhatsappConfigPayload,
  IWhatsappConfigResponse,
} from '@/types/api/whatsapp.types';
import { apiClient } from '../api';

export class WhatsappService {
  static apiClient = apiClient;

  public static async saveConfig(config: IWhatsappConfigPayload) {
    const response = await this.apiClient.post<IWhatsappConfigResponse>(
      `/partner/stores/${config.store.id}/whatsapp`,
      config,
    );

    return response;
  }

  public static async getConfig(storeId: string) {
    const response = await this.apiClient.get<IWhatsappConfigResponse>(
      `/partner/stores/${storeId}/whatsapp`,
    );

    return response;
  }
}
