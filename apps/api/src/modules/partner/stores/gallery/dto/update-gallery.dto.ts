import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import type { Store } from '../../store.entity';

export class UpdateGalleryDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsBoolean()
  @IsOptional()
  isMain?: boolean;

  @IsObject()
  @IsOptional()
  store?: Partial<Store>;
}
