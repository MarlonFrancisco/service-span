import { StoreService } from '@/service/store';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

export const useStoresQuery = ({ storeId }: { storeId: string }) => {
  const { data: store, isPending: isPendingStore } = useQuery({
    queryKey: CACHE_QUERY_KEYS.store(storeId),
    queryFn: () => StoreService.get(storeId),
    enabled: !!storeId,
  });

  return { store, isPendingStore };
};
