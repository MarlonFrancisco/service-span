import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateNotificationHistoryDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsBoolean()
  @IsOptional()
  read: boolean;

  @IsString()
  @IsOptional()
  @IsDate()
  createdAt: string;

  @IsString()
  @IsOptional()
  @IsDate()
  updatedAt: string;

  @IsString()
  @IsOptional()
  @IsEnum(['booking', 'cancellation', 'reminder', 'system', 'marketing'])
  type: 'booking' | 'cancellation' | 'reminder' | 'system' | 'marketing';

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  message: string;

  @IsString()
  @IsOptional()
  @IsDate()
  timestamp: string;

  @IsString()
  @IsOptional()
  recipient: string;

  @IsString()
  @IsOptional()
  @IsEnum(['sent', 'delivered', 'failed', 'pending'])
  status: 'sent' | 'delivered' | 'failed' | 'pending';
}
