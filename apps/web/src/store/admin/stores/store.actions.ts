import {
  GalleryService,
  StoreMembersService,
  StoreService,
} from '@/service/store';
import { IStore, IStoreGallery } from '@/types/api/stores.types';
import { IProfessional, TProfessionalRole } from '@/types/api/users.types';
import { TStoreAction } from '@/types/store.types';
import { toast } from 'sonner';
import { INITIAL_PROFESSIONAL, INITIAL_STORE } from './stores.constants';
import { IStoresStore } from './stores.types';

/**
 * Stores Crud Actions
 */

export const addStoreAction: TStoreAction<IStoresStore, Partial<IStore>> =
  (set) => async (store) => {
    set({ fetchingStatus: 'loading' });
    const response = await StoreService.createStore(store);
    set((state) => ({
      stores: [...state.stores, response.data],
      isAddModalOpen: false,
      fetchingStatus: 'success',
    }));
  };

export const fetchStoresAction: TStoreAction<IStoresStore> =
  (set) => async () => {
    set({ fetchingStatus: 'loading' });
    const response = await StoreService.getStoresQuery();
    set({ stores: response, fetchingStatus: 'success' });
  };

export const updateStoreAction: TStoreAction<IStoresStore, Partial<IStore>> =
  (set) => async (store) => {
    set({ fetchingStatus: 'loading' });
    await StoreService.updateStore(store);
    set((state) => ({
      isAddModalOpen: false,
      fetchingStatus: 'success',
      stores: state.stores.map((s) =>
        s.id === store.id
          ? { ...s, ...store, gallery: s.gallery, storeMembers: s.storeMembers }
          : s,
      ),
    }));
  };

export const deleteStoreAction: TStoreAction<IStoresStore, string> =
  (set) => async (id) => {
    try {
      await StoreService.deleteStore(id);
      set((state) => ({
        stores: state.stores.filter((s) => s.id !== id),
      }));
      toast.success('Loja excluída com sucesso');
    } catch (error) {
      toast.error('Erro ao excluir loja');
      throw error;
    }
  };

export const toggleStoreStatusAction: TStoreAction<
  IStoresStore,
  { id: string; isActive: boolean }
> =
  (set) =>
  async ({ id, isActive }) => {
    await StoreService.updateStore({ id, isActive });

    set((state) => ({
      stores: state.stores.map((s) => (s.id === id ? { ...s, isActive } : s)),
    }));
  };

/**
 * Stores general Modal Actions
 */

export const setIsAddModalOpenAction: TStoreAction<
  IStoresStore,
  { isOpen: boolean; store?: IStore }
> =
  (set) =>
  async ({ isOpen, store }) => {
    set({ isAddModalOpen: isOpen, store: store || INITIAL_STORE });
  };

export const resetStoreAction: TStoreAction<IStoresStore> =
  (set) => async () => {
    set({ store: INITIAL_STORE });
  };

export const setViewDetailsStoreAction: TStoreAction<
  IStoresStore,
  { isOpen: boolean; store?: IStore }
> =
  (set) =>
  async ({ isOpen, store }) => {
    set({ isViewDetailsStoreOpen: isOpen, store: store || INITIAL_STORE });
  };

export const setIsAddProfessionalAction: TStoreAction<
  IStoresStore,
  { isOpen: boolean; professional?: IProfessional }
> =
  (set) =>
  async ({ isOpen, professional }) => {
    set({
      isAddProfessional: isOpen,
      professional: professional || INITIAL_PROFESSIONAL,
    });
  };

/**
 * Store Members CRUD Actions
 */

export const createStoreMemberAction: TStoreAction<
  IStoresStore,
  {
    storeId: string;
    professional: { user: { email: string }; role: TProfessionalRole };
  },
  IProfessional
