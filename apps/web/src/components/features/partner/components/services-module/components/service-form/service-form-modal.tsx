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
import { Category, Service } from '../../services-module.hook';
import { ServiceFormContent } from './service-form-content';

interface ServiceFormData {
  name: string;
  description: string;
  duration: string;
  price: string;
  category: string;
  maxBookingsPerDay: string;
  isActive: boolean;
}

interface ServiceFormModalProps {
  isOpen: boolean;
  editingService: Service | null;
  formData: ServiceFormData;
  setFormData: (data: ServiceFormData) => void;
  categories: Category[];
  onClose: () => void;
  onSave: () => void;
  getColorClass: (color: string) => string;
}

export function ServiceFormModal({
  isOpen,
  editingService,
  formData,
  setFormData,
  categories,
  onClose,
  onSave,
  getColorClass,
}: ServiceFormModalProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="max-h-[95vh] flex flex-col">
          <DrawerHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                {editingService ? (
                  <Settings className="h-5 w-5 text-white" />
                ) : (
                  <Plus className="h-5 w-5 text-white" />
                )}
              </div>
              <div>
                <DrawerTitle className="text-gray-900">
                  {editingService ? 'Editar Serviço' : 'Novo Serviço'}
                </DrawerTitle>
                {editingService && (
                  <DrawerDescription className="text-gray-600">
                    {editingService.name}
                  </DrawerDescription>
                )}
              </div>
            </div>
          </DrawerHeader>

          <ServiceFormContent
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            editingService={editingService}
            onSave={onSave}
            onCancel={onClose}
            getColorClass={getColorClass}
          />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-5 border-b border-gray-200 shrink-0 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              {editingService ? (
                <Settings className="h-5 w-5 text-white" />
              ) : (
                <Plus className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <DialogTitle className="text-gray-900">
                {editingService ? 'Editar Serviço' : 'Novo Serviço'}
              </DialogTitle>
              {editingService && (
                <p className="text-sm text-gray-600 mt-0.5">
                  {editingService.name}
                </p>
              )}
            </div>
          </div>
        </DialogHeader>

        <ServiceFormContent
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          editingService={editingService}
          onSave={onSave}
          onCancel={onClose}
          getColorClass={getColorClass}
        />
      </DialogContent>
    </Dialog>
  );
}
