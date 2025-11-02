/**
 * Dashboard 3: Operacional
 * Rota: /partner/stores/:storeId/metrics/operational
 * Período suportado: week, month, quarter
 */
export class DashboardOperationalDto {
  // Métricas Principais (1-4)
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
    day: 'Dom' | 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb';
    totalCapacity: number;
    usedCapacity: number;
    emptyCapacity: number;
    utilizationPercentage: number; // percentagem de ocupação do dia
    isOpen: boolean; // se a loja está aberta neste dia
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
    hours: string[]; // ["8h", "9h", "10h", ...] baseado no horário de funcionamento
    data: Array<{
      day: 'Dom' | 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb';
      values: number[]; // percentagem de ocupação para cada hora (0-100)
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
