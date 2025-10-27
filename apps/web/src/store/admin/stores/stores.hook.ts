import {
  GalleryService,
  StoreMembersService,
  StoreService,
} from '@/service/store';
import { IProfessional } from '@/types/api';
import { IStore, IStoreGallery } from '@/types/api/stores.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { useStoresAdminStore } from './stores.store';

export const useStoresAdmin = () => {
  const store = useStoresAdminStore();

  const queryClient = useQueryClient();

  const isEditingStore = !!store.store.id;

  const { data: stores = [], isLoading } = useQuery({
    queryKey: ['stores'],
    queryFn: () => StoreService.getAll(),
  });

  const totalStores = useMemo(() => stores.length, [stores]);
  const activeStores = useMemo(
    () => stores.filter((s) => s.isActive).length,
    [stores],
  );

  const { mutate: toggleStoreStatus } = useMutation({
    mutationFn: (data: IStore) => StoreService.update(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['stores'], (old: IStore[]) =>
        old.map((s) => (s.id === data.id ? { ...s, ...data } : s)),
      );
      toast.success('Status da loja atualizado com sucesso');
    },
    onError: () => {
      toast.error('Erro ao atualizar status da loja');
    },
  });

  const { mutate: updateStore } = useMutation({
    mutationFn: (data: Partial<IStore>) => StoreService.update(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['stores'], (old: IStore[]) =>
        old.map((s) => (s.id === data.id ? { ...s, ...data } : s)),
      );
      toast.success('Loja atualizada com sucesso');
      store.setIsAddModalOpen({ isOpen: false });
    },
    onError: () => {
      toast.error('Erro ao atualizar loja');
    },
  });

  const { mutate: deleteStore } = useMutation({
    mutationFn: (id: string) => StoreService.delete(id),
    onSuccess: (data) => {
      queryClient.setQueryData(['stores'], (old: IStore[]) =>
        old.filter((s) => s.id !== data.id),
      );
      toast.success('Loja excluída com sucesso');
    },
  });

  const { mutate: addStore } = useMutation({
    mutationFn: (data: Partial<IStore>) => StoreService.create(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['stores'], (old: IStore[]) => [...old, data]);
      toast.success('Loja adicionada com sucesso');
      store.setIsAddModalOpen({ isOpen: false });
    },
  });

  const { mutateAsync: updateMainImage } = useMutation({
    mutationFn: (data: { storeId: string; imageId: string }) =>
      GalleryService.update(data.storeId, data.imageId),
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(['stores'], (old: IStore[]) =>
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
  });

  const { mutateAsync: createImage } = useMutation({
    mutationFn: (data: { storeId: string; image: Omit<IStoreGallery, 'id'> }) =>
      GalleryService.create(data.storeId, data.image),
    onSuccess: (data) => {
      queryClient.setQueryData(['stores'], (old: IStore[]) =>
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
  });

  const { mutateAsync: deleteImage } = useMutation({
    mutationFn: (data: { storeId: string; imageId: string }) =>
      GalleryService.delete(data.storeId, data.imageId),
    onSuccess: (data) => {
      queryClient.setQueryData(['stores'], (old: IStore[]) =>
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
  });

  const { mutateAsync: updateStoreMember } = useMutation({
    mutationFn: (data: {
      storeId: string;
      professional: Partial<IProfessional>;
    }) => StoreMembersService.update(data.storeId, data.professional),
    onSuccess: (data) => {
      queryClient.setQueryData(['stores'], (old: IStore[]) =>
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
      toast.success('Membro da loja atualizado com sucesso');
      store.setIsAddProfessional({ isOpen: false });
    },
  });

  const { mutateAsync: deleteStoreMember } = useMutation({
    mutationFn: (data: { storeId: string; professionalId: string }) =>
      StoreMembersService.delete(data.storeId, data.professionalId),
    onSuccess: (data) => {
      queryClient.setQueryData(['stores'], (old: IStore[]) =>
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

  const { mutateAsync: createStoreMember } = useMutation({
    mutationFn: (data: {
      storeId: string;
      professional: Partial<IProfessional>;
    }) => StoreMembersService.create(data.storeId, data.professional),
    onSuccess: (data) => {
      queryClient.setQueryData(['stores'], (old: IStore[]) =>
        old.map((s) =>
          s.id === data.store?.id
            ? { ...s, storeMembers: [...s.storeMembers, data] }
            : s,
        ),
      );
      store.setIsAddProfessional({ isOpen: false });
      toast.success('Membro da loja adicionado com sucesso');
    },
    onError: () => {
      toast.error('Erro ao adicionar membro da loja');
    },
  });

  return {
    ...store,
    stores,
    totalStores,
    activeStores,
    isEditingStore,
    isLoading,
    toggleStoreStatus,
    updateStore,
    deleteStore,
    addStore,
    updateMainImage,
    createImage,
    deleteImage,
    updateStoreMember,
    deleteStoreMember,
    createStoreMember,
  };
};
