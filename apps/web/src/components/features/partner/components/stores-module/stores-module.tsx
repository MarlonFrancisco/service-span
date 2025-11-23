'use client';
import { useStoresQuery } from '@/hooks/use-query/use-stores-query/use-stores-query.hook';
import { useStoresStore } from '@/store';
import { Button } from '@repo/ui';
import { Plus } from 'lucide-react';
import { AddStoreModal } from './components/add-store-modal';
import { EmptyStoreList } from './components/empty-store-list/empty-store-list';
import { StatsCards } from './components/stats-cards';
import { StoreCard } from './components/store-card';
import { StoreDetailsDrawer } from './components/store-details-drawer';
import { StoresModuleSkeleton } from './stores-module.skeleton';

export const StoresModule = () => {
  const { stores } = useStoresQuery({ includeStores: true });
  const { setIsAddModalOpen } = useStoresStore();
  const { isPendingStores } = useStoresQuery({ includeStores: true });

  if (isPendingStores) {
    return <StoresModuleSkeleton />;
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900 mb-1">Gestão de Lojas</h2>
          <p className="text-gray-600 text-sm">
            Gerencie suas unidades, equipes e configurações
          </p>
        </div>

        <Button
          onClick={() => setIsAddModalOpen({ isOpen: true })}
          className="bg-gray-900 hover:bg-gray-800 text-white shrink-0 min-h-[44px] sm:min-h-[40px]"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Adicionar Nova Loja</span>
          <span className="sm:hidden">Nova Loja</span>
        </Button>
      </div>

      {/* Overview Stats */}
      <StatsCards />

      {/* Stores List */}
      <div className="space-y-4">
        {stores.map((store, index) => (
          <StoreCard key={store.id} store={store} index={index} />
        ))}

        {stores.length === 0 && <EmptyStoreList />}
      </div>

      {/* Store Details Drawer (Mobile) */}
      <StoreDetailsDrawer />

      {/* Add/Edit Store Modal */}
      <AddStoreModal />
    </div>
  );
};
