import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
import type { Store } from '../../store.entity';

export class CreateGalleryDto {
  @IsString()
  url: string;

  @IsBoolean()
  isMain: boolean;

  @IsObject()
  @IsOptional()
  store: Partial<Store>;
}
