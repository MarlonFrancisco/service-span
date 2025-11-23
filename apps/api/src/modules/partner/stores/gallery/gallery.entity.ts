import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { Store } from '../store.entity';

@Entity('gallery')
export class Gallery extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  url: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  isMain: boolean;

  @ManyToOne(() => Store, (store) => store.gallery, { onDelete: 'CASCADE' })
  store: Store;
}
