import { FetchingStatus } from '@/types/api';
import { ISearchFilters } from '@/types/layout/search.types';

export interface ISearchResult {
  name: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  rating: number;
  reviews: number;
  isNew: boolean;
}

export interface ISearchStore {
  searchResults: ISearchResult[];
  fetchingStatus: FetchingStatus;
  showFilters: boolean;
  isMobileSearchOpen: boolean;
  searchFilters: ISearchFilters;
  setSearchFilters: (filters: ISearchFilters) => void;
  setIsMobileSearchOpen: (isOpen: boolean) => void;
  fetchSearchResultAction: () => void;
}
