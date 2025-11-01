import { useStoreMutations } from '@/hooks/use-mutations/use-store-mutations/use-store-mutations.hook';
import { IStoreGallery } from '@/types/api/stores.types';
import { useFormContext } from 'react-hook-form';
import { TStoreFormSchema } from '../store-form.schema';

export const useGalleryTab = () => {
  const { createImage, deleteImage, updateMainImage } = useStoreMutations();
  const form = useFormContext<TStoreFormSchema>();

  const gallery = form.watch('gallery');

  const onGalleryChange = async (images: IStoreGallery[]) => {
    const promises = images.map((image) =>
      createImage({
        storeId: form.getValues('id')!,
        image: { url: image.url, isMain: image.isMain },
      }),
    );

    await Promise.all(promises).then((images) => {
      form.setValue('gallery', [...gallery, ...images]);
    });
  };

  const onChangeMainImage = async (image: IStoreGallery) => {
    await updateMainImage({
      storeId: form.getValues('id')!,
      imageId: image.id,
    }).then(() => {
      form.setValue(
        'gallery',
        gallery.map((img) => ({
          ...img,
          isMain: img.id === image.id,
        })),
      );
    });
  };

  const onDeleteImage = (imageId: string) => {
    deleteImage({ storeId: form.getValues('id')!, imageId }).then(() => {
      form.setValue(
        'gallery',
        gallery.filter((img) => img.id !== imageId),
      );
    });
  };

  return {
    gallery,
    onGalleryChange,
    onChangeMainImage,
    onDeleteImage,
  };
};
