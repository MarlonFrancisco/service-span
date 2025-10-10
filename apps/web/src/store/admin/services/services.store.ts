import { create } from 'zustand';
import {
  addCategoryAction,
  addServiceAction,
  deleteCategoryAction,
  deleteServiceAction,
  resetCategoryFormAction,
  resetFormAction,
  setCategoryFormDataAction,
  setEditingCategoryAction,
  setEditingServiceAction,
  setFilterCategoryAction,
  setFormDataAction,
  setIsAddModalOpenAction,
  setIsCategoryModalOpenAction,
  setSearchQueryAction,
  toggleServiceStatusAction,
  updateCategoryAction,
  updateServiceAction,
} from './services.actions';
import {
  INITIAL_CATEGORY_FORM_DATA,
  INITIAL_FORM_DATA,
  MOCK_CATEGORIES,
  MOCK_SERVICES,
} from './services.constants';
import type { IServicesStore } from './services.types';

export const useServicesStore = create<IServicesStore>((set, get) => ({
  // State
  services: MOCK_SERVICES,
  categories: MOCK_CATEGORIES,
  searchQuery: '',
  filterCategory: 'all',
  isAddModalOpen: false,
  isCategoryModalOpen: false,
  editingService: null,
  editingCategory: null,
  formData: INITIAL_FORM_DATA,
  categoryFormData: INITIAL_CATEGORY_FORM_DATA,

  // Computed
  get filteredServices() {
    const { services, searchQuery, filterCategory } = get();
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        filterCategory === 'all' || service.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  },

  get totalServices() {
    return get().services.length;
  },

  get activeServices() {
    return get().services.filter((s) => s.isActive).length;
  },

  get totalBookings() {
    return get().services.reduce(
      (acc, s) => acc + (s.bookingsThisMonth || 0),
      0,
    );
  },

  get totalRevenue() {
    return get().services.reduce((acc, s) => acc + (s.revenue || 0), 0);
  },

  // Actions
  setSearchQuery: setSearchQueryAction(set),
  setFilterCategory: setFilterCategoryAction(set),
  setIsAddModalOpen: setIsAddModalOpenAction(set),
  setIsCategoryModalOpen: setIsCategoryModalOpenAction(set),
  setEditingService: setEditingServiceAction(set),
  setEditingCategory: setEditingCategoryAction(set),
  setFormData: setFormDataAction(set),
  setCategoryFormData: setCategoryFormDataAction(set),
  resetForm: resetFormAction(set, INITIAL_FORM_DATA),
  resetCategoryForm: resetCategoryFormAction(set, INITIAL_CATEGORY_FORM_DATA),

  // Service CRUD
  addService: addServiceAction(set),
  updateService: updateServiceAction(set),
  deleteService: deleteServiceAction(set),
  toggleServiceStatus: toggleServiceStatusAction(set),

  // Category CRUD
  addCategory: addCategoryAction(set),
  updateCategory: updateCategoryAction(set),
  deleteCategory: deleteCategoryAction(set),
}));
