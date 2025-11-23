import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../../database/base.entity';
import { Store } from '../../store.entity';

@Entity('notifications_settings')
export class NotificationsSettings extends BaseEntity {
  @Column({ type: 'boolean', default: false, nullable: true })
  emailReminderEnabled: boolean;

  @Column({ type: 'varchar', nullable: true })
  emailReminderAdvanceHours: string;

  @Column({ type: 'varchar', nullable: true })
  emailReminderCustomMessage: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  smsReminderEnabled: boolean;

  @Column({ type: 'varchar', nullable: true })
  smsReminderAdvanceHours: string;

  @Column({ type: 'varchar', nullable: true })
  smsReminderCustomMessage: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  whatsappReminderEnabled: boolean;

  @Column({ type: 'varchar', nullable: true })
  whatsappReminderAdvanceHours: string;

  @Column({ type: 'varchar', nullable: true })
  whatsappReminderCustomMessage: string;

  @OneToOne(() => Store, (store) => store.notificationsSettings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  store: Store;
}
