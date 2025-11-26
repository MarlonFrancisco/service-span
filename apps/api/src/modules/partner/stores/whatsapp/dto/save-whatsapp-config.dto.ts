import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

export class SaveWhatsappConfigDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  phoneNumberId: string;

  @IsString()
  businessAccountId: string;

  @IsString()
  accessToken: string;

  @IsString()
  webhookVerifyToken: string;

  @IsBoolean()
  isActive: boolean;

  @IsObject()
  store: { id: string };
}
