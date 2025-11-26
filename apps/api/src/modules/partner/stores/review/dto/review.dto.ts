import { IsNumber, IsObject, IsOptional, IsString, Max, Min } from 'class-validator';
import type { User } from '../../../../users/user.entity';
import type { Store } from '../../store.entity';

export class ReviewDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;

  @IsObject()
  user: Partial<User>;

  @IsObject()
  @IsOptional()
  store: Partial<Store>;
}
