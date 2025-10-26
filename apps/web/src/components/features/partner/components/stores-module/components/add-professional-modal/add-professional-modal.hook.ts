import { useStoresAdmin } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { TStoreFormSchema } from '../add-store-modal/store-form-tabs/store-form.schema';
import {
  professionalFormSchema,
  TProfessionalFormSchema,
} from './add-professional.schema';

export const useAddProfessionalModal = () => {
  const {
    isAddProfessional,
    professional,
    setIsAddProfessional,
    createStoreMember,
    updateStoreMember,
  } = useStoresAdmin();

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
    });
  }, [professional, form]);

  const handleSubmit = useCallback(() => {
    const asyncFn = async () => {
      const data = form.getValues();
      if (data.id) {
        const professional = await updateStoreMember({
          storeId: storeForm.getValues('id')!,
          professional: {
            id: data.id!,
            role: data.role,
            user: {
              email: data.user.email,
            },
          },
        });
        storeForm.setValue('storeMembers', [
          ...storeForm
            .getValues('storeMembers')
            .map((p) => (p.id === professional.id ? professional : p)),
        ]);
      } else {
        const professional = await createStoreMember({
          storeId: storeForm.getValues('id')!,
          professional: {
            role: data.role,
            user: {
              email: data.user.email,
            },
          },
        });
        storeForm.setValue('storeMembers', [
          ...storeForm.getValues('storeMembers'),
          professional,
        ]);
      }

      form.reset();
    };

    form.handleSubmit(asyncFn, (errors) => {
      const firstError = Object.values(errors)[0]?.message;
      if (firstError) {
        toast.error(firstError);
      }
    })();
  }, [form, storeForm, createStoreMember, updateStoreMember]);

  const handleClose = useCallback(() => {
    setIsAddProfessional({ isOpen: false });
  }, [setIsAddProfessional]);

  return {
    form,
    isAddProfessional,
    professional,
    isEditing,
    handleSubmit,
    handleClose,
  };
};
