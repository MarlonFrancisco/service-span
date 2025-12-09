import { GalleryService } from '@/service/store/gallery.service';
import { IStore, IStoreGallery } from '@/types/api/stores.types';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useGalleryMutations = () => {
  const queryClient = useQueryClient();

  const updateMainImageMutation = useMutation({
    mutationFn: (data: { storeId: string; imageId: string }) =>
      GalleryService.update(data.storeId, data.imageId),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) =>
        old.map((s) =>
          s.id === data.store?.id
            ? {
                ...s,
                gallery: s.gallery.map((g) =>
                  g.id === data.id
                    ? { ...g, isMain: true }
                    : { ...g, isMain: false },
                ),
              }
            : s,
        ),
      );
      toast.success('Imagem principal atualizada com sucesso');
    },
    onError: () => {
      toast.error('Erro ao atualizar imagem principal');
    },
  });

  const createImageMutation = useMutation({
    mutationFn: (data: { storeId: string; image: Omit<IStoreGallery, 'id'> }) =>
      GalleryService.create(data.storeId, data.image),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) =>
        old.map((s) =>
          s.id === data.store?.id
            ? {
                ...s,
                gallery: [...s.gallery, data],
              }
            : s,
        ),
      );
      toast.success('Imagem adicionada com sucesso');
    },
    onError: () => {
      toast.error('Erro ao adicionar imagem');
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: (data: { storeId: string; imageId: string }) =>
      GalleryService.delete(data.storeId, data.imageId),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) =>
        old.map((s) =>
          s.id === data.store.id
            ? {
                ...s,
                gallery: s.gallery.filter((g) => g.id !== data.id),
              }
            : s,
        ),
      );
      toast.success('Imagem excluída com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir imagem');
    },
  });

  return {
    updateMainImageMutation,
    createImageMutation,
    deleteImageMutation,
  };
};
