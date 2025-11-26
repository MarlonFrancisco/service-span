import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
import type { Store } from '../../../store.entity';

export class NotificationsSettingsDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsBoolean()
  emailReminderEnabled: boolean;

  @IsString()
  emailReminderAdvanceHours: string;

  @IsString()
  emailReminderCustomMessage: string;

  @IsBoolean()
  smsReminderEnabled: boolean;

  @IsString()
  smsReminderAdvanceHours: string;

  @IsString()
  smsReminderCustomMessage: string;

  @IsBoolean()
  whatsappReminderEnabled: boolean;

  @IsString()
  whatsappReminderAdvanceHours: string;

  @IsString()
  whatsappReminderCustomMessage: string;

  @IsObject()
  @IsOptional()
  store: Partial<Store>;
}
