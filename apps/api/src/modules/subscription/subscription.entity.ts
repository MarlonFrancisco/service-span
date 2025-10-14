import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../database';
import { User } from '../users';

@Entity('subscriptions')
export class Subscription extends BaseEntity {
  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;

  @Column({ type: 'varchar', nullable: true })
  subscriptionId: string;

  @Column({ type: 'varchar', nullable: true })
  status:
    | 'incomplete'
    | 'incomplete_expired'
    | 'trialing'
    | 'active'
    | 'past_due'
    | 'canceled'
    | 'unpaid'
    | 'paused'
    | 'draft'
    | 'open'
    | 'paid';

  @Column({ type: 'varchar', nullable: true })
  priceId: string;

  @Column({ type: 'varchar', nullable: true })
  productId: string;

  @Column({ type: 'date', nullable: true })
  currentPeriodEnd: Date;

  @Column({ type: 'date', nullable: true })
  currentPeriodStart: Date;
}
