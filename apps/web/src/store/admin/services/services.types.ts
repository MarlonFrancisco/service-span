export interface IService {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  isActive: boolean;
  bookingsThisMonth?: number;
  revenue?: number;
  imageUrl?: string;
  maxBookingsPerDay?: number;
  tags?: string[];
}

export interface ICategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface IServiceFormData {
  name: string;
  description: string;
  duration: string;
  price: string;
  category: string;
  maxBookingsPerDay: string;
  isActive: boolean;
}

export interface ICategoryFormData {
  name: string;
  description: string;
  color: string;
}

export interface IServicesStore {
  // State
  services: IService[];
  categories: ICategory[];
  searchQuery: string;
  filterCategory: string;
  isAddModalOpen: boolean;
  isCategoryModalOpen: boolean;
  editingService: IService | null;
  editingCategory: ICategory | null;
  formData: IServiceFormData;
  categoryFormData: ICategoryFormData;

  // Computed
  filteredServices: IService[];
  totalServices: number;
  activeServices: number;
  totalBookings: number;
  totalRevenue: number;

  // Actions
  setSearchQuery: (query: string) => void;
  setFilterCategory: (category: string) => void;
  setIsAddModalOpen: (isOpen: boolean) => void;
  setIsCategoryModalOpen: (isOpen: boolean) => void;
  setEditingService: (service: IService | null) => void;
  setEditingCategory: (category: ICategory | null) => void;
  setFormData: (data: Partial<IServiceFormData>) => void;
  setCategoryFormData: (data: Partial<ICategoryFormData>) => void;
  resetForm: () => void;
  resetCategoryForm: () => void;

  // Service CRUD
  addService: (service: Omit<IService, 'id'>) => void;
  updateService: (id: string, service: Partial<IService>) => void;
  deleteService: (id: string) => void;
  toggleServiceStatus: (id: string) => void;

  // Category CRUD
  addCategory: (category: Omit<ICategory, 'id'>) => void;
  updateCategory: (id: string, category: Partial<ICategory>) => void;
  deleteCategory: (id: string) => void;
}
