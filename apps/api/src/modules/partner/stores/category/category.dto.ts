import { IsObject, IsOptional, IsString } from 'class-validator';
import type { Store } from '../store.entity';

export class CategoryDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  color: string;

  @IsObject()
  @IsOptional()
  store: Partial<Store>;
}
