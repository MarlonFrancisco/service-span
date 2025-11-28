import { Partner } from '@/components/features/partner';
import { StoreService } from '@/service/store';
import { SubscriptionService } from '@/service/subscription';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface PartnerLayoutProps {
  children: ReactNode;
}

export default async function PartnerLayout({ children }: PartnerLayoutProps) {
  const queryClient = getQueryClient();

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  StoreService.headers = {
    Cookie: `access_token=${accessToken}`,
  };

  SubscriptionService.headers = {
    Cookie: `access_token=${accessToken}`,
  };

  try {
    const subscription = await SubscriptionService.getCurrentPlan();

    if (!subscription?.isActive) {
      return redirect('/pricing');
    }

    await queryClient.prefetchQuery({
      queryKey: CACHE_QUERY_KEYS.currentPlan(),
      queryFn: () => subscription,
    });
  } catch {
    return redirect('/pricing');
  }

  const stores = await StoreService.getAll();

  await queryClient.prefetchQuery({
    queryKey: CACHE_QUERY_KEYS.stores(),
    queryFn: () => stores,
  });

  if (stores?.length) {
    await queryClient.prefetchQuery({
      queryKey: CACHE_QUERY_KEYS.store(stores[0]!.id),
      queryFn: () => StoreService.get(stores[0]!.id),
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Partner>{children}</Partner>
    </HydrationBoundary>
  );
}
