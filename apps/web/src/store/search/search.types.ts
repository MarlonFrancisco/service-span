export interface IStoreSearchListItem {
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

export interface ISearchStore {
  isMobileSearchOpen: boolean;
  setIsMobileSearchOpen: (isOpen: boolean) => void;

  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: (isOpen: boolean) => void;

  selectedStore?: IStoreSearchListItem;
  setSelectedStore: (store: IStoreSearchListItem) => void;
}
