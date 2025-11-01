import type { User } from '../../../../users/user.entity';
import type { Service } from '../../category/service/service.entity';
import type { StoreMember } from '../../store-member/store-member.entity';
import type { Store } from '../../store.entity';

export class ScheduleDto {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  date: Date;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  storeMember: Partial<StoreMember>;
  service: Partial<Service>;
  user: Partial<User>;
  store: Partial<Store>;

  constructor(data: Partial<ScheduleDto>) {
    this.id = data.id;
    this.name = data.name;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.date = data.date;
    this.notes = data.notes;
    this.status = data.status;
    this.storeMember = data.storeMember;
    this.service = data.service;
    this.user = data.user;
    this.store = data.store;
  }
}
