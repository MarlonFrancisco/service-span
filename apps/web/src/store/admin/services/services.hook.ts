import { useServicesStore } from './services.store';

export const useServices = () => {
  const {
    services,
    categories,
    searchQuery,
    filterCategory,
    isAddModalOpen,
    isCategoryModalOpen,
    editingService,
    editingCategory,
    formData,
    categoryFormData,
    filteredServices,
    totalServices,
    activeServices,
    totalBookings,
    totalRevenue,
    setSearchQuery,
    setFilterCategory,
    setIsAddModalOpen,
    setIsCategoryModalOpen,
    setEditingService,
    setEditingCategory,
    setFormData,
    setCategoryFormData,
    resetForm,
    resetCategoryForm,
    addService,
    updateService,
    deleteService,
    toggleServiceStatus,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useServicesStore();

  return {
    // State
    services,
    categories,
    searchQuery,
    filterCategory,
    isAddModalOpen,
    isCategoryModalOpen,
    editingService,
    editingCategory,
    formData,
    categoryFormData,

    // Computed
    filteredServices,
    totalServices,
    activeServices,
    totalBookings,
    totalRevenue,

    // Actions
    setSearchQuery,
    setFilterCategory,
    setIsAddModalOpen,
    setIsCategoryModalOpen,
    setEditingService,
    setEditingCategory,
    setFormData,
    setCategoryFormData,
    resetForm,
    resetCategoryForm,

    // Service CRUD
    addService,
    updateService,
    deleteService,
    toggleServiceStatus,

    // Category CRUD
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
