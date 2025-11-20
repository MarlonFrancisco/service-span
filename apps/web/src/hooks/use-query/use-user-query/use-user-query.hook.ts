'use client';
import { UsersService } from '@/service/users';
import { useAuthStore } from '@/store';
import { cookies } from '@/utils/helpers/cookie.helper';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const useUserQuery = () => {
  const isOpen = useAuthStore((state) => state.isOpen);
  const pathname = usePathname();

  const queryKey = useMemo(
    () => cookies.get('user_identification')!,
    [isOpen, pathname],
  );

  const { data: user, isPending: isPendingUser } = useQuery({
    queryKey: CACHE_QUERY_KEYS.user(queryKey),
    queryFn: () => UsersService.getUser(),
    enabled: !!queryKey,
  });

  const isLoggedIn = Boolean(user?.email);

  return { user, isPendingUser, isLoggedIn };
};
