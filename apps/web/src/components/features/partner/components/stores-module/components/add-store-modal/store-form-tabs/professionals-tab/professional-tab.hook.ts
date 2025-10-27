import { useStoresAdmin } from '@/store';
import { IProfessional } from '@/types/api';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { TStoreFormSchema } from '../store-form.schema';

export const useProfessionalTab = () => {
  const { setIsAddProfessional, updateStoreMember, deleteStoreMember } =
    useStoresAdmin();

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
      deleteStoreMember({
        storeId: form.getValues('id')!,
        professionalId,
      }).then(() => {
        const updatedProfessionals = professionals.filter(
          (professional) => professional.id !== professionalId,
        );
        form.setValue('storeMembers', updatedProfessionals);
      });
    },
    [professionals, form, deleteStoreMember],
  );

  const handleToggleProfessionalStatus = useCallback(
    async (professional: IProfessional) => {
      updateStoreMember({
        storeId: form.getValues('id')!,
        professional: {
          id: professional.id,
          isActive: !professional.isActive,
        },
      }).then(() => {
        const updatedProfessionals = professionals.map((professional) =>
          professional.id === professional.id
            ? { ...professional, isActive: !professional.isActive }
            : professional,
        );
        form.setValue('storeMembers', updatedProfessionals);
      });
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
