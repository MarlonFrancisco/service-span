import { create } from 'zustand';
import {
  INITIAL_METRICS,
  MOCK_PERFORMANCE_DATA,
  MOCK_RECENT_ACTIVITY,
  MOCK_UPCOMING_APPOINTMENTS,
} from './dashboard.constants';
import type { IDashboardStore, IStoreMetrics } from './dashboard.types';

export const useDashboardStore = create<IDashboardStore>((set) => ({
  // State
  metrics: INITIAL_METRICS,
  performanceData: MOCK_PERFORMANCE_DATA,
  recentActivity: MOCK_RECENT_ACTIVITY,
  upcomingAppointments: MOCK_UPCOMING_APPOINTMENTS,

  // Actions
  setMetrics: (metrics: Partial<IStoreMetrics>) => {
    set((state) => ({
      metrics: { ...state.metrics, ...metrics },
    }));
  },

  refreshDashboard: () => {
    // TODO: Implementar refresh com API
    set({
      metrics: INITIAL_METRICS,
      performanceData: MOCK_PERFORMANCE_DATA,
      recentActivity: MOCK_RECENT_ACTIVITY,
      upcomingAppointments: MOCK_UPCOMING_APPOINTMENTS,
    });
  },
}));
