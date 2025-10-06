'use client';
import { useMemo } from 'react';
import type { TDashboardOverviewHookReturn } from './dashboard-module.types';

export const useDashboardModule = (): TDashboardOverviewHookReturn => {
  const storeMetrics = useMemo(
    () => ({
      todayAppointments: 8,
      weeklyRevenue: 3250,
      monthlyTotal: 147,
      averageRating: 4.7,
      pendingBookings: 3,
      completedToday: 5,
    }),
    [],
  );

  const recentActivity = useMemo(
    () => [
      {
        id: 1,
        type: 'booking' as const,
        message: 'Novo agendamento - Maria Silva',
        time: '2 min atrás',
        status: 'new' as const,
      },
      {
        id: 2,
        type: 'completion' as const,
        message: 'Serviço concluído - João Santos',
        time: '15 min atrás',
        status: 'completed' as const,
      },
      {
        id: 3,
        type: 'cancellation' as const,
        message: 'Cancelamento - Ana Costa',
        time: '1 hora atrás',
        status: 'cancelled' as const,
      },
    ],
    [],
  );

  return {
    storeMetrics,
    recentActivity,
  };
};
