import type { TStoreImage } from '../../stores-module.types';

export type TAddStoreModalConfig = {
  isOpen: boolean;
  images: TStoreImage[];
  onClose: () => void;
  onImagesChange: (images: TStoreImage[]) => void;
};
