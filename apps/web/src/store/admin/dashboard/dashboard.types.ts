export interface IStoreMetrics {
  todayAppointments: number;
  weeklyRevenue: number;
  monthlyTotal: number;
  averageRating: number;
  pendingBookings: number;
  completedToday: number;
  totalCustomers: number;
  growthRate: number;
}

export interface IPerformanceData {
  day: string;
  appointments: number;
  revenue: number;
}

export interface IRecentActivity {
  id: number;
  type: 'booking' | 'completion' | 'cancellation';
  icon: React.ReactNode;
  message: string;
  service: string;
  time: string;
  status: 'new' | 'completed' | 'cancelled' | 'pending';
}

export interface IUpcomingAppointment {
  id: number;
  client: string;
  service: string;
  time: string;
  duration: string;
  badge: string;
  badgeColor: string;
}

export interface IDashboardStore {
  // State
  metrics: IStoreMetrics;
  performanceData: IPerformanceData[];
  recentActivity: IRecentActivity[];
  upcomingAppointments: IUpcomingAppointment[];

  // Actions
  setMetrics: (metrics: Partial<IStoreMetrics>) => void;
  refreshDashboard: () => void;
}
