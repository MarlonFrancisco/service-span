import { IService } from './service.types';
import { IProfessional, IUser } from './users.types';

export type TAppointmentStatus =
  | 'scheduled'
  | 'completed'
  | 'cancelled'
  | 'no-show';

export interface IAppointment {
  id: string;
  startTime: string;
  endTime: string;
  date: string;
  status: TAppointmentStatus;
  price: number;
  notes?: string;
  user: IUser;
  service: IService;
  storeMember: IProfessional;
}
