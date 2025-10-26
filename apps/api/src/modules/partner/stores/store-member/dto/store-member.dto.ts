import type { User } from '../../../../users/user.entity';
import type { Store } from '../../store.entity';
export class StoreMemberDto {
  id: string;
  user: Partial<User>;
  store: Partial<Store>;
  role: 'owner' | 'manager' | 'professional';
  isActive: boolean;
  isDeleted: boolean;

  constructor(data: Partial<StoreMemberDto>) {
    this.id = data.id;
    this.user = data.user;
    this.store = data.store;
    this.role = data.role;
    this.isActive = data.isActive;
    this.isDeleted = data.isDeleted;
  }
}
