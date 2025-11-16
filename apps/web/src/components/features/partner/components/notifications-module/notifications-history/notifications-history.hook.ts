'use client';
import { useNotificationsStore } from '@/store';
import { INotificationsHistory } from '@/types/api/stores.types';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

const MOCK_NOTIFICATIONS: INotificationsHistory[] = [
  {
    id: '1',
    type: 'booking',
    title: 'Novo Agendamento',
    message: 'Ana Silva agendou um Corte Feminino para amanhã às 14:00',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    recipient: 'Ana Silva',
    status: 'sent',
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Lembrete Enviado',
    message:
      'Lembrete por SMS enviado para Carlos Moreira sobre agendamento de hoje',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
    recipient: 'Carlos Moreira',
    status: 'delivered',
  },
  {
    id: '3',
    type: 'cancellation',
    title: 'Agendamento Cancelado',
    message: 'Pedro Santos cancelou o agendamento de Barba para 15/10',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
    recipient: 'Pedro Santos',
    status: 'delivered',
  },
  {
    id: '4',
    type: 'system',
    title: 'Sistema Atualizado',
    message: 'Novos templates de notificação disponíveis',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    status: 'sent',
  },
  {
    id: '5',
    type: 'booking',
    title: 'Novo Agendamento',
    message: 'Julia Costa agendou uma Escova para quinta-feira às 16:00',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    read: true,
    recipient: 'Julia Costa',
    status: 'sent',
  },
  {
    id: '6',
    type: 'reminder',
    title: 'Lembrete Enviado',
    message: 'Lembrete por E-mail enviado para Maria Silva',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    read: true,
    recipient: 'Maria Silva',
    status: 'delivered',
  },
];

export type TUseNotificationsHistoryReturn = {
  notifications: INotificationsHistory[];
  unreadCount: number;
  searchQuery: string;
  filterType: string;
  filterStatus: string;
  setSearchQuery: (query: string) => void;
  setFilterType: (type: string) => void;
  setFilterStatus: (status: string) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
};

export const useNotificationsHistory = (): TUseNotificationsHistoryReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const notifications = useNotificationsStore(
    (state) => state.notificationsHistory,
  );

  const markAsRead = useCallback((notificationId: string) => {
    toast.success('Marcado como lido');
  }, []);

  const markAllAsRead = useCallback(() => {
    toast.success('Todas as notificações marcadas como lidas');
  }, []);

  const deleteNotification = useCallback((notificationId: string) => {
    toast.success('Notificação excluída');
  }, []);

  const filteredNotifications = useMemo(
    () =>
      notifications.filter((notification) => {
        const matchesSearch =
          notification.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          notification.message
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          notification.recipient
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesType =
          filterType === 'all' || notification.type === filterType;
        const matchesStatus =
          filterStatus === 'all' || notification.status === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
      }),
    [notifications, searchQuery, filterType, filterStatus],
  );

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  return {
    notifications: filteredNotifications,
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
  };
};
