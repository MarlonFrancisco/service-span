export interface ISearchFilters {
  categories?: string[];
  priceRange?: [number, number];
  rating?: number;
  availability?: string;
  query?: string;
  location?: string;
  date?: Date;
}
