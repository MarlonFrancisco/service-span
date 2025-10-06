'use client';

import { AddServiceModal } from './components/add-service-modal';
import { CategoryManagementModal } from './components/category-management-modal';
import { EditServiceModal } from './components/edit-service-modal';
import { ServiceCard } from './components/service-card';
import { useServicesModule } from './services-module.hook';

export const ServicesModule = () => {
  const {
    services,
    categories,
    isAddModalOpen,
    editingService,
    isCategoryModalOpen,
    activeStore,
    toggleServiceStatus,
    deleteService,
    addCategory,
    deleteCategory,
    handleCloseAddModal,
    handleEditService,
    handleCloseEditModal,
    handleCloseCategoryModal,
  } = useServicesModule();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#1a2b4c]">Serviços - {activeStore.name}</h2>
          <p className="text-gray-600 text-sm">
            Configure os serviços oferecidos nesta unidade
          </p>
        </div>

        <div className="flex gap-2">
          <AddServiceModal
            isOpen={isAddModalOpen}
            categories={categories}
            onClose={handleCloseAddModal}
          />

          <CategoryManagementModal
            isOpen={isCategoryModalOpen}
            categories={categories}
            services={services}
            onClose={handleCloseCategoryModal}
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
          />
        </div>
      </div>

      {/* Services by Category */}
      {categories.map((category) => {
        const categoryServices = services.filter(
          (service) => service.category === category,
        );

        if (categoryServices.length === 0) return null;

        return (
          <div key={category} className="space-y-4">
            <h3 className="text-[#1a2b4c] text-lg border-b border-gray-200 pb-2">
              {category}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onEdit={handleEditService}
                  onDelete={deleteService}
                  onToggleStatus={toggleServiceStatus}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Edit Service Modal */}
      <EditServiceModal
        service={editingService}
        categories={categories}
        onClose={handleCloseEditModal}
      />
    </div>
  );
};
