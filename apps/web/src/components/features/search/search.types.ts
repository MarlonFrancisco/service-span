export interface Service {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  price: string;
  imageUrl: string;
  images?: string[];
  description: string;
  phone: string;
  address: string;
  isFavorite?: boolean;
  nextSlot?: string;
}

export type UserType = 'customer' | 'provider' | null;

export interface SearchResultsProps {
  onBackToHome: () => void;
  onStartBooking: (service: Service) => void;
  onGoToDashboard?: () => void;
  onGoToProfile?: () => void;
  onNavigate: (page: 'terms' | 'privacy' | 'help' | 'contact') => void;
}