> =
  (set) =>
  async ({ storeId, professional }) => {
    try {
      const response = await StoreMembersService.createStoreMember(
        storeId,
        professional,
      );

      set((state) => ({
        isAddProfessional: false,
        stores: state.stores.map((s) =>
          s.id === storeId
            ? { ...s, storeMembers: [...s.storeMembers, response.data] }
            : s,
        ),
      }));

      toast.success('Profissional adicionado com sucesso');

      return response.data;
    } catch (error) {
      toast.error('Erro ao adicionar profissional');
      throw error;
    }
  };

export const updateStoreMemberAction: TStoreAction<
  IStoresStore,
  {
    storeId: string;
    professional: {
      id: string;
      role: TProfessionalRole;
      user: { email: string };
    };
  },
  IProfessional
> =
  (set) =>
  async ({ storeId, professional }) => {
    try {
      const response = await StoreMembersService.updateStoreMember(
        storeId,
        professional,
      );
      set((state) => ({
        isAddProfessional: false,
        stores: state.stores.map((s) =>
          s.id === storeId
            ? { ...s, storeMembers: [...s.storeMembers, response.data] }
            : s,
        ),
      }));

      toast.success('Profissional atualizado com sucesso');

      return response.data;
    } catch (error) {
      toast.error('Erro ao atualizar profissional');
      throw error;
    }
  };

export const deleteStoreMemberAction: TStoreAction<
  IStoresStore,
  { storeId: string; professionalId: string }
> =
  (set) =>
  async ({ storeId, professionalId }) => {
    try {
      await StoreMembersService.deleteStoreMember(storeId, professionalId);
      set((state) => ({
        stores: state.stores.map((s) =>
          s.id === storeId
            ? {
                ...s,
                storeMembers: s.storeMembers.filter(
                  (m) => m.id !== professionalId,
                ),
              }
            : s,
        ),
      }));
      toast.success('Profissional excluído com sucesso');
    } catch (error) {
      toast.error('Erro ao excluir profissional');
      throw error;
    }
  };

/**
 * Gallery CRUD Actions
 */

export const updateMainImageAction: TStoreAction<
  IStoresStore,
  { storeId: string; imageId: string }
> =
  (set) =>
  async ({ storeId, imageId }) => {
    try {
      await GalleryService.updateMainImage(storeId, imageId);
      set((state) => ({
        stores: state.stores.map((s) =>
          s.id === storeId
            ? {
                ...s,
                gallery: s.gallery.map((g) => ({
                  ...g,
                  isMain: g.id === imageId,
                })),
              }
            : s,
        ),
      }));
      toast.success('Imagem principal atualizada com sucesso');
    } catch (error) {
      toast.error('Erro ao atualizar imagem principal');
      throw error;
    }
  };

export const createImageAction: TStoreAction<
  IStoresStore,
  { storeId: string; image: Omit<IStoreGallery, 'id'> },
  IStoreGallery
> =
  (set) =>
  async ({ storeId, image }): Promise<IStoreGallery> => {
    try {
      const response = await GalleryService.createImage(storeId, image);
      set((state) => ({
        stores: state.stores.map((s) =>
          s.id === storeId
            ? { ...s, gallery: [...s.gallery, response.data] }
            : s,
        ),
      }));
      toast.success('Imagem adicionada com sucesso');

      return response.data;
    } catch (error) {
      toast.error('Erro ao adicionar imagem');
      throw error;
    }
  };

export const deleteImageAction: TStoreAction<
  IStoresStore,
  { storeId: string; imageId: string }
> =
  (set) =>
  async ({ storeId, imageId }) => {
    try {
      await GalleryService.deleteImage(storeId, imageId);
      set((state) => ({
        stores: state.stores.map((s) =>
          s.id === storeId
            ? { ...s, gallery: s.gallery.filter((g) => g.id !== imageId) }
            : s,
        ),
      }));
      toast.success('Imagem excluída com sucesso');
    } catch (error) {
      toast.error('Erro ao excluir imagem');
      throw error;
    }
  };
