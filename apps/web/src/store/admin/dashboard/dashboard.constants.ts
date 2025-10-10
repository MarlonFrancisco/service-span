import type { IPerformanceData, IStoreMetrics } from './dashboard.types';

export const INITIAL_METRICS: IStoreMetrics = {
  todayAppointments: 8,
  weeklyRevenue: 3250,
  monthlyTotal: 147,
  averageRating: 4.7,
  pendingBookings: 3,
  completedToday: 5,
  totalCustomers: 342,
  growthRate: 18,
};

export const MOCK_PERFORMANCE_DATA: IPerformanceData[] = [
  { day: 'Seg', appointments: 12, revenue: 580 },
  { day: 'Ter', appointments: 15, revenue: 720 },
  { day: 'Qua', appointments: 10, revenue: 490 },
  { day: 'Qui', appointments: 18, revenue: 850 },
  { day: 'Sex', appointments: 22, revenue: 1050 },
  { day: 'Sáb', appointments: 28, revenue: 1340 },
  { day: 'Dom', appointments: 14, revenue: 670 },
];
