import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../database/base.entity';
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

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @Column({
    name: 'accepted_terms',
    type: 'boolean',
    default: false,
    nullable: true,
  })
  acceptedTerms: boolean;
}
