import type {
  ICategory,
  ICategoryFormData,
  IService,
  IServiceFormData,
} from './services.types';

export const setSearchQueryAction = (set: any) => (query: string) => {
  set({ searchQuery: query });
};

export const setFilterCategoryAction = (set: any) => (category: string) => {
  set({ filterCategory: category });
};

export const setIsAddModalOpenAction = (set: any) => (isOpen: boolean) => {
  set({ isAddModalOpen: isOpen });
};

export const setIsCategoryModalOpenAction = (set: any) => (isOpen: boolean) => {
  set({ isCategoryModalOpen: isOpen });
};

export const setEditingServiceAction =
  (set: any) => (service: IService | null) => {
    set({ editingService: service });
  };

export const setEditingCategoryAction =
  (set: any) => (category: ICategory | null) => {
    set({ editingCategory: category });
  };

export const setFormDataAction =
  (set: any) => (data: Partial<IServiceFormData>) => {
    set((state: any) => ({
      formData: { ...state.formData, ...data },
    }));
  };

export const setCategoryFormDataAction =
  (set: any) => (data: Partial<ICategoryFormData>) => {
    set((state: any) => ({
      categoryFormData: { ...state.categoryFormData, ...data },
    }));
  };

export const resetFormAction =
  (set: any, initialFormData: IServiceFormData) => () => {
    set({ formData: initialFormData });
  };

export const resetCategoryFormAction =
  (set: any, initialCategoryFormData: ICategoryFormData) => () => {
    set({ categoryFormData: initialCategoryFormData });
  };

// Service CRUD Actions
export const addServiceAction =
  (set: any) => (service: Omit<IService, 'id'>) => {
    set((state: any) => ({
      services: [...state.services, { ...service, id: String(Date.now()) }],
    }));
  };

export const updateServiceAction =
  (set: any) => (id: string, service: Partial<IService>) => {
    set((state: any) => ({
      services: state.services.map((s: IService) =>
        s.id === id ? { ...s, ...service } : s,
      ),
    }));
  };

export const deleteServiceAction = (set: any) => (id: string) => {
  set((state: any) => ({
    services: state.services.filter((s: IService) => s.id !== id),
  }));
};

export const toggleServiceStatusAction = (set: any) => (id: string) => {
  set((state: any) => ({
    services: state.services.map((s: IService) =>
      s.id === id ? { ...s, isActive: !s.isActive } : s,
    ),
  }));
};

// Category CRUD Actions
export const addCategoryAction =
  (set: any) => (category: Omit<ICategory, 'id'>) => {
    set((state: any) => ({
      categories: [
        ...state.categories,
        { ...category, id: String(Date.now()) },
      ],
    }));
  };

export const updateCategoryAction =
  (set: any) => (id: string, category: Partial<ICategory>) => {
    set((state: any) => {
      const oldCategory = state.categories.find((c: ICategory) => c.id === id);
      const newCategories = state.categories.map((c: ICategory) =>
        c.id === id ? { ...c, ...category } : c,
      );

      // Se o nome da categoria mudou, atualizar serviços
      const newServices =
        oldCategory && category.name && oldCategory.name !== category.name
          ? state.services.map((s: IService) =>
              s.category === oldCategory.name
                ? { ...s, category: category.name }
                : s,
            )
          : state.services;

      return {
        categories: newCategories,
        services: newServices,
      };
    });
  };

export const deleteCategoryAction = (set: any) => (id: string) => {
  set((state: any) => ({
    categories: state.categories.filter((c: ICategory) => c.id !== id),
  }));
};
