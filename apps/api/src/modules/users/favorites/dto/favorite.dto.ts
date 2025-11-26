import { IsObject, IsOptional, IsString } from 'class-validator';
import type { Store } from '../../../partner/stores/store.entity';
import type { User } from '../../../users/user.entity';

export class FavoriteDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsObject()
  user: Partial<User>;

  @IsObject()
  @IsOptional()
  store: Partial<Store>;
}
