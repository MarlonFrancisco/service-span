import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database';
import { User } from '../../../users/user.entity';
import { Store } from '../store.entity';

@Entity('store_members')
@Index(['user', 'store'], { unique: true })
export class StoreMember extends BaseEntity {
  @ManyToOne(() => User, (user) => user.storeMembers, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Store, (store) => store.storeMembers, {
    onDelete: 'CASCADE',
  })
  store: Store;

  @Column({
    type: 'enum',
    nullable: true,
    enum: ['owner', 'manager', 'professional'],
  })
  role: 'owner' | 'manager' | 'professional';

  @Column({ type: 'boolean', nullable: true, default: false })
  isActive: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  isDeleted: boolean;
}
