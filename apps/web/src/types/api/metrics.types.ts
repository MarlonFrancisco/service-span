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

export interface IDashboardOperational {
  occupancyRate: {
    value: number;
    previousValue: number;
    percentageChange: number;
  };

  averageTime: {
    value: number; // minutos
    previousValue: number;
    percentageChange: number;
  };

  teamEfficiency: {
    value: number; // percentual
    previousValue: number;
    percentageChange: number;
  };

  punctualityRate: {
    value: number; // percentual
    previousValue: number;
    percentageChange: number;
    noShowRate: number; // percentual
  };

  // Métricas de Utilização (5)
  dailyCapacityUtilization: Array<{
    day: 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb' | 'Dom';
    totalCapacity: number;
    usedCapacity: number;
    emptyCapacity: number;
    revenue: number;
  }>;

  // Status dos Agendamentos (6)
  appointmentStatus: Array<{
    status: 'completed' | 'scheduled' | 'no-show' | 'cancelled';
    quantity: number;
    percentage: number;
  }>;

  // Duração Média por Serviço (7)
  serviceDuration: Array<{
    id: string;
    name: string;
    averageRealTime: number; // minutos
    plannedTime: number; // minutos
    variation: number; // minutos (real - planejado)
  }>;

  // Distribuição por Período do Dia (8)
  periodDistribution: Array<{
    period: 'morning' | 'afternoon' | 'night';
    label: string; // "Manhã (8h-12h)", "Tarde (12h-18h)", "Noite (18h-22h)"
    appointmentCount: number;
    percentage: number;
    trend: number; // percentagem vs período anterior
  }>;

  // Mapa de Calor - Ocupação por Horário e Dia (9)
  occupancyHeatMap: {
    hours: string[]; // ["8h", "9h", "10h", ...]
    data: Array<{
      day: 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb' | 'Dom';
      values: number[]; // percentagem de ocupação para cada hora
    }>;
  };

  // Oportunidades de Tempo Ocioso (10)
  idleTimeOpportunities: Array<{
    dayAndPeriod: string;
    emptyHours: number;
    potentialRevenue: number;
  }>;

  // Performance Detalhada por Profissional (11)
  professionalPerformance: Array<{
    id: string;
    name: string;
    appointmentCount: number;
    averageRating: number; // 0-5
    revenue: number;
    efficiency: number; // percentual
    punctualityRate: number; // percentual
    averageAttendanceTime: number; // minutos
    utilizationRate: number; // percentual
  }>;
}

/**
 * Dashboard 4: Clientes
 * Corresponde ao DashboardCustomersDto do backend
 */
export interface IDashboardCustomers {
  // Métricas do Header
  customerBase: {
    value: number;
    previousValue: number;
    percentageChange: number;
  };

  // Métricas dos Alertas/Oportunidades
  alerts: {
    birthdayCustomers: {
      quantity: number;
      potentialRevenue: number;
    };
    churnRisk: {
      quantity: number;
      ltvAtRisk: number;
    };
  };

  // Métricas Principais (4 Cards)
  retentionRate: {
    value: number; // percentual
    previousValue: number;
    percentageChange: number;
    classification: string; // "Excelente", "Boa", "Regular", "Ruim"
  };

  averageLTV: {
    value: number; // R$
    previousValue: number;
    percentageChange: number;
    cac: number; // Custo de Aquisição por Cliente em R$
  };

  npsScore: {
    value: number; // 0-5
    previousValue: number;
    absoluteChange: number;
    reviewCount: number;
  };

  // Métricas do Modo Visão Geral (overview)
  customerEvolution: Array<{
    month: string;
    newCustomers: number;
    recurringCustomers: number;
    churn: number;
  }>;

  ltvBySegment: Array<{
    segment: string;
    averageLTV: number;
    customerCount: number;
    averageMonthlyVisits: number;
    retentionRate: number; // percentual
  }>;

  topVIPCustomers: Array<{
    id: string;
    name: string;
    visitCount: number;
    totalSpent: number;
    lastVisit: string; // ISO date
  }>;

  // Métricas do Modo Segmentação (segments)
  rfmSegmentation: Array<{
    segment: 'Champions' | 'Loyal' | 'At Risk' | 'Lost';
    rfmScore: string;
    customerCount: number;
    totalRevenue: number;
  }>;

  preferencesBySegment: Array<{
    segment: string;
    preferences: Array<{
      serviceType: string;
      percentage: number;
    }>;
  }>;

  monthlyBirthdays: Array<{
    id: string;
    name: string;
    birthday: string; // ISO date
    segment: string;
    averageSpent: number;
  }>;

  // Métricas do Modo Churn Risk (churn)
  customersAtRisk: Array<{
    id: string;
    name: string;
    riskScore: number; // 0-100%
    lastVisit: string; // ISO date
    averageFrequency: string; // "1x por semana", "2x por mês"
    totalLTV: number;
    riskReason: string;
  }>;

  churnEvolution: {
    monthlyData: Array<{
      month: string;
      churnCount: number;
      totalCustomers: number;
    }>;
    currentChurnRate: number; // percentual
    averageChurnRate: number; // média dos últimos 6 meses
    potentialLTVAtRisk: number;
  };
}
