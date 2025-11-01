import { CategoryService } from '@/service/partner/category';
import { ServiceService } from '@/service/partner/service';
import { usePartnerStore } from '@/store/partner';
import { ICategory, IService } from '@/types/api/service.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { useServicesStore } from './services.store';

export const useServices = () => {
  const store = useServicesStore();

  const activeStore = usePartnerStore((state) => state.activeStore);

  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery({
    queryKey: ['partner/categories'],
    queryFn: () => CategoryService.getAll(activeStore.id),
    enabled: !!activeStore?.id,
  });

  const services = useMemo(() => {
    return categories.flatMap((category) =>
      category.services.map((service) => ({
        ...service,
        category,
      })),
    );
  }, [categories]);

  const filteredServices = useMemo(
    () =>
      services.filter((service) => {
        const matchesSearch =
          service.name
            .toLowerCase()
            .includes(store.searchQuery.toLowerCase()) ||
          service.description
            .toLowerCase()
            .includes(store.searchQuery.toLowerCase());
        const matchesCategory =
          store.filterCategory === 'all' ||
          service.category?.name.toLowerCase() ===
            store.filterCategory.toLowerCase();
        return matchesSearch && matchesCategory;
      }),
    [services, store.searchQuery, store.filterCategory],
  );

  const { mutate: createCategory, isPending: isCreatingCategory } = useMutation(
    {
      mutationFn: (category: Partial<ICategory>) =>
        CategoryService.create(activeStore!.id, category),
      onSuccess: (data) => {
        queryClient.setQueryData(['partner/categories'], (old: ICategory[]) => [
          ...old,
          { ...data, services: [] },
        ]);
        toast.success('Categoria criada com sucesso');
      },
      onError: () => {
        toast.error('Erro ao criar categoria');
      },
    },
  );

  const { mutate: updateCategory, isPending: isUpdatingCategory } = useMutation(
    {
      mutationFn: (category: Partial<ICategory>) =>
        CategoryService.update(activeStore!.id, category),
      onSuccess: (data) => {
        queryClient.setQueryData(['partner/categories'], (old: ICategory[]) =>
          old.map((c) => (c.id === data.id ? data : c)),
        );
        toast.success('Categoria atualizada com sucesso');
        store.setCategoryModalParams({ isOpen: true });
      },
      onError: () => {
        toast.error('Erro ao atualizar categoria');
      },
    },
  );

  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation(
    {
      mutationFn: (categoryId: string) =>
        CategoryService.delete(activeStore!.id, categoryId),
      onSuccess: (data) => {
        queryClient.setQueryData(['partner/categories'], (old: ICategory[]) =>
          old.filter((c) => c.id !== data.id),
        );
        toast.success('Categoria excluída com sucesso');
      },
      onError: () => {
        toast.error('Erro ao excluir categoria');
      },
    },
  );

  const { mutate: createService, isPending: isCreatingService } = useMutation({
    mutationFn: (service: Partial<IService>) =>
      ServiceService.create(activeStore!.id, service),
    onSuccess: (data) => {
      queryClient.setQueryData(['partner/categories'], (old: ICategory[]) =>
        old.map((c) =>
          c.id === data.category?.id
            ? { ...c, services: [...c.services, data] }
            : c,
        ),
      );
      toast.success('Serviço criado com sucesso');
      store.setServiceModalParams({ isOpen: false });
    },
    onError: () => {
      toast.error('Erro ao criar serviço');
    },
  });

  const { mutate: updateService, isPending: isUpdatingService } = useMutation({
    mutationFn: (service: IService) =>
      ServiceService.update(activeStore!.id, service),
    onSuccess: (data) => {
      queryClient.setQueryData(['partner/categories'], (old: ICategory[]) =>
        old.map((c) =>
          c.id === data.category?.id
            ? {
                ...c,
                services: c.services.map((s) => (s.id === data.id ? data : s)),
              }
            : c,
        ),
      );
      toast.success('Serviço atualizado com sucesso');
      store.setServiceModalParams({ isOpen: false });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao atualizar serviço');
    },
  });

  const { mutate: deleteService, isPending: isDeletingService } = useMutation({
    mutationFn: (service: IService) =>
      ServiceService.delete(activeStore!.id, service.category!.id!, service.id),
    onSuccess: (data) => {
      queryClient.setQueryData(['partner/categories'], (old: ICategory[]) =>
        old.map((c) =>
          c.id === data.category?.id
            ? { ...c, services: c.services.filter((s) => s.id !== data.id) }
            : c,
        ),
      );
      toast.success('Serviço excluído com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir serviço');
    },
  });

  return {
    ...store,
    categories,
    services,
    filteredServices,

    createCategory,
    updateCategory,
    deleteCategory,

    // Mutations pending states
    isCreatingCategory,
    isUpdatingCategory,
    isDeletingCategory,

    createService,
    updateService,
    deleteService,

    isCreatingService,
    isUpdatingService,
    isDeletingService,
  };
};
