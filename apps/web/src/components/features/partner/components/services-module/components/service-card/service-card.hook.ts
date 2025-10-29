import { useServices } from '@/store';
import { IService } from '@/types/api/service.types';

export const useServiceCard = ({ service }: { service: IService }) => {
  const { setServiceModalParams, deleteService, updateService } = useServices();

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
