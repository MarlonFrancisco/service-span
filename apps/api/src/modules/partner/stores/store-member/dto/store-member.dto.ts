import { IsArray, IsBoolean, IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import type { User } from '../../../../users/user.entity';
import type { Service } from '../../category/service/service.entity';
import type { Store } from '../../store.entity';

export class StoreMemberDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsObject()
  @IsOptional()
  user: Partial<User>;

  @IsObject()
  @IsOptional()
  store: Partial<Store>;

  @IsEnum(['owner', 'manager', 'professional'])
  role: 'owner' | 'manager' | 'professional';

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isDeleted: boolean;

  @IsArray()
  @IsOptional()
  services: Partial<Service>[];
}
