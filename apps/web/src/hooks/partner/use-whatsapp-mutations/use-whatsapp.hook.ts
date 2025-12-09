import { WhatsappService } from '@/service/whatsapp';
import type {
  IWhatsappConfigPayload,
  IWhatsappConfigResponse,
} from '@/types/api/whatsapp.types';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useWhatsappMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: saveConfig, isPending: isSaveConfigPending } = useMutation({
    mutationFn: (data: IWhatsappConfigPayload) =>
      WhatsappService.saveConfig(data),
    onSuccess: (data: IWhatsappConfigResponse) => {
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.whatsappConfig(data.store.id),
        data,
      );
      toast.success('Configurações salvas com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao salvar configurações.');
    },
  });

  return {
    saveConfig,
    isSaveConfigPending,
  };
};
