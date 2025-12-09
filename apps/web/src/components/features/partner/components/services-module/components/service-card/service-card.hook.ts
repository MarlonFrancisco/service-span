import { useServicesMutations } from '@/hooks/partner/use-services-mutations/use-services-mutations.hook';
import { usePartnerStore, useServicesStore } from '@/store';
import { IService } from '@/types/api/service.types';

export const useServiceCard = ({ service }: { service: IService }) => {
  const { setServiceModalParams } = useServicesStore();
  const activeStore = usePartnerStore((state) => state.activeStore);

  const { deleteService, updateService } = useServicesMutations({
    storeId: activeStore.id,
  });

  const handleEdit = () => {
    setServiceModalParams({ isOpen: true, service });
  };

  const handleDelete = () => {
    deleteService(service);
  };

  const handleToggleStatus = () => {
    updateService({ ...service, isActive: !service.isActive });
  };

  return {
    handleEdit,
    handleDelete,
    handleToggleStatus,
  };
};
