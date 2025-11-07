import { UsersService } from '@/service/users';
import { useAuthStore } from '@/store';
import { cookies } from '@/utils/helpers/cookie.helper';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useUserQuery = () => {
  const isOpen = useAuthStore((state) => state.isOpen);

  const queryKey = useMemo(() => cookies.get('user_identification')!, [isOpen]);

  const { data: user, isPending: isPendingUser } = useQuery({
    queryKey: CACHE_QUERY_KEYS.user(queryKey),
    queryFn: () => UsersService.getUser(),
    retry: (failureCount, error) => {
      return error.message.includes('Unauthorized') ? false : failureCount <= 3;
    },
  });

  const isLoggedIn = Boolean(user?.email);

  return { user, isPendingUser, isLoggedIn };
};
