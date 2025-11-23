import { IReview } from '../reviews.types';
import { IAppointment } from './schedule.types';
import { IService } from './service.types';
import { IProfessional } from './users.types';

export type TNotificationStatus = 'sent' | 'delivered' | 'failed' | 'pending';
export type TNotificationType =
  | 'booking'
  | 'cancellation'
  | 'reminder'
  | 'system'
  | 'marketing';

export interface INotificationsHistory {
  id: string;
  type: TNotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  recipient?: string;
  status?: TNotificationStatus;
}

export interface INotificationsSettings {
  id: string;
  emailReminderEnabled: boolean;
  emailReminderAdvanceHours: string;
  emailReminderCustomMessage: string;
  smsReminderEnabled: boolean;
  smsReminderAdvanceHours: string;
  smsReminderCustomMessage: string;
  whatsappReminderEnabled: boolean;
  whatsappReminderAdvanceHours: string;
  whatsappReminderCustomMessage: string;
}

export interface IStoreGallery {
  id: string;
  url: string;
  isMain: boolean;
  store?: IStore;
}

export interface TWorkingHours {
  openTime: string;
  closeTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
}

export interface TWorkingDays {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface IStore extends TWorkingHours {
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
  openTime: string;
  closeTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  gallery: IStoreGallery[];
  storeMembers: IProfessional[];
  services: IService[];
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  schedules: IAppointment[];
  businessDays: TWorkingDays;
  notificationsHistory: INotificationsHistory[];
  notificationsSettings: INotificationsSettings;
  reviews: IReview[];
}
