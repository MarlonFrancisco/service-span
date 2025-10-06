'use client';

import { AddStoreModal } from './components/add-store-modal';
import { EditStoreModal } from './components/edit-store-modal';
import { StoreCard } from './components/store-card';
import { useStoresModule } from './stores-module.hook';

export const StoresModule = () => {
  const {
    stores,
    isAddModalOpen,
    editingStore,
    newStoreImages,
    editingStoreImages,
    toggleStoreStatus,
    handleEditStore,
    handleCloseEditModal,
    handleCloseAddModal,
    setNewStoreImages,
    setEditingStoreImages,
  } = useStoresModule();

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#1a2b4c]">Suas Unidades</h2>
          <p className="text-gray-600 text-sm">
            Gerencie todas as suas filiais em um só lugar
          </p>
        </div>

        <AddStoreModal
          isOpen={isAddModalOpen}
          images={newStoreImages}
          onClose={handleCloseAddModal}
          onImagesChange={setNewStoreImages}
        />
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            onEdit={handleEditStore}
            onToggleStatus={toggleStoreStatus}
          />
        ))}
      </div>

      {/* Edit Store Modal */}
      <EditStoreModal
        store={editingStore}
        images={editingStoreImages}
        onClose={handleCloseEditModal}
        onImagesChange={setEditingStoreImages}
      />
    </div>
  );
};
