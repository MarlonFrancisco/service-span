import type { TStoreImage, TStoreWithImages } from '../../stores-module.types';

export type TEditStoreModalConfig = {
  store: TStoreWithImages | null;
  images: TStoreImage[];
  onClose: () => void;
  onImagesChange: (images: TStoreImage[]) => void;
};
