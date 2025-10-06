export type TStore = {
  id: string;
  name: string;
  address: string;
};

export type TService = {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  isActive: boolean;
};

export type TServiceFormData = {
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
};

export type TUseServicesModuleReturn = {
  // State
  services: TService[];
  categories: string[];
  isAddModalOpen: boolean;
  editingService: TService | null;
  isCategoryModalOpen: boolean;
  activeStore: TStore;

  // Actions
  toggleServiceStatus: (serviceId: string) => void;
  deleteService: (serviceId: string) => void;
  addCategory: (categoryName: string) => void;
  deleteCategory: (categoryName: string) => void;
  handleOpenAddModal: () => void;
  handleCloseAddModal: () => void;
  handleEditService: (service: TService) => void;
  handleCloseEditModal: () => void;
  handleOpenCategoryModal: () => void;
  handleCloseCategoryModal: () => void;
};
