export class SaveWhatsappConfigDto {
  id: string;
  phoneNumberId: string;
  businessAccountId: string;
  accessToken: string;
  webhookVerifyToken: string;
  isActive: boolean;
  store: { id: string };

  constructor(partial: Partial<SaveWhatsappConfigDto>) {
    this.id = partial.id;
    this.phoneNumberId = partial.phoneNumberId;
    this.businessAccountId = partial.businessAccountId;
    this.accessToken = partial.accessToken;
    this.webhookVerifyToken = partial.webhookVerifyToken;
    this.isActive = partial.isActive;
    this.store = partial.store;
  }
}
