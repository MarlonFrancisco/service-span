import { TStoreSet } from '@/types/store.types';
import type {
  ICategory,
  ICategoryFormData,
  IService,
  IServiceFormData,
  IServicesStore,
} from './services.types';

export const setSearchQueryAction =
  (set: TStoreSet<IServicesStore>) => (query: string) => {
    set({ searchQuery: query });
  };

export const setFilterCategoryAction =
  (set: TStoreSet<IServicesStore>) => (category: string) => {
    set({ filterCategory: category });
  };

export const setIsAddModalOpenAction =
  (set: TStoreSet<IServicesStore>) => (isOpen: boolean) => {
    set({ isAddModalOpen: isOpen });
  };

export const setIsCategoryModalOpenAction =
  (set: TStoreSet<IServicesStore>) => (isOpen: boolean) => {
    set({ isCategoryModalOpen: isOpen });
  };

export const setEditingServiceAction =
  (set: TStoreSet<IServicesStore>) => (service: IService | null) => {
    set({ editingService: service });
  };

export const setEditingCategoryAction =
  (set: TStoreSet<IServicesStore>) => (category: ICategory | null) => {
    set({ editingCategory: category });
  };

export const setFormDataAction =
  (set: TStoreSet<IServicesStore>) => (data: Partial<IServiceFormData>) => {
    set((state) => ({
      formData: { ...state.formData, ...data },
    }));
  };

export const setCategoryFormDataAction =
  (set: TStoreSet<IServicesStore>) => (data: Partial<ICategoryFormData>) => {
    set((state) => ({
      categoryFormData: { ...state.categoryFormData, ...data },
    }));
  };

export const resetFormAction =
  (set: TStoreSet<IServicesStore>, initialFormData: IServiceFormData) => () => {
    set({ formData: initialFormData });
  };

export const resetCategoryFormAction =
  (
    set: TStoreSet<IServicesStore>,
    initialCategoryFormData: ICategoryFormData,
  ) =>
  () => {
    set({ categoryFormData: initialCategoryFormData });
  };

// Service CRUD Actions
export const addServiceAction =
  (set: TStoreSet<IServicesStore>) => (service: Omit<IService, 'id'>) => {
    set((state) => ({
      services: [...state.services, { ...service, id: String(Date.now()) }],
    }));
  };

export const updateServiceAction =
  (set: TStoreSet<IServicesStore>) =>
  (id: string, service: Partial<IService>) => {
    set((state) => ({
      services: state.services.map((s: IService) =>
        s.id === id ? { ...s, ...service } : s,
      ),
    }));
  };

export const deleteServiceAction =
  (set: TStoreSet<IServicesStore>) => (id: string) => {
    set((state) => ({
      services: state.services.filter((s: IService) => s.id !== id),
    }));
  };

export const toggleServiceStatusAction =
  (set: TStoreSet<IServicesStore>) => (id: string) => {
    set((state) => ({
      services: state.services.map((s: IService) =>
        s.id === id ? { ...s, isActive: !s.isActive } : s,
      ),
    }));
  };

// Category CRUD Actions
export const addCategoryAction =
  (set: TStoreSet<IServicesStore>) => (category: Omit<ICategory, 'id'>) => {
    set((state) => ({
      categories: [
        ...state.categories,
        { ...category, id: String(Date.now()) },
      ],
    }));
  };

export const updateCategoryAction =
  (set: TStoreSet<IServicesStore>) =>
  (id: string, category: Partial<ICategory>) => {
    set((state) => {
      const oldCategory = state.categories.find((c: ICategory) => c.id === id);
      const newCategories = state.categories.map((c: ICategory) =>
        c.id === id ? { ...c, ...category } : c,
      );

      // Se o nome da categoria mudou, atualizar serviços
      const newServices =
        oldCategory && category.name && oldCategory.name !== category.name
          ? state.services.map((s: IService) =>
              s.category === oldCategory.name
                ? { ...s, category: category.name || 'Não categorizado' }
                : s,
            )
          : state.services;

      return {
        categories: newCategories,
        services: newServices,
      };
    });
  };

export const deleteCategoryAction =
  (set: TStoreSet<IServicesStore>) => (id: string) => {
    set((state) => ({
      categories: state.categories.filter((c: ICategory) => c.id !== id),
    }));
  };
