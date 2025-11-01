import type { INotificationsHistory } from '@/types/api/stores.types';

export type TNotificationsHistoryProps = {
  notifications: INotificationsHistory[];
  unreadCount: number;
  searchQuery: string;
  filterType: string;
  filterStatus: string;
  onSearchChange: (query: string) => void;
  onFilterTypeChange: (type: string) => void;
  onFilterStatusChange: (status: string) => void;
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (notificationId: string) => void;
};
