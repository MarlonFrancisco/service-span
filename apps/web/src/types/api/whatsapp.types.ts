import { IStore } from './stores.types';

export interface IWhatsappConfigPayload {
  id?: string;
  phoneNumberId: string;
  businessAccountId: string;
  accessToken: string;
  webhookVerifyToken: string;
  isActive: boolean;
  store: Pick<IStore, 'id'>;
}

export interface IWhatsappConfigResponse {
  id: string;
  phoneNumberId: string;
  businessAccountId: string;
  accessToken: string;
  webhookVerifyToken: string;
  isActive: boolean;
  store: Pick<IStore, 'id'>;
}
