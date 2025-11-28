import { StoreService } from '@/service/store';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

export const useStoresQuery = () => {
  const { data: stores = [], isPending: isPendingStores } = useQuery({
    queryKey: CACHE_QUERY_KEYS.stores(),
    queryFn: () => StoreService.getAll(),
  });

  return { stores, isPendingStores };
};
