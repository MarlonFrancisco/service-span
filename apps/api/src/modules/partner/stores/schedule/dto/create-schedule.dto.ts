import type { User } from '../../../../users/user.entity';
import type { Service } from '../../category/service/service.entity';
import type { StoreMember } from '../../store-member/store-member.entity';
import type { Store } from '../../store.entity';

export class CreateSchedulesDto {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  date: Date;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  storeMember: Partial<StoreMember>;
  services: Partial<Service>[];
  user: Partial<User>;
  store: Partial<Store>;
  storeId: string;

  constructor(data: Partial<CreateSchedulesDto>) {
    this.id = data.id;
    this.name = data.name;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.date = data.date;
    this.notes = data.notes;
    this.status = data.status;
    this.storeMember = data.storeMember;
    this.services = data.services;
    this.user = data.user;
    this.store = data.store;
  }
}
