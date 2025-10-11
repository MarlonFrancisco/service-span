import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../database/base.entity';

@Entity('tb_users')
export class User extends BaseEntity {
  @Column({ unique: true, nullable: false })
  @Index()
  email: string;

  @Column({ unique: true, nullable: false })
  @Index()
  telephone?: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
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
