import { create } from 'zustand';
import {
  setIsMobileSearchOpenAction,
  setSelectedStoreAction,
} from './search.actions';
import { ISearchStore } from './search.types';

const useSearchStore = create<ISearchStore>()((set, get) => ({
  isMobileSearchOpen: false,
  selectedStore: undefined,

  setIsMobileSearchOpen: setIsMobileSearchOpenAction(set, get),
  setSelectedStore: setSelectedStoreAction(set, get),
}));

export default useSearchStore;
