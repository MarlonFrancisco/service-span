import type { StoreMember } from '../../store-member.entity';

export class BlockedTimeDto {
  id: string;
  date: Date;
  time: string;
  isRecurring?: boolean;
  dayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  storeMember: Partial<StoreMember>;

  constructor(data: Partial<BlockedTimeDto>) {
    this.id = data.id;
    this.date = data.date;
    this.time = data.time;
    this.isRecurring = data.isRecurring ?? false;
    this.dayOfWeek = data.dayOfWeek;
    this.storeMember = data.storeMember;
  }
}
