import { useStoresAdmin } from '@/store';
import { IStoreGallery } from '@/types/api/stores.types';
import { useFormContext } from 'react-hook-form';
import { TStoreFormSchema } from '../store-form.schema';

export const useGalleryTab = () => {
  const { createImage, deleteImage, updateMainImage } = useStoresAdmin();
  const form = useFormContext<TStoreFormSchema>();

  const gallery = form.watch('gallery');

  const onGalleryChange = async (images: IStoreGallery[]) => {
    const promises = images.map((image) =>
      createImage({
        storeId: form.getValues('id')!,
        image: { url: image.url, isMain: image.isMain },
      }),
    );

    try {
      const images = await Promise.all(promises);

      form.setValue('gallery', [...gallery, ...images]);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const onChangeMainImage = async (image: IStoreGallery) => {
    try {
      await updateMainImage({
        storeId: form.getValues('id')!,
        imageId: image.id,
      });

      form.setValue(
        'gallery',
        gallery.map((img) => ({
          ...img,
          isMain: img.id === image.id,
        })),
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const onDeleteImage = async (imageId: string) => {
    try {
      await deleteImage({ storeId: form.getValues('id')!, imageId });
      form.setValue(
        'gallery',
        gallery.filter((img) => img.id !== imageId),
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return {
    gallery,
    onGalleryChange,
    onChangeMainImage,
    onDeleteImage,
  };
};
