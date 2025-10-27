import { create } from 'zustand';
import { MOCK_CATEGORIES } from './services.constants';
import type { IServicesStore } from './services.types';

export const useServicesStore = create<IServicesStore>((set) => ({
  categories: MOCK_CATEGORIES,
}));
