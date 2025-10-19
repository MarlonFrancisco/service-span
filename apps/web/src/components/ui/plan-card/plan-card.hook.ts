import { SubscriptionService } from '@/service/subscription';
import { useAuth } from '@/store/auth/auth.hook';
import { useUser } from '@/store/user/user.hook';
import { useMutation } from '@tanstack/react-query';

export const usePlanCard = ({ priceId }: { priceId: string }) => {
  const { isLoggedIn } = useUser();
  const { openAuthAction } = useAuth();

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
    }
    const { url } = await createSubscription(priceId);
    window.location.href = url;
  };

  return { handleCreateSubscription };
};
