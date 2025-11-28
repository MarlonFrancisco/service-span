import { SubscriptionService } from '@/service/subscription/subscription.service';
import { IMySubscription } from '@/types/api';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useSubscriptionMutations = () => {
  const queryClient = useQueryClient();

  const createSubscriptionMutation = useMutation({
    mutationFn: (priceId: string) =>
      SubscriptionService.createSubscription(priceId),
  });

  const cancelSubscriptionMutation = useMutation({
    mutationFn: () => SubscriptionService.cancelSubscription(),
    onSuccess: (data) => {
      if (data.cancelAtPeriodEnd) {
        queryClient.setQueryData(
          CACHE_QUERY_KEYS.currentPlan(),
          (old: IMySubscription) => ({
            ...old,
            cancelAtPeriodEnd: true,
          }),
        );
        toast.success('Plano cancelado com sucesso');
      } else {
        toast.error('Erro ao cancelar plano');
      }
    },
    onError: () => {
      toast.error('Erro ao cancelar plano');
    },
  });

  const updateSubscriptionMutation = useMutation({
    mutationFn: ({ cancelAtPeriodEnd }: { cancelAtPeriodEnd: boolean }) =>
      SubscriptionService.updateSubscription({ cancelAtPeriodEnd }),
    onSuccess: (data) => {
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.currentPlan(),
        (old: IMySubscription) => ({
          ...old,
          ...data,
        }),
      );
      toast.success('Plano atualizado com sucesso');
    },
    onError: () => {
      toast.error('Erro ao atualizar plano');
    },
  });

  return {
    createSubscriptionMutation,
    cancelSubscriptionMutation,
    updateSubscriptionMutation,
  };
};
