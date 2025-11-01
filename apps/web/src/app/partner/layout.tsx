import { Partner } from '@/components/features/partner';
import { StoreService } from '@/service/store';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
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

  await queryClient.prefetchQuery({
    queryKey: CACHE_QUERY_KEYS.stores(),
    queryFn: () => StoreService.getAll(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Partner>{children}</Partner>
    </HydrationBoundary>
  );
}
