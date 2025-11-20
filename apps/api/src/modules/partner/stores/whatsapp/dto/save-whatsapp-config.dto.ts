export class SaveWhatsappConfigDto {
  phoneNumberId: string;
  businessAccountId: string;
  accessToken: string;
  webhookVerifyToken: string;
  store: { id: string };

  constructor(partial: Partial<SaveWhatsappConfigDto>) {
    this.phoneNumberId = partial.phoneNumberId;
    this.businessAccountId = partial.businessAccountId;
    this.accessToken = partial.accessToken;
    this.webhookVerifyToken = partial.webhookVerifyToken;
    this.store = partial.store;
  }
}
