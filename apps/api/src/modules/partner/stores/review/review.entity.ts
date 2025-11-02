import { BaseEntity } from 'src/modules/database';
import { User } from 'src/modules/users/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
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
