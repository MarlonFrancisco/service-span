import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../database/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: true, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  telephone: string;

  @Column({ name: 'first_name', type: 'varchar', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  lastName: string;

  @Column({ name: 'auth_code', type: 'varchar', length: 6, nullable: true })
  @Index()
  authCode: string;

  @Column({ name: 'auth_code_expires_at', type: 'timestamp', nullable: true })
  authCodeExpiresAt: Date;

  @Column({
    name: 'accepted_terms',
    type: 'boolean',
    default: false,
    nullable: true,
  })
  acceptedTerms: boolean;
}
