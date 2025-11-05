import { create } from 'zustand';
import { setIsMobileSearchOpenAction } from './search.actions';
import { ISearchStore } from './search.types';

const useSearchStore = create<ISearchStore>((set) => {
  return {
    isMobileSearchOpen: false,
    setIsMobileSearchOpen: setIsMobileSearchOpenAction(set),
  };
});

export default useSearchStore;
