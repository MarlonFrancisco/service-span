import { useUserQuery } from '@/hooks/use-query/use-user-query';
import { SubscriptionService } from '@/service/subscription';
import { useAuthStore } from '@/store/auth/auth.store';
import { useMutation } from '@tanstack/react-query';

export const usePlanCard = ({ priceId }: { priceId: string }) => {
  const { isLoggedIn } = useUserQuery();
  const openAuthAction = useAuthStore((state) => state.openAuthAction);

  const { mutateAsync: createSubscription } = useMutation({
    mutationFn: (priceId: string) =>
      SubscriptionService.createSubscription(priceId),
  });

  const handleCreateSubscription = async () => {
    if (!isLoggedIn) {
      openAuthAction({
        onAuth: async () => {
          const { url } = await createSubscription(priceId);
          window.location.href = url;
        },
      });

      return;
    }
    const { url } = await createSubscription(priceId);
    window.location.href = url;
  };

  return { handleCreateSubscription };
};
