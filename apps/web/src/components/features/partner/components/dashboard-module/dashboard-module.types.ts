export type TStoreMetrics = {
  todayAppointments: number;
  weeklyRevenue: number;
  monthlyTotal: number;
  averageRating: number;
  pendingBookings: number;
  completedToday: number;
};

export type TRecentActivity = {
  id: number;
  type: 'booking' | 'completion' | 'cancellation';
  message: string;
  time: string;
  status: 'new' | 'completed' | 'cancelled';
};

export type TDashboardOverviewHookReturn = {
  storeMetrics: TStoreMetrics;
  recentActivity: TRecentActivity[];
};
