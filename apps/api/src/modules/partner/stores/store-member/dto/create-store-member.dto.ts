import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsObject,
  IsOptional,
} from 'class-validator';
import type { User } from '../../../../users/user.entity';
import type { Service } from '../../category/service/service.entity';
import type { Store } from '../../store.entity';

export class CreateStoreMemberDto {
  @IsObject()
  user: Partial<User>;

  @IsObject()
  store: Partial<Store>;

  @IsEnum(['owner', 'manager', 'professional'])
  role: 'owner' | 'manager' | 'professional';

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsArray()
  @IsOptional()
  services: Partial<Service>[];
}
