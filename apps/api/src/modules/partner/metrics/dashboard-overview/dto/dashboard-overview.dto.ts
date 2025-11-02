/**
 * Dashboard 1: Visão Geral
 * Rota: /partner/stores/:storeId/metrics/overview
 */
export class DashboardOverviewDto {
  // Métricas Principais (1-4)
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

  // Métricas Secundárias (5-10)
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
