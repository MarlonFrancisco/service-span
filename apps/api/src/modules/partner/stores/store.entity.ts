import { User } from 'src/modules/users/user.entity';
import { Column, Entity, Index, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../database';
import { Category } from './category/category.entity';
import { Service } from './category/service/service.entity';
import { Gallery } from './gallery/gallery.entity';
import { NotificationsHistory } from './notifications/history/history.entity';
import { NotificationsSettings } from './notifications/settings/settings.entity';
import { Schedule } from './schedule/schedule.entity';
import { StoreMember } from './store-member/store-member.entity';

@Entity('stores')
export class Store extends BaseEntity {
  // general information

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  amenities: string[];

  @Column({ type: 'boolean', default: false, nullable: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false, nullable: true })
  isDeleted: boolean;

  // business hours
  @Column({ type: 'char', length: 5, nullable: true })
  openTime: string;

  @Column({ type: 'char', length: 5, nullable: true })
  closeTime: string;

  @Column({ type: 'char', length: 5, nullable: true })
  lunchStartTime: string;

  @Column({ type: 'char', length: 5, nullable: true })
  lunchEndTime: string;

  @Column({ type: 'jsonb', nullable: true })
  businessDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };

  // location

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  state: string;

  @Column({ type: 'varchar', nullable: true })
  zipCode: string;

  // contact

  @Column({ type: 'varchar', nullable: true })
  telephone: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  website: string;

  @Column({ type: 'varchar', nullable: true })
  instagram: string;

  @Column({ type: 'varchar', nullable: true })
  facebook: string;

  // relations

  @OneToMany(() => StoreMember, (storeMember) => storeMember.store)
  storeMembers: StoreMember[];

  @OneToMany(() => Service, (service) => service.store)
  services: Service[];

  @OneToMany(() => Category, (category) => category.store)
  categories: Category[];

  @OneToMany(() => Gallery, (gallery) => gallery.store)
  gallery: Gallery[];

  @ManyToOne(() => User, (user) => user.stores, { onDelete: 'CASCADE' })
  @Index(['owner'])
  owner: User;

  @OneToMany(() => Schedule, (schedule) => schedule.store)
  schedules: Schedule[];

  @OneToMany(
    () => NotificationsHistory,
    (notificationsHistory) => notificationsHistory.store,
  )
  notificationsHistory: NotificationsHistory[];

  @OneToOne(
    () => NotificationsSettings,
    (notificationsSettings) => notificationsSettings.store,
  )
  notificationsSettings: NotificationsSettings;
}
