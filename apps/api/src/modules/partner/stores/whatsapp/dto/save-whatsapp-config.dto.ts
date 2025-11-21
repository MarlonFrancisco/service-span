export class SaveWhatsappConfigDto {
  id: string;
  phoneNumberId: string;
  businessAccountId: string;
  accessToken: string;
  webhookVerifyToken: string;
  store: { id: string };

  constructor(partial: Partial<SaveWhatsappConfigDto>) {
    this.id = partial.id;
    this.phoneNumberId = partial.phoneNumberId;
    this.businessAccountId = partial.businessAccountId;
    this.accessToken = partial.accessToken;
    this.webhookVerifyToken = partial.webhookVerifyToken;
    this.store = partial.store;
  }
}
