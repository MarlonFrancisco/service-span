import { ISearchFilters } from '@/types/layout/search.types';

export const buildSearchUrl = (searchFilters: ISearchFilters) => {
  const params = new URLSearchParams();

  if (searchFilters.location) {
    params.append('location', searchFilters.location);
  }

  if (searchFilters.query) {
    params.append('query', searchFilters.query);
  }

  if (searchFilters.date) {
    params.append('date', searchFilters.date.toISOString());
  }

  return `/booking?${params.toString()}`;
};

export const isSearchPage = (pathname: string) => {
  return pathname === '/booking';
};
