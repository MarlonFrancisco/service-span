import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { Store } from '../store.entity';

@Entity('whatsapp_configs')
export class WhatsappConfig extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  phoneNumberId: string;

  @Column({ type: 'varchar', nullable: true })
  businessAccountId: string;

  @Column({ type: 'varchar', nullable: true })
  accessToken: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  isActive: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  webhookVerifyToken: string;

  @OneToOne(() => Store, { onDelete: 'CASCADE' })
  @JoinColumn()
  store: Store;
}
