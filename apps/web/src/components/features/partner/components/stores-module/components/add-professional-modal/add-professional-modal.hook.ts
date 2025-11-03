import { useStoreMutations } from '@/hooks/use-mutations/use-store-mutations/use-store-mutations.hook';
import { useServicesStore, useStoresStore } from '@/store';
import { IUser } from '@/types/api';
import { IService } from '@/types/api/service.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsMobile } from '@repo/ui/index';
import { useCallback, useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { TStoreFormSchema } from '../add-store-modal/store-form-tabs/store-form.schema';
import {
  professionalFormSchema,
  TProfessionalFormSchema,
} from './add-professional.schema';

export const useAddProfessionalModal = () => {
  const { isAddProfessional, professional, setIsAddProfessional } =
    useStoresStore();
  const {
    createStoreMember,
    updateStoreMember,
    isCreatingStoreMember,
    isUpdatingStoreMember,
  } = useStoreMutations();

  const storeForm = useFormContext<TStoreFormSchema>();

  const form = useForm<TProfessionalFormSchema>({
    resolver: zodResolver(professionalFormSchema),
  });

  const isEditing = !!professional.id;

  useEffect(() => {
    form.reset({
      id: professional.id,
      role: professional.role || 'professional',
      user: {
        email: professional.user.email || '',
      },
      services: professional.services,
    });
  }, [professional, form]);

  const isMobile = useIsMobile();
  const services = useServicesStore((state) => state.services);

  const selectedServices = form.watch('services') || [];

  const addService = (serviceId: string) => {
    if (!selectedServices.some((s) => s.id === serviceId)) {
      const next = [
        ...selectedServices,
        {
          id: serviceId,
          name: services.find((s) => s.id === serviceId)?.name || '',
        },
      ];
      form.setValue('services', next, { shouldDirty: true });
    }
  };

  const removeService = (serviceId: string) => {
    const next = selectedServices.filter((s) => s.id !== serviceId);
    form.setValue('services', next, { shouldDirty: true });
  };

  const handleSubmit = useCallback(() => {
    const asyncFn = async () => {
      const data = form.getValues();

      const fn = isEditing ? updateStoreMember : createStoreMember;

      fn(
        {
          storeId: storeForm.getValues('id')!,
          professional: {
            id: data.id || undefined,
            role: data.role,
            user: {
              email: data.user.email,
            } as IUser,
            services: data.services as IService[],
          },
        },
        {
          onSuccess: (professional) => {
            const oldProfessionals = storeForm.getValues('storeMembers');

            const professionals = isEditing
              ? oldProfessionals.map((p) =>
                  p.id === professional.id ? professional : p,
                )
              : [...oldProfessionals, professional];

            storeForm.setValue('storeMembers', professionals);

            setIsAddProfessional({ isOpen: false });
          },
        },
      );
    };

    form.handleSubmit(asyncFn, (errors) => {
      const firstError = Object.values(errors)[0]?.message;
      if (firstError) {
        toast.error(firstError);
      }
    })();
  }, [
    form,
    storeForm,
    createStoreMember,
    updateStoreMember,
    isEditing,
    setIsAddProfessional,
  ]);

  const handleClose = useCallback(() => {
    setIsAddProfessional({ isOpen: false });
  }, [setIsAddProfessional]);

  return {
    form,
    isAddProfessional,
    professional,
    isEditing,
    isMobile,
    services,
    selectedServices,
    isLoading: isCreatingStoreMember || isUpdatingStoreMember,
    addService,
    removeService,
    handleSubmit,
    handleClose,
  };
};
