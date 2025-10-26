import { IStoreGallery } from '@/types/api/stores.types';

export const orderGalleryByMainImage = (gallery: IStoreGallery[]) => {
  return gallery.sort((a, b) => (a.isMain ? -1 : 1));
};
