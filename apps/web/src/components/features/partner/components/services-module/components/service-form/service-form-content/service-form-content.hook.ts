import { useServicesMutations } from '@/hooks';
import { usePartnerStore, useServicesStore } from '@/store';
import { IService } from '@/types/api/service.types';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { TServiceFormData } from '../service-form.schema';

export const useServiceFormContent = () => {
  const categories = useServicesStore((state) => state.categories);
  const service = useServicesStore((state) => state.service);
  const setServiceModalParams = useServicesStore(
    (state) => state.setServiceModalParams,
  );
  const activeStore = usePartnerStore((state) => state.activeStore);

  const { updateService, createService, isCreatingService, isUpdatingService } =
    useServicesMutations({
      storeId: activeStore.id,
    });

  const form = useFormContext<TServiceFormData>();

  const isEditing = !!service.id;

  const handleClose = () => {
    setServiceModalParams({ isOpen: false });
  };

  const handleSubmit = () => {
    form.handleSubmit(
      (data) => {
        if (isEditing) {
          updateService(data as IService);
        } else {
          createService({
            ...data,
            id: undefined,
          } as Partial<IService>);
        }
      },
      (errors) => {
        const firstError = Object.values(errors)[0]?.message;
        if (firstError) {
          toast.error(firstError);
        }
      },
    )();
  };

  return {
    categories,
    form,
    isEditing,
    isCreatingService,
    isUpdatingService,
    handleClose,
    handleSubmit,
  };
};
