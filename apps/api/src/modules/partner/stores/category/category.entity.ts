import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { Store } from '../store.entity';
import { Service } from './service/service.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  color: string;

  @OneToMany(() => Service, (service) => service.category)
  services: Service[];

  @ManyToOne(() => Store, (store) => store.categories, {
    onDelete: 'CASCADE',
  })
  store: Store;
}
