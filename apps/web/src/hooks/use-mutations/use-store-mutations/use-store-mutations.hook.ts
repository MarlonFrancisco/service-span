import {
  GalleryService,
  StoreMembersService,
  StoreService,
} from '@/service/store';
import { IProfessional } from '@/types/api';
import { IStore, IStoreGallery } from '@/types/api/stores.types';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useStoreMutations = () => {
  const queryClient = useQueryClient();

  const { mutate: updateStore, isPending: isUpdatingStore } = useMutation({
    mutationFn: (data: Partial<IStore>) => StoreService.update(data),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) =>
        old.map((s) => (s.id === data.id ? { ...s, ...data } : s)),
      );
      toast.success('Loja atualizada com sucesso');
    },
    onError: () => {
      toast.error('Erro ao atualizar loja');
    },
  });

  const { mutate: deleteStore, isPending: isDeletingStore } = useMutation({
    mutationFn: (id: string) => StoreService.delete(id),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) =>
        old.filter((s) => s.id !== data.id),
      );
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.store(data.id),
        () => undefined,
      );
      toast.success('Loja excluída com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir loja');
    },
  });

  const { mutate: addStore, isPending: isAddingStore } = useMutation({
    mutationFn: (data: Partial<IStore>) => StoreService.create(data),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) => [
        ...old,
        data,
      ]);
      toast.success('Loja adicionada com sucesso');
    },
  });

  const { mutate: updateMainImage, isPending: isUpdatingMainImage } =
    useMutation({
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

  const { mutate: createImage, isPending: isCreatingImage } = useMutation({
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

  const { mutate: deleteImage, isPending: isDeletingImage } = useMutation({
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

  const { mutate: updateStoreMember, isPending: isUpdatingStoreMember } =
    useMutation({
      mutationFn: (data: {
        storeId: string;
        professional: Partial<IProfessional>;
      }) => StoreMembersService.update(data.storeId, data.professional),
      onSuccess: (data) => {
        queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) =>
          old.map((s) =>
            s.id === data.store?.id
              ? {
                  ...s,
                  storeMembers: s.storeMembers.map((m) =>
                    m.id === data.id ? { ...m, ...data } : m,
                  ),
                }
              : s,
          ),
        );

        queryClient.setQueryData(
          CACHE_QUERY_KEYS.store(data.store!.id),
          (old: IStore) => ({
            ...old,
            storeMembers: [...old.storeMembers, data],
          }),
        );
        toast.success('Membro da loja atualizado com sucesso');
      },
    });

  const { mutate: deleteStoreMember, isPending: isDeletingStoreMember } =
    useMutation({
      mutationFn: (data: { storeId: string; professionalId: string }) =>
        StoreMembersService.delete(data.storeId, data.professionalId),
      onSuccess: (data) => {
        queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) =>
          old.map((s) =>
            s.id === data.store?.id
              ? {
                  ...s,
                  storeMembers: s.storeMembers.filter((m) => m.id !== data.id),
                }
              : s,
          ),
        );
        toast.success('Membro da loja excluído com sucesso');
      },
      onError: () => {
        toast.error('Erro ao excluir membro da loja');
      },
    });

  const { mutate: createStoreMember, isPending: isCreatingStoreMember } =
    useMutation({
      mutationFn: (data: {
        storeId: string;
        professional: Partial<IProfessional>;
      }) => StoreMembersService.create(data.storeId, data.professional),
      onSuccess: (data) => {
        queryClient.setQueryData(CACHE_QUERY_KEYS.stores(), (old: IStore[]) =>
          old.map((s) =>
            s.id === data.store?.id
              ? { ...s, storeMembers: [...s.storeMembers, data] }
              : s,
          ),
        );
        toast.success('Membro da loja adicionado com sucesso');
      },
      onError: () => {
        toast.error('Erro ao adicionar membro da loja');
      },
    });

  return {
    updateStore,
    isUpdatingStore,
    deleteStore,
    isDeletingStore,
    addStore,
    isAddingStore,
    updateMainImage,
    isUpdatingMainImage,
    createImage,
    isCreatingImage,
    deleteImage,
    isDeletingImage,
    updateStoreMember,
    isUpdatingStoreMember,
    deleteStoreMember,
    isDeletingStoreMember,
    createStoreMember,
    isCreatingStoreMember,
  };
};
