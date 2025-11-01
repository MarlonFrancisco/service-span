import { IProfessional } from './users.types';

export interface IBlockedTime {
  id: string;
  date: string;
  time: string;
  isRecurring?: boolean;
  dayOfWeek: number;
  storeMember: IProfessional;
}
