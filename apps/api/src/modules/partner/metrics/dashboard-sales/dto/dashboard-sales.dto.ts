/**
 * Dashboard 2: Vendas & Receita
 * Rota: /partner/stores/:storeId/metrics/sales
 * Período suportado: week, month, quarter
 */
export class DashboardSalesDto {
  // Métricas Principais (1-4)
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
