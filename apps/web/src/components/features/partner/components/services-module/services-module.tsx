'use client';
import { Button, Card, CardContent, useIsMobile } from '@repo/ui';
import { Package, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CategoryManagementModal } from './components/category-management';
import { CategorySection } from './components/category-section';
import { ServiceCard } from './components/service-card';
import { ServiceFormModal } from './components/service-form';
import {
  ServicesFiltersDesktop,
  ServicesFiltersMobile,
} from './components/services-filters';
import { ServicesStats } from './components/services-stats';
import { useServicesModule } from './services-module.hook';
import { getColorBgClass, getColorClass } from './utils/colors';

interface Store {
  id: string;
  name: string;
  address: string;
}

const activeStore: Store = {
  id: '1',
  name: 'Barbearia do João',
  address: 'Rua das Flores, 123',
};

export function ServicesModule() {
  const isMobile = useIsMobile();
  const {
    services,
    categories,
    isAddModalOpen,
    setIsAddModalOpen,
    editingService,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    editingCategory,
    expandedCategories,
    formData,
    setFormData,
    categoryFormData,
    setCategoryFormData,
    toggleServiceStatus,
    deleteService,
    handleAddService,
    handleUpdateService,
    handleEditService,
    handleCloseModal,
    handleQuickAddService,
    addCategory,
    handleEditCategory,
    updateCategory,
    cancelEditCategory,
    deleteCategory,
    toggleCategory,
    totalServices,
    activeServices,
    filteredServices,
  } = useServicesModule();

  return (
    <div className="space-y-6 pb-6 sm:pb-6 mb-20 sm:mb-0">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-1">Gestão de Serviços</h2>
        <p className="text-gray-600 text-sm">
          Configure e gerencie os serviços oferecidos em{' '}
          <span className="text-gray-900">{activeStore.name}</span>
        </p>
      </div>

      {/* Stats */}
      <ServicesStats
        totalServices={totalServices}
        activeServices={activeServices}
      />

      {/* Filters */}
      {isMobile ? (
        <ServicesFiltersMobile
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categories={categories}
          onManageCategories={() => setIsCategoryModalOpen(true)}
          onAddService={() => setIsAddModalOpen(true)}
          getColorClass={getColorClass}
        />
      ) : (
        <ServicesFiltersDesktop
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categories={categories}
          onManageCategories={() => setIsCategoryModalOpen(true)}
          onAddService={() => setIsAddModalOpen(true)}
          getColorClass={getColorClass}
        />
      )}

      {/* Results Counter */}
      {filteredServices.length > 0 &&
        (searchQuery || filterCategory !== 'all') && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package className="h-4 w-4" />
            <span>
              {filteredServices.length}{' '}
              {filteredServices.length === 1
                ? 'serviço encontrado'
                : 'serviços encontrados'}
            </span>
          </div>
        )}

      {/* Services by Category */}
      <AnimatePresence mode="wait">
        {filterCategory === 'all' ? (
          // Show all categories
          <div className="space-y-3">
            {categories
              .slice()
              .sort((a, b) => {
                const aCount = filteredServices.filter(
                  (s) => s.category === a.name,
                ).length;
                const bCount = filteredServices.filter(
                  (s) => s.category === b.name,
                ).length;
                if (bCount !== aCount) return bCount - aCount;
                return a.name.localeCompare(b.name);
              })
              .map((category) => {
                const categoryServices = filteredServices.filter(
                  (service) => service.category === category.name,
                );
                const isEmpty = categoryServices.length === 0;
                const isExpanded = expandedCategories[category.id] ?? !isEmpty;

                return (
                  <CategorySection
                    key={category.id}
                    category={category}
                    services={categoryServices}
                    isExpanded={isExpanded}
                    onToggleExpanded={() => toggleCategory(category.id)}
                    onQuickAdd={() => handleQuickAddService(category.name)}
                    onEditService={handleEditService}
                    onDeleteService={deleteService}
                    onToggleServiceStatus={toggleServiceStatus}
                    getColorClass={getColorClass}
                    getColorBgClass={getColorBgClass}
                  />
                );
              })}
          </div>
        ) : (
          // Show filtered category only
          <motion.div
            key={filterCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onEdit={handleEditService}
                  onDelete={deleteService}
                  onToggleStatus={toggleServiceStatus}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">
              {searchQuery || filterCategory !== 'all'
                ? 'Nenhum serviço encontrado'
                : 'Nenhum serviço cadastrado'}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {searchQuery || filterCategory !== 'all'
                ? 'Tente ajustar os filtros ou fazer uma nova busca'
                : 'Comece adicionando seu primeiro serviço'}
            </p>
            {!searchQuery && filterCategory === 'all' && (
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Serviço
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* FAB - Mobile Only */}
      <Button
        onClick={() => setIsAddModalOpen(true)}
        className="sm:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-black hover:bg-gray-800 text-white z-40"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Service Form Modal */}
      <ServiceFormModal
        isOpen={isAddModalOpen || !!editingService}
        editingService={editingService}
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        onClose={handleCloseModal}
        onSave={editingService ? handleUpdateService : handleAddService}
        getColorClass={getColorClass}
      />

      {/* Category Management Modal */}
      <CategoryManagementModal
        isOpen={isCategoryModalOpen}
        categories={categories}
        services={services}
        editingCategory={editingCategory}
        categoryFormData={categoryFormData}
        setCategoryFormData={setCategoryFormData}
        onClose={() => setIsCategoryModalOpen(false)}
        onEdit={handleEditCategory}
        onDelete={deleteCategory}
        onAdd={addCategory}
        onUpdate={updateCategory}
        onCancelEdit={cancelEditCategory}
        getColorClass={getColorClass}
      />
    </div>
  );
}
