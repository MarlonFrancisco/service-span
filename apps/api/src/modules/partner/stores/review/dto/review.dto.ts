import type { User } from '../../../../users/user.entity';
import type { Store } from '../../store.entity';

export class ReviewDto {
  id?: string;
  rating: number;
  comment: string;
  user: Partial<User>;
  store: Partial<Store>;

  constructor(data: Partial<ReviewDto>) {
    this.id = data.id;
    this.rating = data.rating;
    this.comment = data.comment;
    this.user = data.user;
    this.store = data.store;
  }
}
