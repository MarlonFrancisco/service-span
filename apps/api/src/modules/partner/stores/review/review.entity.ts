import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database';
import { User } from '../../../users/user.entity';
import { Store } from '../store.entity';

@Entity('reviews')
@Index('idx_reviews_store_user', ['store.id', 'user.id'])
@Index('idx_reviews_store', ['store.id'])
export class Review extends BaseEntity {
  @Column({
    type: 'numeric',
    nullable: true,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => (value ? parseFloat(value) : value),
    },
  })
  rating: number;

  @Column({ type: 'varchar', nullable: true })
  comment: string;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Store, (store) => store.reviews, { onDelete: 'CASCADE' })
  store: Store;
}
