import type { Store } from '../../../partner/stores/store.entity';
import type { User } from '../../../users/user.entity';

export class FavoriteDto {
  id: string;
  user: Partial<User>;
  store: Partial<Store>;

  constructor(data: Partial<FavoriteDto>) {
    this.id = data.id;
    this.user = data.user;
    this.store = data.store;
  }
}
