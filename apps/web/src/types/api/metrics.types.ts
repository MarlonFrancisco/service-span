export type PeriodType = 'today' | 'week' | 'month' | 'quarter';

/**
 * Dashboard 1: Visão Geral
 * Corresponde ao DashboardOverviewDto do backend
 */
export interface IDashboardOverview {
  weeklyRevenue: {
    value: number;
    previousValue: number;
    percentageChange: number;
    absoluteChange: number;
  };

  occupationRate: {
    value: number;
    previousValue: number;
    percentageChange: number;
  };

  averageTicket: {
    value: number;
    previousValue: number;
    absoluteChange: number;
  };

  averageRating: {
    value: number;
    previousValue: number;
    reviewCount: number;
  };

  newCustomers: number;

  recurringCustomers: number;

  cancellationRate: {
    value: number;
  };

  conversionRate: {
    value: number;
  };

  peakHours: {
    start: string;
    end: string;
  };

  // Dados Temporais (11-12)
  appointmentsByDay: Array<{
    day: 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb' | 'Dom';
    appointments: number;
    revenue: number;
    completed: number;
    cancelled: number;
  }>;

  topServices: Array<{
    id: string;
    name: string;
    bookings: number;
    revenue: number;
  }>;
}

export interface IDashboardSales {
  revenue: {
    value: number;
    previousValue: number;
    percentageChange: number;
    absoluteChange: number;
  };

  averageTicket: {
    value: number;
    previousValue: number;
    percentageChange: number;
    absoluteChange: number;
  };

  conversionRate: {
    value: number;
    previousValue: number;
    percentageChange: number;
    variationInPoints: number;
  };

  revenuePerHour: {
    value: number;
    previousValue: number;
    percentageChange: number;
  };

  // Métricas de Meta (5)
  goal: {
    current: number;
    target: number;
    percentage: number;
    remaining: number;
    daysRemaining: number;
  };

  // Dados Temporais (6-7)
  revenueEvolution: Array<{
    month: string;
    revenue: number;
    goal: number;
    appointments: number;
  }>;

  revenueByDayOfWeek: Array<{
    day: 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb' | 'Dom';
    averageRevenue: number;
    averageTicket: number;
    appointments: number;
  }>;

  // Métricas Categóricas (8-10)
  revenueByCategory: Array<{
    id: string;
    name: string;
    revenue: number;
    growthPercentage: number;
  }>;

  topServices: Array<{
    id: string;
    name: string;
    revenue: number;
    appointments: number;
    percentageOfTotal: number;
    growthPercentage: number;
  }>;

  profitableHours: Array<{
    hour: string;
    revenue: number;
    utilizationRate: number;
  }>;

  // Insights
  insights: {
    mostProfitableDay: {
      day: 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb' | 'Dom';
      averageRevenue: number;
    };
    opportunities: string[];
  };
}
