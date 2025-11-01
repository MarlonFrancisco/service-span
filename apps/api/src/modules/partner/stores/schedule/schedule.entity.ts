import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database';
import { User } from '../../../users/user.entity';
import { Service } from '../category/service/service.entity';
import { StoreMember } from '../store-member/store-member.entity';
import { Store } from '../store.entity';

@Entity('schedules')
export class Schedule extends BaseEntity {
  @Column({ type: 'char', length: 5, nullable: true })
  startTime: string;

  @Column({ type: 'char', length: 5, nullable: true })
  endTime: string;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @Column({ type: 'varchar', nullable: true })
  notes: string;

  @Column({
    type: 'enum',
    nullable: true,
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
  })
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';

  @ManyToOne(() => StoreMember, (storeMember) => storeMember.schedules, {
    onDelete: 'CASCADE',
  })
  storeMember: StoreMember;

  @ManyToOne(() => Service, (service) => service.schedules, {
    onDelete: 'CASCADE',
  })
  service: Service;

  @ManyToOne(() => User, (user) => user.schedules, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Store, (store) => store.schedules, {
    onDelete: 'CASCADE',
  })
  store: Store;
}
