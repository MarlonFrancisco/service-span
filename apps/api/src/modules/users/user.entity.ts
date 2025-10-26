import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../database/base.entity';
import { StoreMember } from '../partner/stores/store-member/store-member.entity';
import { Store } from '../partner/stores/store.entity';
import { Subscription } from '../subscription/subscription.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: true, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true, unique: true, length: 20 })
  telephone: string;

  @Column({ name: 'first_name', type: 'varchar', nullable: true, length: 60 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: true, length: 60 })
  lastName: string;

  @Column({ name: 'auth_code', type: 'char', length: 6, nullable: true })
  @Index()
  authCode: string;

  @Column({ name: 'auth_code_expires_at', type: 'timestamp', nullable: true })
  authCodeExpiresAt: Date;

  @Column({
    name: 'payment_customer_id',
    type: 'varchar',
    unique: true,
    nullable: true,
  })
  paymentCustomerId: string;

  @Column({
    name: 'accepted_terms',
    type: 'boolean',
    default: false,
    nullable: true,
  })
  acceptedTerms: boolean;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(() => Store, (store) => store.id)
  stores: Store[];

  @OneToMany(() => StoreMember, (storeMember) => storeMember.user)
  storeMembers: StoreMember[];
}
