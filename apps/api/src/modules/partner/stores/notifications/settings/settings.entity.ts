import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../../database';
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

  @OneToOne(() => Store, (store) => store.notificationsSettings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  store: Store;
}
