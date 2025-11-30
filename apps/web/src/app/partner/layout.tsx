import { Partner } from '@/components/features/partner';
import { StoreService } from '@/service/store';
import { SubscriptionService } from '@/service/subscription';
import { IMySubscription } from '@/types/api';
import { IStore } from '@/types/api/stores.types';
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

  const requestsPromises = [
    SubscriptionService.getCurrentPlan(),
    StoreService.getAll(),
  ];

  const results = await Promise.all(requestsPromises);

  const [subscription, stores] = results as [IMySubscription, IStore[]];

  if (!subscription?.isActive) {
    redirect('/pricing');
  }

  const queriesPromises = [
    queryClient.prefetchQuery({
      queryKey: CACHE_QUERY_KEYS.currentPlan(),
      queryFn: () => subscription,
    }),
    queryClient.prefetchQuery({
      queryKey: CACHE_QUERY_KEYS.stores(),
      queryFn: () => stores,
    }),
    ...stores.map((store) =>
      queryClient.prefetchQuery({
        queryKey: CACHE_QUERY_KEYS.store(store.id),
        queryFn: () => store,
      }),
    ),
  ];

  await Promise.all(queriesPromises);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Partner>{children}</Partner>
    </HydrationBoundary>
  );
}
