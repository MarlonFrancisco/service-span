import type { TProfileTab } from '../../../../profile.types';

export type TProfileStatsConfig = {
  totalBookings: number;
  upcomingCount: number;
  favoritesCount: number;
  onStatClick: (tab: TProfileTab) => void;
};
