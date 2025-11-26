import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import type { User } from '../../../../users/user.entity';
import type { Service } from '../../category/service/service.entity';
import type { StoreMember } from '../../store-member/store-member.entity';
import type { Store } from '../../store.entity';

export class ScheduleDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  startTime: string;

  @IsString()
  @IsOptional()
  endTime: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date: Date;

  @IsString()
  @IsOptional()
  notes: string;

  @IsEnum(['scheduled', 'completed', 'cancelled', 'no-show'])
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';

  @IsObject()
  @IsOptional()
  @ValidateNested()
  storeMember: Partial<StoreMember>;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  service: Partial<Service>;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  user: Partial<User>;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  store: Partial<Store>;
}
