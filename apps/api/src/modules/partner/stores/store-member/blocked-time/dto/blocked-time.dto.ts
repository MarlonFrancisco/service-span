import { IsArray, IsBoolean, IsDate, IsNumber, IsObject, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import type { StoreMember } from '../../store-member.entity';

export class BlockedTimeDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  time: string;

  @IsBoolean()
  @IsOptional()
  isRecurring?: boolean;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(6)
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  @IsObject()
  storeMember: Partial<StoreMember>;
}

class BlockedTimeItemDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  time: string;

  @IsBoolean()
  @IsOptional()
  isRecurring?: boolean;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(6)
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export class CreateBulkBlockedTimeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockedTimeItemDto)
  blockedTimes: BlockedTimeItemDto[];
}

class DeleteBlockedTimeItemDto {
  @IsString()
  id: string;
}

export class DeleteBulkBlockedTimeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeleteBlockedTimeItemDto)
  blockedTimes: DeleteBlockedTimeItemDto[];
}
