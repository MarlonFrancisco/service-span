export interface Service {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  location: string;
  price: string;
  images: string[];
  description: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  openTime: string;
  closeTime: string;
  businessDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  isFavorite?: boolean;
  services?: Array<{
    id: string;
    name: string;
    description: string;
    price: number | string;
  }>;
  reviews?: Array<{ id: string; rating: number; comment: string }>;
}

export type UserType = 'customer' | 'provider' | null;

export interface SearchResultsProps {
  onBackToHome: () => void;
  onStartBooking: (service: Service) => void;
  onGoToDashboard?: () => void;
  onGoToProfile?: () => void;
  onNavigate: (page: 'terms' | 'privacy' | 'help' | 'contact') => void;
}
