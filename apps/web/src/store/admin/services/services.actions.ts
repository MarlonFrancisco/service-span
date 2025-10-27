import { CategoryService } from '@/service/category';
import { TStoreAction } from '@/types/store.types';
import { IServicesStore } from './services.types';

export const getCategoriesAction: TStoreAction<IServicesStore> =
  (set) => async () => {
    const categories = await CategoryService.getCategoriesQuery('');
    set({ categories });
  };
