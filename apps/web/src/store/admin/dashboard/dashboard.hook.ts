import { useDashboardStore } from './dashboard.store';

export const useDashboard = () => {
  const {
    metrics,
    performanceData,
    recentActivity,
    upcomingAppointments,
    setMetrics,
    refreshDashboard,
  } = useDashboardStore();

  return {
    metrics,
    performanceData,
    recentActivity,
    upcomingAppointments,
    setMetrics,
    refreshDashboard,
  };
};
