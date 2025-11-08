import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../../database';
import { Schedule } from '../../schedule/schedule.entity';
import { StoreMember } from '../../store-member/store-member.entity';
import { Store } from '../../store.entity';
import { Category } from '../category.entity';

@Entity('services')
@Index('idx_services_store', ['store.id'])
@Index('idx_services_category', ['category.id'])
export class Service extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  duration: number;

  @Column({
    type: 'decimal',
    nullable: true,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => (value ? parseFloat(value) : value),
    },
  })
  price: number;

  @Column({ type: 'boolean', nullable: true })
  isActive: boolean;

  @ManyToOne(() => Store, (store) => store.services, {
    onDelete: 'CASCADE',
  })
  store: Store;

  @ManyToOne(() => Category, (category) => category.services, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @ManyToMany(() => StoreMember, (storeMember) => storeMember.services)
  storeMembers: StoreMember[];

  @OneToMany(() => Schedule, (schedule) => schedule.service)
  schedules: Schedule[];
}
