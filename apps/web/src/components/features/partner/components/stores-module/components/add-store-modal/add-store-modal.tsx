import { useStoresAdmin } from '@/store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  useIsMobile,
} from '@repo/ui';
import { Plus, Settings } from 'lucide-react';
import { StoreFormTabs } from './store-form-tabs';

export const AddStoreModal = () => {
  const isMobile = useIsMobile();
  const { store, isEditingStore, isAddModalOpen, setIsAddModalOpen } =
    useStoresAdmin();

  if (isMobile) {
    return (
      <Drawer
        open={isAddModalOpen}
        onOpenChange={(open) => !open && setIsAddModalOpen({ isOpen: false })}
      >
        <DrawerContent className="max-h-[95vh]">
          <DrawerHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                {isEditingStore ? (
                  <Settings className="h-5 w-5 text-white" />
                ) : (
                  <Plus className="h-5 w-5 text-white" />
                )}
              </div>
              <div>
                <DrawerTitle className="text-gray-900">
                  {isEditingStore ? 'Configurações da Loja' : 'Criar Nova Loja'}
                </DrawerTitle>
                {isEditingStore && (
                  <DrawerDescription className="text-gray-600">
                    {store.name}
                  </DrawerDescription>
                )}
              </div>
            </div>
          </DrawerHeader>

          <StoreFormTabs />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={isAddModalOpen}
      onOpenChange={(open) => !open && setIsAddModalOpen({ isOpen: false })}
    >
      <DialogContent className="w-[95vw] sm:max-w-[95vw] md:max-w-[90vw] lg:max-w-[1400px] h-[92vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 sm:px-8 py-5 sm:py-6 border-b border-gray-200 shrink-0 bg-gradient-to-r from-gray-50 to-white">
          <DialogTitle className="text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              {isEditingStore ? (
                <Settings className="h-5 w-5 text-white" />
              ) : (
                <Plus className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl">
                {isEditingStore ? 'Configurações da Loja' : 'Criar Nova Loja'}
              </h2>
              {isEditingStore && (
                <p className="text-sm text-gray-600 mt-0.5">{store.name}</p>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <StoreFormTabs />
      </DialogContent>
    </Dialog>
  );
};
