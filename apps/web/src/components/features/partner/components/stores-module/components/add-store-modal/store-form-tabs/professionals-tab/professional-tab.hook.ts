import { useStoresAdmin } from '@/store';
import { IProfessional } from '@/types/api';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { TStoreFormSchema } from '../store-form.schema';

export const useProfessionalTab = () => {
  const { setIsAddProfessional, updateStoreMember } = useStoresAdmin();

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
      const updatedProfessionals = professionals.filter(
        (professional) => professional.id !== professionalId,
      );
      form.setValue('storeMembers', updatedProfessionals);
    },
    [professionals, form],
  );

  const handleToggleProfessionalStatus = useCallback(
    async (professional: IProfessional) => {
      await updateStoreMember({
        storeId: form.getValues('id')!,
        professional: {
          id: professional.id,
          isActive: !professional.isActive,
        },
      });

      const updatedProfessionals = professionals.map((professional) =>
        professional.id === professional.id
          ? { ...professional, isActive: !professional.isActive }
          : professional,
      );
      form.setValue('storeMembers', updatedProfessionals);
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
