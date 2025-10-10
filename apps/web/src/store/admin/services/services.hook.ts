import { useMemo } from 'react';
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

  // Computed values com useMemo
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        filterCategory === 'all' || service.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchQuery, filterCategory]);

  const totalServices = useMemo(() => services.length, [services]);

  const activeServices = useMemo(
    () => services.filter((s) => s.isActive).length,
    [services],
  );

  const totalBookings = useMemo(
    () => services.reduce((acc, s) => acc + (s.bookingsThisMonth || 0), 0),
    [services],
  );

  const totalRevenue = useMemo(
    () => services.reduce((acc, s) => acc + (s.revenue || 0), 0),
    [services],
  );

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
