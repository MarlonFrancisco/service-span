import { StoreService } from '@/service/store';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

export const useStoresQuery = ({
  storeId,
  includeStores = false,
}: {
  storeId?: string;
  includeStores?: boolean;
}) => {
  const { data: store, isPending: isPendingStore } = useQuery({
    queryKey: CACHE_QUERY_KEYS.store(storeId!),
    queryFn: () => StoreService.get(storeId!),
    enabled: !!storeId,
  });

  const { data: stores = [], isPending: isPendingStores } = useQuery({
    queryKey: CACHE_QUERY_KEYS.stores(),
    queryFn: () => StoreService.getAll(),
    enabled: includeStores,
  });

  return { store, isPendingStore, stores, isPendingStores };
};
