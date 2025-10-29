import type { ICategory, IService } from '@/types/api/service.types';

export const INITIAL_SERVICE: IService = {
  id: '',
  name: '',
  description: '',
  duration: 0,
  price: 0,
  isActive: true,
};

export const INITIAL_CATEGORY: ICategory = {
  id: '',
  name: '',
  description: '',
  color: 'blue',
  services: [],
};
