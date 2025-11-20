import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../database';
import { Store } from '../store.entity';

@Entity('whatsapp_configs')
export class WhatsappConfig extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  phoneNumberId: string;

  @Column({ type: 'varchar', nullable: true })
  businessAccountId: string;

  @Column({ type: 'varchar', nullable: true, select: false })
  accessToken: string;

  @Column({ type: 'varchar', nullable: true })
  webhookVerifyToken: string;

  @OneToOne(() => Store, { onDelete: 'CASCADE' })
  @JoinColumn()
  store: Store;
}
