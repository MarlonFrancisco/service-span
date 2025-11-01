import { useServicesStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsMobile } from '@repo/ui';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { serviceFormSchema, TServiceFormData } from './service-form.schema';

export const useServiceForm = () => {
  const service = useServicesStore((state) => state.service);
  const isServiceModalOpen = useServicesStore(
    (state) => state.isServiceModalOpen,
  );
  const setServiceModalParams = useServicesStore(
    (state) => state.setServiceModalParams,
  );
  const isMobile = useIsMobile();

  const form = useForm<TServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: service,
  });

  useEffect(() => {
    if (service) {
      form.reset(service);
    }
  }, [service, form]);

  const handleClose = () => {
    setServiceModalParams({ isOpen: false });
  };

  const isEditing = !!service.id;

  return {
    form,
    isEditing,
    isMobile,
    isServiceModalOpen,
    handleClose,
  };
};
