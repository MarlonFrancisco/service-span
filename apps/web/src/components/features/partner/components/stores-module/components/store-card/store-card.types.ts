import type { TStoreWithImages } from '../../stores-module.types';

export type TStoreCardConfig = {
  store: TStoreWithImages;
  onEdit: (store: TStoreWithImages) => void;
  onToggleStatus: (storeId: string) => void;
};
