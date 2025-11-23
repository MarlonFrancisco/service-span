import { Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../database/base.entity';
import { Store } from '../../partner/stores/store.entity';
import { User } from '../user.entity';

@Entity('favorites')
@Index('idx_favorites_user', ['user.id'])
@Index('idx_favorites_store', ['store.id'])
export class Favorite extends BaseEntity {
  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @ManyToOne(() => Store, (store) => store.favorites)
  store: Store;
}
