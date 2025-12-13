import { useStoreMemberMutations } from '@/hooks/partner/store/use-store-member-mutations/use-store-member-mutations.hook';
import { useStoresStore } from '@/store';
import { IProfessional } from '@/types/api';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { TStoreFormSchema } from '../store-form.schema';

export const useProfessionalTab = () => {
  const { updateStoreMemberMutation, deleteStoreMemberMutation } =
    useStoreMemberMutations();
  const { setIsAddProfessional } = useStoresStore();

  const form = useFormContext<TStoreFormSchema>();

  const professionals = form.watch('storeMembers');

  const handleAddProfessional = useCallback(
    (professional?: IProfessional) => {
      setIsAddProfessional({ isOpen: true, professional });
    },
    [setIsAddProfessional],
  );

  const handleDeleteProfessional = useCallback(
    (professionalId: string) => {
      deleteStoreMemberMutation.mutate(
        {
          storeId: form.getValues('id')!,
          professionalId,
        },
        {
          onSuccess: () => {
            const updatedProfessionals = professionals.filter(
              (professional) => professional.id !== professionalId,
            );
            form.setValue('storeMembers', updatedProfessionals);
            setIsAddProfessional({ isOpen: false });
          },
        },
      );
    },
    [professionals, form, deleteStoreMemberMutation, setIsAddProfessional],
  );

  const handleToggleProfessionalStatus = useCallback(
    async (professional: IProfessional) => {
      updateStoreMemberMutation.mutate(
        {
          storeId: form.getValues('id')!,
          professional: {
            id: professional.id,
            isActive: !professional.isActive,
          },
        },
        {
          onSuccess: () => {
            const updatedProfessionals = professionals.map((professional) =>
              professional.id === professional.id
                ? { ...professional, isActive: !professional.isActive }
                : professional,
            );
            form.setValue('storeMembers', updatedProfessionals);
          },
        },
      );
    },
    [professionals, form, updateStoreMemberMutation],
  );

  return {
    professionals,
    handleAddProfessional,
    handleDeleteProfessional,
    handleToggleProfessionalStatus,
  };
};
