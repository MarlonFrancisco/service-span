import { CategoryService } from '@/service/partner/category';
import { usePartnerStore, useServicesStore } from '@/store';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useServicesModule = () => {
  const {
    searchQuery,
    filterCategory,
    services,
    filteredServices,
    setServiceModalParams,
    setFilteredServices,
    setServices,
    setCategories,
  } = useServicesStore();
  const activeStore = usePartnerStore((state) => state.activeStore);

  const { data: categories = [], isFetched } = useQuery({
    queryKey: CACHE_QUERY_KEYS.categories(activeStore.id),
    queryFn: () => CategoryService.getAll(activeStore.id),
    enabled: !!activeStore?.id,
  });

  useEffect(() => {
    if (isFetched) {
      setCategories(categories);
      setServices(
        categories.flatMap((category) =>
          category.services.map((service) => ({
            ...service,
            category,
          })),
        ),
      );
    }
  }, [categories, setCategories, setServices, isFetched]);

  useEffect(() => {
    setFilteredServices(
      services.filter((service) => {
        const matchesSearch =
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          filterCategory === 'all' ||
          service.category?.name.toLowerCase() === filterCategory.toLowerCase();
        return matchesSearch && matchesCategory;
      }),
    );
  }, [services, searchQuery, filterCategory, setFilteredServices]);

  return {
    categories,
    filteredServices,
    searchQuery,
    filterCategory,
    setServiceModalParams,
  };
};
