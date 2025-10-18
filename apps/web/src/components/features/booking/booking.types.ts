export type TBookingStep =
  | 'services'
  | 'professional'
  | 'datetime'
  | 'checkout';

export interface IService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

export interface ISelectedService extends IService {
  quantity: number;
}

export interface IProfessional {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  specialties: string[];
  availableServices: string[];
}

export interface IBookingFlowConfig {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessImages: string[];
  businessRating?: number;
  businessReviewCount?: number;
  businessCategory?: string;
  businessDescription?: string;
}

export interface ITimeSlot {
  time: string;
  available: boolean;
  price?: number;
}

export interface ICheckoutStep {
  id: TBookingStep;
  title: string;
  description: string;
  number: number;
}
