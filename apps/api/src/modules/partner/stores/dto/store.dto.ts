import { IsArray, IsBoolean, IsEmail, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import type { User } from '../../../users/user.entity';
import type { Gallery } from '../gallery/gallery.entity';

class BusinessDaysDto {
  @IsBoolean()
  monday: boolean;

  @IsBoolean()
  tuesday: boolean;

  @IsBoolean()
  wednesday: boolean;

  @IsBoolean()
  thursday: boolean;

  @IsBoolean()
  friday: boolean;

  @IsBoolean()
  saturday: boolean;

  @IsBoolean()
  sunday: boolean;
}

export class StoreDto {
  @IsObject()
  @IsOptional()
  owner: Partial<User>;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zipCode: string;

  @IsString()
  telephone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsOptional()
  instagram: string;

  @IsString()
  @IsOptional()
  facebook: string;

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @IsOptional()
  storeMembers?: User[];

  @IsArray()
  @IsOptional()
  gallery?: Gallery[];

  @IsNumber()
  weeklyGoal: number;

  @IsNumber()
  monthlyGoal: number;

  @IsNumber()
  quarterlyGoal: number;

  @IsString()
  openTime: string;

  @IsString()
  closeTime: string;

  @IsString()
  lunchStartTime: string;

  @IsString()
  lunchEndTime: string;

  @ValidateNested()
  @Type(() => BusinessDaysDto)
  businessDays: BusinessDaysDto;
}
