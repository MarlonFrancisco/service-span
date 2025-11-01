import { IAppointment } from './schedule.types';
import { IService } from './service.types';
import { IProfessional } from './users.types';

export interface IStoreGallery {
  id: string;
  url: string;
  isMain: boolean;
  store?: IStore;
}

export interface IStore {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  telephone: string;
  isActive: boolean;
  amenities: string[];
  gallery: IStoreGallery[];
  storeMembers: IProfessional[];
  services: IService[];
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  schedules: IAppointment[];
}
