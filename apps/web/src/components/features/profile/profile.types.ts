export type TProfileTab = 'bookings' | 'favorites' | 'settings';

export type TBookingStatus = 'confirmed' | 'completed' | 'cancelled';

export type TUpcomingBooking = {
  id: string;
  businessName: string;
  service: string;
  professional: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  address: string;
  phone: string;
  image: string;
  category: string;
  status: TBookingStatus;
};

export type TPastBooking = {
  id: string;
  businessName: string;
  service: string;
  date: string;
  price: number;
  rating?: number;
  review?: string;
  image: string;
};

export type TFavorite = {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  location: string;
  price: string;
  description: string;
  distance: string;
};

export type TUseProfileConfig = {
  onPhotoUploadSuccess?: () => void;
  onPhotoUploadError?: (error: Error) => void;
  onCancelBookingSuccess?: (bookingId: string) => void;
  onRemoveFavoriteSuccess?: (favoriteId: string) => void;
};

export type TUseProfileReturn = {
  // State
  activeTab: TProfileTab;
  selectedBooking: string | null;
  bookingToCancel: string | null;
  isUploadingPhoto: boolean;
  selectedFavorite: string | null;
  favorites: TFavorite[];
  upcomingBookings: TUpcomingBooking[];
  pastBookings: TPastBooking[];

  // User data
  user: any; // TODO: Tipar corretamente quando integrar com API real
  isPendingUser: boolean;

  // Computed values
  selectedBookingData: TUpcomingBooking | undefined;
  bookingToCancelData: TUpcomingBooking | undefined;
  selectedFavoriteData: TFavorite | undefined;

  // Handlers
  setActiveTab: (tab: TProfileTab) => void;
  setSelectedBooking: (id: string | null) => void;
  setBookingToCancel: (id: string | null) => void;
  setSelectedFavorite: (id: string | null) => void;
  handlePhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancelBooking: (bookingId: string) => void;
  handleRemoveFavorite: (favoriteId: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
};

export type TProfileConfig = {
  className?: string;
};
