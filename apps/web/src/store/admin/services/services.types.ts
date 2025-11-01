import { ICategory, IService } from '@/types/api/service.types';

export interface IServicesStore {
  category: ICategory;
  service: IService;
  services: IService[];
  filteredServices: IService[];
  categories: ICategory[];
  isCategoryModalOpen: boolean;
  isServiceModalOpen: boolean;
  searchQuery: string;
  filterCategory: string;

  setServices: (services: IService[]) => void;
  setCategories: (categories: ICategory[]) => void;
  setFilteredServices: (filteredServices: IService[]) => void;
  setSearchQuery: (searchQuery: string) => Promise<void>;
  setFilterCategory: (filterCategory: string) => Promise<void>;
  setCategoryModalParams: (params: {
    isOpen: boolean;
    category?: ICategory;
  }) => void;
  setServiceModalParams: (params: {
    isOpen: boolean;
    service?: IService;
  }) => void;
}
