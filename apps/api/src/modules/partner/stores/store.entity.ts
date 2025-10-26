import { User } from 'src/modules/users/user.entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database';
import { Gallery } from './gallery/gallery.entity';
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

  @OneToMany(() => StoreMember, (storeMember) => storeMember.store)
  storeMembers: StoreMember[];

  @OneToMany(() => Gallery, (gallery) => gallery.store)
  gallery: Gallery[];

  @ManyToOne(() => User, (user) => user.stores)
  @Index(['owner'])
  owner: User;

  get storeMembersCount(): number {
    return this.storeMembers.length;
  }

  get galleryCount(): number {
    return this.gallery.length;
  }
}
