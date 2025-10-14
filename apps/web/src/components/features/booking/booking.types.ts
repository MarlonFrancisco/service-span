export type TBookingStep =
  | 'services'
  | 'professional'
  | 'datetime'
  | 'checkout';

export type TSelectedService = {
  id: string;
  name: string;
  price: number;
  duration: number;
  quantity: number;
  category: string;
};

export type TProfessional = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  specialties: string[];
  availableServices: string[];
};

export type TBookingFlowConfig = {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessImages?: string[];
  businessImageUrl?: string;
  businessRating?: number;
  businessReviewCount?: number;
  businessCategory?: string;
  businessDescription?: string;
};
