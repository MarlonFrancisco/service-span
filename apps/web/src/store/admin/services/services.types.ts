import { ICategory, IService } from '@/types/api/service.types';

export interface IServicesStore {
  category: ICategory;
  service: IService;
  isCategoryModalOpen: boolean;
  isServiceModalOpen: boolean;
  searchQuery: string;
  filterCategory: string;

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
