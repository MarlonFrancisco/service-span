import { SubscriptionService } from '@/service/subscription/subscription.service';
import { useMutation } from '@tanstack/react-query';

export const useSubscriptionMutations = () => {
  const { mutate: createSubscription, isPending: isCreatingSubscription } =
    useMutation({
      mutationFn: (priceId: string) =>
        SubscriptionService.createSubscription(priceId),
    });

  return {
    createSubscription,
    isCreatingSubscription,
  };
};
