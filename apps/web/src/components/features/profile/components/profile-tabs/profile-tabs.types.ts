import type { TProfileTab } from '../../profile.types';

export type TProfileTabsConfig = {
  activeTab: TProfileTab;
  onTabChange: (tab: TProfileTab) => void;
  upcomingCount: number;
  favoritesCount: number;
};
