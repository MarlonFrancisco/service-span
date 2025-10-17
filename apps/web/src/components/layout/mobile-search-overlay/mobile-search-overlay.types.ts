export type TSearchField = 'location' | 'query' | 'date' | null;

export type TPopularQuery = {
  name: string;
  icon: string;
};

export type TMobileSearchOverlayConfig = Record<string, never>;

export type TUseMobileSearchOverlayConfig = Record<string, never>;

export type TUseMobileSearchOverlayReturn = {
  // States
  activeField: TSearchField;
  showLocationSuggestions: boolean;
  showQuerySuggestions: boolean;
  activeFiltersCount: number;

  // Suggestions data
  locationSuggestions: string[];
  querySuggestions: string[];
  popularQueries: TPopularQuery[];
  filteredLocationSuggestions: string[];
  filteredQuerySuggestions: string[];

  // Actions
  setActiveField: (field: TSearchField) => void;
  clearField: (field: 'location' | 'query' | 'date') => void;
  handleLocationSelect: (location: string) => void;
  handleQuerySelect: (query: string) => void;
  handleDateSelect: (date: Date | undefined) => void;
  handleSearch: () => void;
  clearAllFilters: () => void;
};

export type TSearchFieldCardConfig = {
  field: 'location' | 'query' | 'date';
  isActive: boolean;
  hasValue: boolean;
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onClick: () => void;
  onClear: () => void;
  onChange?: (value: string) => void;
  renderContent?: () => React.ReactNode;
};

export type TFilterChipsConfig = {
  location?: string;
  query?: string;
  date?: Date;
  onClearLocation: () => void;
  onClearQuery: () => void;
  onClearDate: () => void;
};

export type TProgressBarConfig = {
  current: number;
  total: number;
};
