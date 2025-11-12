import { create } from 'zustand';
import {
  setIsMobileSearchOpenAction,
  setMobileDrawerOpenAction,
  setSelectedStoreAction,
} from './search.actions';
import { ISearchStore } from './search.types';

const useSearchStore = create<ISearchStore>()((set, get) => ({
  isMobileSearchOpen: false,
  mobileDrawerOpen: false,
  selectedStore: undefined,

  setIsMobileSearchOpen: setIsMobileSearchOpenAction(set, get),
  setMobileDrawerOpen: setMobileDrawerOpenAction(set, get),
  setSelectedStore: setSelectedStoreAction(set, get),
}));

export default useSearchStore;
