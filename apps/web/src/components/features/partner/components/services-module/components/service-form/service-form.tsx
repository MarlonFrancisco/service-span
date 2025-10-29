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
} from '@repo/ui';
import { Plus, Settings } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { ServiceFormContent } from './service-form-content';
import { useServiceForm } from './service-form.hook';

export function ServiceFormModal() {
  const { form, isEditing, isMobile, isServiceModalOpen, handleClose } =
    useServiceForm();

  if (isMobile) {
    return (
      <FormProvider {...form}>
        <Drawer
          open={isServiceModalOpen}
          onOpenChange={(open) => !open && handleClose()}
        >
          <DrawerContent className="max-h-[95vh] flex flex-col">
            <DrawerHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                  {isEditing ? (
                    <Settings className="h-5 w-5 text-white" />
                  ) : (
                    <Plus className="h-5 w-5 text-white" />
                  )}
                </div>
                <div>
                  <DrawerTitle className="text-gray-900">
                    {isEditing ? 'Editar Serviço' : 'Novo Serviço'}
                  </DrawerTitle>
                  {isEditing && (
                    <DrawerDescription className="text-gray-600">
                      {form.getValues('name')}
                    </DrawerDescription>
                  )}
                </div>
              </div>
            </DrawerHeader>

            <ServiceFormContent />
          </DrawerContent>
        </Drawer>
      </FormProvider>
    );
  }

  return (
    <FormProvider {...form}>
      <Dialog
        open={isServiceModalOpen}
        onOpenChange={(open) => !open && handleClose()}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
          <DialogHeader className="px-6 py-5 border-b border-gray-200 shrink-0 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                {isEditing ? (
                  <Settings className="h-5 w-5 text-white" />
                ) : (
                  <Plus className="h-5 w-5 text-white" />
                )}
              </div>
              <div>
                <DialogTitle className="text-gray-900">
                  {isEditing ? 'Editar Serviço' : 'Novo Serviço'}
                </DialogTitle>
                {isEditing && (
                  <p className="text-sm text-gray-600 mt-0.5">
                    {form.getValues('name')}
                  </p>
                )}
              </div>
            </div>
          </DialogHeader>

          <ServiceFormContent />
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
