import { useStoreMutations } from '@/hooks/partner/store/use-store-mutations/use-store-mutations.hook';
import { useStoresStore } from '@/store';
import { IProfessional } from '@/types/api';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { TStoreFormSchema } from '../store-form.schema';

export const useProfessionalTab = () => {
  const { updateStoreMember, deleteStoreMember } = useStoreMutations();
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
      deleteStoreMember(
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
    [professionals, form, deleteStoreMember, setIsAddProfessional],
  );

  const handleToggleProfessionalStatus = useCallback(
    async (professional: IProfessional) => {
      updateStoreMember(
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
    [professionals, form, updateStoreMember],
  );

  return {
    professionals,
    handleAddProfessional,
    handleDeleteProfessional,
    handleToggleProfessionalStatus,
  };
};
