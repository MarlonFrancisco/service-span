import { IService } from './service.types';
import { IStore } from './stores.types';

export type TProfessionalRole = 'owner' | 'manager' | 'professional';

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  telephone: string;
  isSubscribed: boolean;
  avatar?: string;
}

export interface IProfessional {
  id: string;
  role: TProfessionalRole;
  isActive: boolean;
  user: IUser;
  createdAt: Date;
  store?: IStore;
  services?: IService[];
}
