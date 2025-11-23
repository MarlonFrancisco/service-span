import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../database/base.entity';
import { Store } from '../../store.entity';

@Entity('notifications_history')
export class NotificationsHistory extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ['booking', 'cancellation', 'reminder', 'system', 'marketing'],
  })
  type: 'booking' | 'cancellation' | 'reminder' | 'system' | 'marketing';

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  message: string;

  @Column({ type: 'timestamp', nullable: true })
  timestamp: Date;

  @Column({ type: 'boolean', nullable: true })
  read: boolean;

  @Column({ type: 'varchar', nullable: true })
  recipient?: string;

  @Column({
    type: 'enum',
    enum: ['sent', 'delivered', 'failed', 'pending'],
    nullable: true,
  })
  status?: 'sent' | 'delivered' | 'failed' | 'pending';

  @ManyToOne(() => Store, (store) => store.notificationsHistory, {
    onDelete: 'CASCADE',
  })
  store: Store;
}
