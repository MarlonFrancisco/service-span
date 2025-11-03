import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../../stores/schedule/schedule.entity';
import { Store } from '../../stores/store.entity';
import { Review } from '../../stores/review/review.entity';
import {
  AverageLTV,
  CustomerBase,
  CustomerEvolution,
  DashboardCustomersDto,
  LTVBySegment,
  NPSScore,
  RetentionRate,
  TopVIPCustomer,
} from './dto/dashboard-customers.dto';

type PeriodType = 'week' | 'month' | 'quarter';

interface DateRange {
  start: Date;
  end: Date;
}

interface CustomerData {
  userId: string;
  userName: string;
  totalVisits: number;
  totalSpent: number;
  firstVisit: Date;
  lastVisit: Date;
  completedVisits: number;
  monthlyVisits: number;
}

@Injectable()
export class DashboardCustomersService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  /**
   * Dashboard 3: Métricas de Clientes
   * Calcula todas as métricas relacionadas aos clientes
   * @param storeId - ID da loja
   * @param period - Período para análise: 'week' (esta semana), 'month' (este mês), 'quarter' (trimestre)
   */
  async getDashboardCustomers(
    storeId: string,
    period: PeriodType = 'month',
  ): Promise<DashboardCustomersDto> {
    const store = await this.storeRepository.findOne({
      where: { id: storeId },
    });

    if (!store) {
      throw new Error('Store not found');
    }

    // Calcular períodos
    const now = new Date();
    const currentPeriod = this.getPeriodDateRange(now, period);
    const previousPeriod = this.getPeriodDateRange(
      this.getPreviousPeriodStart(now, period),
      period,
    );

    // Buscar todos os agendamentos da loja
    const allSchedules = await this.scheduleRepository.find({
      where: { store: { id: storeId } },
      relations: ['user', 'service'],
      order: { date: 'ASC' },
    });

    // Buscar reviews
    const allReviews = await this.reviewRepository.find({
      where: { store: { id: storeId } },
      relations: ['user'],
    });

    // Calcular métricas principais
    const customerBase = await this.calculateCustomerBase(
      allSchedules,
      currentPeriod,
      previousPeriod,
    );

    const retentionRate = await this.calculateRetentionRate(
      allSchedules,
      currentPeriod,
      previousPeriod,
    );

    const averageLTV = await this.calculateAverageLTV(
      allSchedules,
      currentPeriod,
      previousPeriod,
    );

    const npsScore = await this.calculateNPSScore(
      allReviews,
      currentPeriod,
      previousPeriod,
    );

    // Métricas temporais
    const customerEvolution = await this.calculateCustomerEvolution(
      allSchedules,
      now,
    );

    // Métricas de retenção
    const ltvBySegment = await this.calculateLTVBySegment(allSchedules);
    const topVIPCustomers = await this.calculateTopVIPCustomers(allSchedules);

    return {
      customerBase,
      retentionRate,
      averageLTV,
      npsScore,
      customerEvolution,
      ltvBySegment,
      topVIPCustomers,
    };
  }

  /**
   * 1. Base de Clientes
   * Total de clientes únicos cadastrados
   */
  private async calculateCustomerBase(
    allSchedules: Schedule[],
    currentPeriod: DateRange,
    previousPeriod: DateRange,
  ): Promise<CustomerBase> {
    // Total de clientes únicos até o final do período atual
    const uniqueCustomersUntilCurrent = new Set(
      allSchedules
        .filter((s) => s.user && new Date(s.date) <= currentPeriod.end)
        .map((s) => s.user.id),
    );

    // Total de clientes únicos até o final do período anterior
    const uniqueCustomersUntilPrevious = new Set(
      allSchedules
        .filter((s) => s.user && new Date(s.date) <= previousPeriod.end)
        .map((s) => s.user.id),
    );

    const currentValue = uniqueCustomersUntilCurrent.size;
    const previousValue = uniqueCustomersUntilPrevious.size;

    // Novos clientes no período atual
    const newCustomersInPeriod = allSchedules.filter((s) => {
      if (!s.user) return false;
      // Primeira visita deste cliente
      const firstVisit = allSchedules
        .filter((sch) => sch.user?.id === s.user.id)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
      const firstVisitDate = new Date(firstVisit.date);
      return (
        firstVisitDate >= currentPeriod.start &&
        firstVisitDate <= currentPeriod.end
      );
    });

    const uniqueNewCustomers = new Set(
      newCustomersInPeriod.map((s) => s.user.id),
    ).size;

    const percentageChange =
      previousValue > 0
        ? parseFloat(
            (((currentValue - previousValue) / previousValue) * 100).toFixed(1),
          )
        : 0;

    return {
      value: currentValue,
      comparison: {
        percentageChange,
        newCustomers: uniqueNewCustomers,
      },
    };
  }

  /**
   * 2. Taxa de Retenção
   * % de clientes que retornaram no período
   */
  private async calculateRetentionRate(
    allSchedules: Schedule[],
    currentPeriod: DateRange,
    previousPeriod: DateRange,
  ): Promise<RetentionRate> {
    // Clientes que compraram no período anterior
    const previousCustomers = new Set(
      allSchedules
        .filter(
          (s) =>
            s.user &&
            s.status === 'completed' &&
            new Date(s.date) >= previousPeriod.start &&
            new Date(s.date) <= previousPeriod.end,
        )
        .map((s) => s.user.id),
    );

    // Clientes do período anterior que retornaram no período atual
    const returnedCustomers = new Set(
      allSchedules
        .filter(
          (s) =>
            s.user &&
            s.status === 'completed' &&
            new Date(s.date) >= currentPeriod.start &&
            new Date(s.date) <= currentPeriod.end &&
            previousCustomers.has(s.user.id),
        )
        .map((s) => s.user.id),
    );

    const currentRate =
      previousCustomers.size > 0
        ? (returnedCustomers.size / previousCustomers.size) * 100
        : 0;

    // Calcular taxa do período anterior também
    const beforePreviousPeriod = this.getPeriodDateRange(
      this.getPreviousPeriodStart(previousPeriod.start, 'month'),
      'month',
    );

    const beforePreviousCustomers = new Set(
      allSchedules
        .filter(
          (s) =>
            s.user &&
            s.status === 'completed' &&
            new Date(s.date) >= beforePreviousPeriod.start &&
            new Date(s.date) <= beforePreviousPeriod.end,
        )
        .map((s) => s.user.id),
    );

    const returnedToPrevious = new Set(
      allSchedules
        .filter(
          (s) =>
            s.user &&
            s.status === 'completed' &&
            new Date(s.date) >= previousPeriod.start &&
            new Date(s.date) <= previousPeriod.end &&
            beforePreviousCustomers.has(s.user.id),
        )
        .map((s) => s.user.id),
    );

    const previousRate =
      beforePreviousCustomers.size > 0
        ? (returnedToPrevious.size / beforePreviousCustomers.size) * 100
        : 0;

    const percentageChange = parseFloat((currentRate - previousRate).toFixed(1));

    // Classificação da taxa de retenção
    let context = 'Baixo';
    if (currentRate >= 80) context = 'Excelente';
    else if (currentRate >= 60) context = 'Bom';
    else if (currentRate >= 40) context = 'Regular';

    return {
      value: parseFloat(currentRate.toFixed(1)),
      comparison: {
        percentageChange,
      },
      context,
    };
  }

  /**
   * 3. LTV Médio (Lifetime Value)
   * Valor médio gerado por cliente durante seu ciclo de vida
   */
  private async calculateAverageLTV(
    allSchedules: Schedule[],
    currentPeriod: DateRange,
    previousPeriod: DateRange,
  ): Promise<AverageLTV> {
    // Calcular LTV por cliente (total gasto / número de clientes)
    const customerSpending = new Map<string, number>();

    allSchedules
      .filter(
        (s) =>
          s.user &&
          s.status === 'completed' &&
          new Date(s.date) <= currentPeriod.end,
      )
      .forEach((schedule) => {
        const userId = schedule.user.id;
        const spent = customerSpending.get(userId) || 0;
        customerSpending.set(userId, spent + (schedule.service?.price || 0));
      });

    const totalCustomers = customerSpending.size;
    const totalRevenue = Array.from(customerSpending.values()).reduce(
      (sum, val) => sum + val,
      0,
    );
    const currentLTV = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

    // Calcular LTV do período anterior
    const previousCustomerSpending = new Map<string, number>();

    allSchedules
      .filter(
        (s) =>
          s.user &&
          s.status === 'completed' &&
          new Date(s.date) <= previousPeriod.end,
      )
      .forEach((schedule) => {
        const userId = schedule.user.id;
        const spent = previousCustomerSpending.get(userId) || 0;
        previousCustomerSpending.set(
          userId,
          spent + (schedule.service?.price || 0),
        );
      });

    const previousTotalCustomers = previousCustomerSpending.size;
    const previousTotalRevenue = Array.from(
      previousCustomerSpending.values(),
    ).reduce((sum, val) => sum + val, 0);
    const previousLTV =
      previousTotalCustomers > 0
        ? previousTotalRevenue / previousTotalCustomers
        : 0;

    const percentageChange =
      previousLTV > 0
        ? parseFloat(
            (((currentLTV - previousLTV) / previousLTV) * 100).toFixed(1),
          )
        : 0;

    // CAC simplificado (assumindo custo de marketing fixo por cliente novo)
    const cac = 50; // Valor exemplo em R$

    return {
      value: Math.round(currentLTV),
      comparison: {
        percentageChange,
      },
      cac,
    };
  }

  /**
   * 4. NPS Score
   * Net Promoter Score baseado nas avaliações (0-5)
   */
  private async calculateNPSScore(
    allReviews: Review[],
    currentPeriod: DateRange,
    previousPeriod: DateRange,
  ): Promise<NPSScore> {
    // Reviews do período atual
    const currentReviews = allReviews.filter((r) => {
      const reviewDate = new Date(r.createdAt);
      return reviewDate >= currentPeriod.start && reviewDate <= currentPeriod.end;
    });

    // Reviews do período anterior
    const previousReviews = allReviews.filter((r) => {
      const reviewDate = new Date(r.createdAt);
      return (
        reviewDate >= previousPeriod.start && reviewDate <= previousPeriod.end
      );
    });

    const currentScore =
      currentReviews.length > 0
        ? currentReviews.reduce((sum, r) => sum + r.rating, 0) /
          currentReviews.length
        : 0;

    const previousScore =
      previousReviews.length > 0
        ? previousReviews.reduce((sum, r) => sum + r.rating, 0) /
          previousReviews.length
        : 0;

    const absoluteChange = parseFloat((currentScore - previousScore).toFixed(1));

    return {
      value: parseFloat(currentScore.toFixed(1)),
      comparison: {
        absoluteChange,
      },
      reviewCount: currentReviews.length,
    };
  }

  /**
   * 5. Evolução de Clientes (Últimos 6 meses)
   */
  private async calculateCustomerEvolution(
    allSchedules: Schedule[],
    referenceDate: Date,
  ): Promise<CustomerEvolution[]> {
    const months = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    const result: CustomerEvolution[] = [];

    // Últimos 6 meses
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(referenceDate);
      monthDate.setMonth(monthDate.getMonth() - i);

      const monthStart = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth(),
        1,
      );
      const monthEnd = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth() + 1,
        0,
      );
      monthEnd.setHours(23, 59, 59, 999);

      // Schedules do mês
      const monthSchedules = allSchedules.filter((s) => {
        const scheduleDate = new Date(s.date);
        return scheduleDate >= monthStart && scheduleDate <= monthEnd;
      });

      // Novos clientes: primeira compra foi neste mês
      const newCustomers = new Set(
        monthSchedules.filter((s) => {
          if (!s.user) return false;
          const userSchedules = allSchedules
            .filter((sch) => sch.user?.id === s.user.id)
            .sort(
              (a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime(),
            );
          const firstSchedule = userSchedules[0];
          const firstDate = new Date(firstSchedule.date);
          return firstDate >= monthStart && firstDate <= monthEnd;
        }).map((s) => s.user.id),
      ).size;

      // Clientes recorrentes: compraram neste mês e já tinham comprado antes
      const recurringCustomers = new Set(
        monthSchedules.filter((s) => {
          if (!s.user) return false;
          const userSchedules = allSchedules
            .filter((sch) => sch.user?.id === s.user.id)
            .sort(
              (a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime(),
            );
          const firstSchedule = userSchedules[0];
          const firstDate = new Date(firstSchedule.date);
          return firstDate < monthStart;
        }).map((s) => s.user.id),
      ).size;

      // Churn: clientes que compraram no mês anterior mas não neste mês
      const previousMonthStart = new Date(monthStart);
      previousMonthStart.setMonth(previousMonthStart.getMonth() - 1);
      const previousMonthEnd = new Date(monthStart);
      previousMonthEnd.setDate(previousMonthEnd.getDate() - 1);

      const previousMonthCustomers = new Set(
        allSchedules
          .filter((s) => {
            if (!s.user || s.status !== 'completed') return false;
            const scheduleDate = new Date(s.date);
            return (
              scheduleDate >= previousMonthStart &&
              scheduleDate <= previousMonthEnd
            );
          })
          .map((s) => s.user.id),
      );

      const currentMonthCustomers = new Set(
        monthSchedules
          .filter((s) => s.user && s.status === 'completed')
          .map((s) => s.user.id),
      );

      let churn = 0;
      previousMonthCustomers.forEach((customerId) => {
        if (!currentMonthCustomers.has(customerId)) {
          churn++;
        }
      });

      // Total de clientes únicos até este mês
      const totalCustomers = new Set(
        allSchedules
          .filter((s) => s.user && new Date(s.date) <= monthEnd)
          .map((s) => s.user.id),
      ).size;

      result.push({
        month: months[monthDate.getMonth()],
        newCustomers,
        recurringCustomers,
        churn,
        totalCustomers,
      });
    }

    return result;
  }

  /**
   * 6. Lifetime Value por Segmento
   * Segmentação de clientes por frequência de visitas
   */
  private async calculateLTVBySegment(
    allSchedules: Schedule[],
  ): Promise<LTVBySegment[]> {
    // Coletar dados de cada cliente
    const customerDataMap = new Map<string, CustomerData>();

    allSchedules
      .filter((s) => s.user)
      .forEach((schedule) => {
        const userId = schedule.user.id;
        const userName = `${schedule.user.firstName || ''} ${schedule.user.lastName || ''}`.trim();

        if (!customerDataMap.has(userId)) {
          customerDataMap.set(userId, {
            userId,
            userName,
            totalVisits: 0,
            totalSpent: 0,
            firstVisit: new Date(schedule.date),
            lastVisit: new Date(schedule.date),
            completedVisits: 0,
            monthlyVisits: 0,
          });
        }

        const data = customerDataMap.get(userId)!;
        data.totalVisits++;
        data.totalSpent += schedule.service?.price || 0;

        if (schedule.status === 'completed') {
          data.completedVisits++;
        }

        const scheduleDate = new Date(schedule.date);
        if (scheduleDate < data.firstVisit) {
          data.firstVisit = scheduleDate;
        }
        if (scheduleDate > data.lastVisit) {
          data.lastVisit = scheduleDate;
        }
      });

    // Calcular visitas mensais e segmentar
    const segments: Record<
      'VIPs' | 'Frequentes' | 'Regulares' | 'Ocasionais' | 'Novos',
      CustomerData[]
    > = {
      VIPs: [],
      Frequentes: [],
      Regulares: [],
      Ocasionais: [],
      Novos: [],
    };

    customerDataMap.forEach((data) => {
      // Calcular meses desde primeira visita
      const monthsSinceFirst =
        (data.lastVisit.getTime() - data.firstVisit.getTime()) /
        (1000 * 60 * 60 * 24 * 30);
      data.monthlyVisits =
        monthsSinceFirst > 0 ? data.totalVisits / monthsSinceFirst : 0;

      // Segmentar baseado em visitas mensais e total gasto
      if (data.totalSpent > 1000 || data.monthlyVisits >= 4) {
        segments.VIPs.push(data);
      } else if (data.monthlyVisits >= 2) {
        segments.Frequentes.push(data);
      } else if (data.monthlyVisits >= 1) {
        segments.Regulares.push(data);
      } else if (data.totalVisits >= 2) {
        segments.Ocasionais.push(data);
      } else {
        segments.Novos.push(data);
      }
    });

    // Calcular métricas por segmento
    const result: LTVBySegment[] = [];

    Object.entries(segments).forEach(([segment, customers]) => {
      if (customers.length === 0) {
        result.push({
          segment: segment as any,
          averageLTV: 0,
          customerCount: 0,
          averageMonthlyVisits: 0,
          retentionRate: 0,
        });
        return;
      }

      const averageLTV =
        customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length;

      const averageMonthlyVisits =
        customers.reduce((sum, c) => sum + c.monthlyVisits, 0) /
        customers.length;

      // Taxa de retenção: % de clientes que voltaram nos últimos 30 dias
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const activeCustomers = customers.filter(
        (c) => c.lastVisit >= thirtyDaysAgo,
      ).length;
      const retentionRate = (activeCustomers / customers.length) * 100;

      result.push({
        segment: segment as any,
        averageLTV: Math.round(averageLTV),
        customerCount: customers.length,
        averageMonthlyVisits: parseFloat(averageMonthlyVisits.toFixed(1)),
        retentionRate: parseFloat(retentionRate.toFixed(1)),
      });
    });

    return result;
  }

  /**
   * 9. Top 5 Clientes VIP
   * Clientes com maior valor gerado
   */
  private async calculateTopVIPCustomers(
    allSchedules: Schedule[],
  ): Promise<TopVIPCustomer[]> {
    const customerDataMap = new Map<string, CustomerData>();

    allSchedules
      .filter((s) => s.user)
      .forEach((schedule) => {
        const userId = schedule.user.id;
        const userName = `${schedule.user.firstName || ''} ${schedule.user.lastName || ''}`.trim();

        if (!customerDataMap.has(userId)) {
          customerDataMap.set(userId, {
            userId,
            userName,
            totalVisits: 0,
            totalSpent: 0,
            firstVisit: new Date(schedule.date),
            lastVisit: new Date(schedule.date),
            completedVisits: 0,
            monthlyVisits: 0,
          });
        }

        const data = customerDataMap.get(userId)!;
        data.totalVisits++;
        data.totalSpent += schedule.service?.price || 0;

        const scheduleDate = new Date(schedule.date);
        if (scheduleDate > data.lastVisit) {
          data.lastVisit = scheduleDate;
        }
      });

    // Ordenar por valor total gasto e pegar top 5
    const topCustomers = Array.from(customerDataMap.values())
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5)
      .map((data) => ({
        customerId: data.userId,
        customerName: data.userName || 'Cliente',
        visits: data.totalVisits,
        totalSpent: Math.round(data.totalSpent),
        lastVisit: data.lastVisit,
      }));

    return topCustomers;
  }

  /**
   * Obtém o range de datas para um período específico
   */
  private getPeriodDateRange(date: Date, period: PeriodType): DateRange {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    let start = new Date(d);
    let end = new Date(d);

    switch (period) {
      case 'week': {
        // Esta semana: de segunda até domingo
        const dayOfWeek = d.getDay();
        const diff = d.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        start = new Date(d.setDate(diff));
        start.setHours(0, 0, 0, 0);

        end = new Date(start);
        end.setDate(end.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        break;
      }

      case 'month': {
        // Este mês: do dia 1 até o último dia
        start = new Date(d.getFullYear(), d.getMonth(), 1);
        start.setHours(0, 0, 0, 0);

        end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        break;
      }

      case 'quarter': {
        // Trimestre: últimos 3 meses
        start = new Date(d.getFullYear(), d.getMonth() - 2, 1);
        start.setHours(0, 0, 0, 0);

        end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        break;
      }
    }

    return { start, end };
  }

  /**
   * Obtém o início do período anterior
   */
  private getPreviousPeriodStart(date: Date, period: PeriodType): Date {
    const d = new Date(date);

    switch (period) {
      case 'week':
        d.setDate(d.getDate() - 7);
        break;

      case 'month':
        d.setMonth(d.getMonth() - 1);
        break;

      case 'quarter':
        d.setMonth(d.getMonth() - 3);
        break;
    }

    return d;
  }
}
