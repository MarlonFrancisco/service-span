import type { User } from 'src/modules/users/user.entity';
import type { Store } from '../../store.entity';

export class ReviewDto {
  rating: number;
  comment: string;
  user: Partial<User>;
  store: Partial<Store>;

  constructor(data: Partial<ReviewDto>) {
    this.rating = data.rating;
    this.comment = data.comment;
    this.user = data.user;
    this.store = data.store;
  }
}
