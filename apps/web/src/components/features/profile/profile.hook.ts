import { useUserQuery } from '@/hooks/use-query/use-user-query';
import { useMemo, useState } from 'react';
import { TProfileTab } from './profile.types';

export const useProfile = () => {
  const { user, isPendingUser } = useUserQuery();
  const [activeTab, setActiveTab] = useState<TProfileTab>('bookings');

  const upcomingCount = useMemo(() => {
    return user?.schedules?.length ?? 0;
  }, [user?.schedules]);

  const favoritesCount = useMemo(() => {
    return user?.favorites?.length ?? 0;
  }, [user?.favorites]);

  return {
    activeTab,
    setActiveTab,
    user,
    isPendingUser,
    upcomingCount,
    favoritesCount,
  };
};
