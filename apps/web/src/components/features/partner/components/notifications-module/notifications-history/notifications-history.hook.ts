'use client';
import { useNotificationsMutations } from '@/hooks/use-mutations/use-notifications-mutations/use-notifications-mutations.hook';
import { useNotificationsQuery } from '@/hooks/use-query/use-notifications-query/use-notifications-query.hook';
import { usePartnerStore } from '@/store';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useNotificationsHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [page, setPage] = useState(1);

  const { activeStore } = usePartnerStore();

  useEffect(() => {
    setPage(1);
  }, [searchQuery, filterType, filterStatus]);

  const notificationHistoryParams = useMemo(
    () => ({
      page,
      limit: 5,
      type: filterType,
      status: filterStatus,
      search: searchQuery,
    }),
    [page, filterType, filterStatus, searchQuery],
  );

  const {
    notificationsHistory,
    notificationsMeta,
    isNotificationsHistoryLoading,
  } = useNotificationsQuery({
    storeId: activeStore.id,
    includeNotificationsHistory: true,
    notificationHistoryParams,
  });

  const {
    updateNotificationsHistoryMutation,
    deleteNotificationsHistoryMutation,
    markAllAsReadNotificationsHistoryMutation,
  } = useNotificationsMutations({
    storeId: activeStore.id,
    notificationHistoryParams,
  });

  const markAsRead = useCallback(
    (notificationId: string) => {
      updateNotificationsHistoryMutation.mutate({
        id: notificationId,
        read: true,
      });
    },
    [updateNotificationsHistoryMutation],
  );

  const markAllAsRead = useCallback(() => {
    markAllAsReadNotificationsHistoryMutation.mutate();
  }, [markAllAsReadNotificationsHistoryMutation]);

  const deleteNotification = useCallback(
    (notificationId: string) => {
      deleteNotificationsHistoryMutation.mutate(notificationId);
    },
    [deleteNotificationsHistoryMutation],
  );

  const unreadCount = useMemo(
    () => notificationsHistory.filter((n) => !n.read).length,
    [notificationsHistory],
  );

  return {
    notifications: notificationsHistory,
    unreadCount,
    searchQuery,
    filterType,
    filterStatus,
    setSearchQuery,
    setFilterType,
    setFilterStatus,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    page,
    setPage,
    totalPages: notificationsMeta?.totalPages || 1,
    isLoading: isNotificationsHistoryLoading,
  };
};
