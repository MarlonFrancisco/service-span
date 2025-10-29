import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { StoreMember } from '../../stores/store-member/store-member.entity';
import { Store } from '../../stores/store.entity';
import { Category } from '../category.entity';

@Entity('services')
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

  @ManyToOne(() => Store, (store) => store.services)
  store: Store;

  @ManyToOne(() => Category, (category) => category.services)
  category: Category;

  @ManyToMany(() => StoreMember, (storeMember) => storeMember.services)
  storeMembers: StoreMember[];
}
