import type { TStore } from '../../stores-module.types';

export type TStoreDetailsDrawerConfig = {
  store: TStore | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (store: TStore) => void;
  onDelete: (storeId: string) => void;
};
