import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import type { Store } from '../../store.entity';
import type { Category } from '../category.entity';

export class ServiceDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  price: number;

  @IsBoolean()
  isActive: boolean;

  @IsObject()
  @IsOptional()
  category: Partial<Category>;

  @IsObject()
  @IsOptional()
  store: Partial<Store>;
}
