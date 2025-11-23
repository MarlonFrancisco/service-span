import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../database/base.entity';
import { User } from '../users/user.entity';
import type { TSubscriptionStatus } from './subscription.types';

@Entity('subscriptions')
@Index('idx_subscriptions_user', ['user.id'])
export class Subscription extends BaseEntity {
  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;

  @Column({ type: 'varchar', nullable: true })
  subscriptionId: string;

  @Column({ type: 'varchar', nullable: true })
  status: TSubscriptionStatus;

  @Column({ type: 'varchar', nullable: true })
  priceId: string;

  @Column({ type: 'varchar', nullable: true })
  productId: string;

  @Column({ type: 'date', nullable: true })
  currentPeriodEnd: Date;

  @Column({ type: 'date', nullable: true })
  currentPeriodStart: Date;
}
