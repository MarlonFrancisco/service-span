import { IStore } from '@/types/api/stores.types';

export interface IStoreSearchListItem
  extends Omit<
    IStore,
    | 'ownerId'
    | 'createdAt'
    | 'notificationsHistory'
    | 'notificationsSettings'
    | 'storeMembers'
    | 'schedules'
    | 'categories'
    | 'lunchStartTime'
    | 'lunchEndTime'
    | 'gallery'
  > {
  gallery: string[];
  price: string;
  location: string;
  rating: number;
  reviewCount: number;
  isFavorite?: boolean;
}

export interface ISearchStore {
  isMobileSearchOpen: boolean;
  setIsMobileSearchOpen: (isOpen: boolean) => void;

  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: (isOpen: boolean) => void;

  selectedStore?: IStoreSearchListItem;
  setSelectedStore: (store: IStoreSearchListItem) => void;
}
