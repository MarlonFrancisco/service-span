import { Profile } from '@/components/features/profile';
import { UsersService } from '@/service/users';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const queryClient = getQueryClient();
  const accessToken = cookieStore.get('access_token')?.value;
  const userIdentification = cookieStore.get('user_identification')?.value;

  if (!userIdentification) {
    return redirect('/');
  }

  UsersService.headers = {
    Cookie: `access_token=${accessToken}`,
  };

  const user = await UsersService.getUser();

  if (!user) {
    return redirect('/');
  }

  await queryClient.prefetchQuery({
    queryKey: CACHE_QUERY_KEYS.user(userIdentification),
    queryFn: () => user,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Profile />
    </HydrationBoundary>
  );
}
