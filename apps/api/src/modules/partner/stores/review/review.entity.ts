import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database';
import { User } from '../../../users/user.entity';
import { Store } from '../store.entity';

@Entity('reviews')
export class Review extends BaseEntity {
  @Column({ type: 'numeric', nullable: true, precision: 2, scale: 1 })
  rating: number;

  @Column({ type: 'varchar', nullable: true })
  comment: string;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Store, (store) => store.reviews, { onDelete: 'CASCADE' })
  store: Store;
}
