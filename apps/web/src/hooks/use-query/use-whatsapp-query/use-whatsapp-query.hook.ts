import { WhatsappService } from '@/service/whatsapp';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

export const useWhatsappQuery = (storeId: string) => {
  const { data: whatsappConfig, isPending: isWhatsappPending } = useQuery({
    queryKey: CACHE_QUERY_KEYS.whatsappConfig(storeId),
    queryFn: () => WhatsappService.getConfig(storeId),
    enabled: !!storeId,
  });

  return {
    whatsappConfig,
    isWhatsappPending,
  };
};
