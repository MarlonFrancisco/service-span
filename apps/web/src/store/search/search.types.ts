import { FetchingStatus } from '@/types/api';

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
  showSearchBar: boolean;
  hasActiveFilters: boolean;
  fetchSearchResultAction: () => void;
}
