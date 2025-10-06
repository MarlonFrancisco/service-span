// StoreSelector Types - ANCR-FA Architecture
import type { TStore } from '../partner.types';

export type TStoreSelectorConfig = {
  stores: TStore[];
  activeStore: TStore;
  onStoreChange: (store: TStore) => void;
};

export type TStoreSelectorHookReturn = {
  isOpen: boolean;
  handleToggle: () => void;
  handleStoreSelect: (store: TStore) => void;
};
