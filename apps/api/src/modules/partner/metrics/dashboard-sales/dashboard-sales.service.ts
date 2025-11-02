import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Schedule } from '../../stores/schedule/schedule.entity';
import { Store } from '../../stores/store.entity';
import { DashboardSalesDto } from './dto/dashboard-sales.dto';

type PeriodType = 'week' | 'month' | 'quarter';

interface DateRange {
  start: Date;
  end: Date;
}

@Injectable()
export class DashboardSalesService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  /**
   * Dashboard 2: Vendas & Receita
   * Calcula todas as métricas de vendas e receita
   * @param storeId - ID da loja
   * @param period - Período para análise: 'week' (esta semana), 'month' (este mês), 'quarter' (este trimestre)
   */
  async getDashboardSales(
    storeId: string,
    period: PeriodType = 'month',
  ): Promise<DashboardSalesDto> {
    const store = await this.storeRepository.findOne({
      where: { id: storeId },
      relations: ['schedules', 'services', 'services.category'],
    });

    if (!store) {
      throw new Error('Store not found');
    }

    // Calcular períodos com base no tipo selecionado
    const now = new Date();
    const currentPeriod = this.getPeriodDateRange(now, period);
    const previousPeriod = this.getPeriodDateRange(
      this.getPreviousPeriodStart(now, period),
      period,
    );

    // Buscar agendamentos dos períodos
    const [currentSchedules, prevSchedules] = await Promise.all([
      this.scheduleRepository.find({
        where: {
          store: { id: storeId },
          date: Between(currentPeriod.start, currentPeriod.end),
        },
        relations: ['service', 'service.category', 'user'],
      }),
      this.scheduleRepository.find({
        where: {
          store: { id: storeId },
          date: Between(previousPeriod.start, previousPeriod.end),
        },
        relations: ['service', 'service.category'],
      }),
    ]);

    // Calcular métricas principais
    const revenue = this.calculateRevenue(currentSchedules, prevSchedules);

    const averageTicket = this.calculateAverageTicket(
      currentSchedules,
      prevSchedules,
    );

    const conversionRate = this.calculateConversionRate(
      currentSchedules,
      prevSchedules,
    );

    const revenuePerHour = this.calculateRevenuePerHour(
      currentSchedules,
      prevSchedules,
      store,
    );

    const goal = this.calculateGoal(
      revenue.value,
      currentPeriod.end,
      store,
      period,
    );

    // Dados temporais
    const revenueEvolution = await this.calculateRevenueEvolution(storeId);
    const revenueByDayOfWeek =
      this.calculateRevenueByDayOfWeek(currentSchedules);
    const revenueByCategory = this.calculateRevenueByCategory(
      currentSchedules,
      prevSchedules,
    );
    const topServices = this.calculateTopServices(
      currentSchedules,
      prevSchedules,
      revenue.value,
    );
    const profitableHours = this.calculateProfitableHours(currentSchedules);

    // Insights
    const insights = this.generateInsights(revenueByDayOfWeek);

    return {
      revenue,
      averageTicket,
      conversionRate,
      revenuePerHour,
      goal,
      revenueEvolution,
      revenueByDayOfWeek,
      revenueByCategory,
      topServices,
      profitableHours,
      insights,
    };
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
        // Este trimestre: começando no primeiro mês do trimestre
        const month = d.getMonth();
        const quarterStart = Math.floor(month / 3) * 3;
        start = new Date(d.getFullYear(), quarterStart, 1);
        start.setHours(0, 0, 0, 0);

        end = new Date(d.getFullYear(), quarterStart + 3, 0);
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

  private calculateRevenue(
    currentSchedules: Schedule[],
    prevSchedules: Schedule[],
  ) {
    const completedCurrent = currentSchedules.filter(
      (s) => s.status === 'completed',
    );
    const completedPrev = prevSchedules.filter((s) => s.status === 'completed');

    const currentRevenue = completedCurrent.reduce((sum, schedule) => {
      return sum + (schedule.service?.price || 0);
    }, 0);

    const prevRevenue = completedPrev.reduce((sum, schedule) => {
      return sum + (schedule.service?.price || 0);
    }, 0);

    const absoluteChange = currentRevenue - prevRevenue;
    const percentageChange =
      prevRevenue > 0
        ? parseFloat(((absoluteChange / prevRevenue) * 100).toFixed(1))
        : 0;

    return {
      value: currentRevenue,
      previousValue: prevRevenue,
      percentageChange,
      absoluteChange,
    };
  }

  private calculateAverageTicket(
    currentSchedules: Schedule[],
    prevSchedules: Schedule[],
  ) {
    const completedCurrent = currentSchedules.filter(
      (s) => s.status === 'completed',
    );
    const completedPrev = prevSchedules.filter((s) => s.status === 'completed');

    const currentRevenue = completedCurrent.reduce((sum, schedule) => {
      return sum + (schedule.service?.price || 0);
    }, 0);
    const currentTicket =
      completedCurrent.length > 0
        ? currentRevenue / completedCurrent.length
        : 0;

    const prevRevenue = completedPrev.reduce((sum, schedule) => {
      return sum + (schedule.service?.price || 0);
    }, 0);
    const prevTicket =
      completedPrev.length > 0 ? prevRevenue / completedPrev.length : 0;

    const absoluteChange = currentTicket - prevTicket;
    const percentageChange =
      prevTicket > 0
        ? parseFloat(((absoluteChange / prevTicket) * 100).toFixed(1))
        : 0;

    return {
      value: Math.round(currentTicket),
      previousValue: Math.round(prevTicket),
      percentageChange,
      absoluteChange: Math.round(absoluteChange),
    };
  }

  private calculateConversionRate(
    currentSchedules: Schedule[],
    prevSchedules: Schedule[],
  ) {
    // Conversão = agendamentos completados / total de agendamentos
    const completedCurrent = currentSchedules.filter(
      (s) => s.status === 'completed',
    ).length;
    const totalCurrent = currentSchedules.length;
    const currentRate =
      totalCurrent > 0 ? (completedCurrent / totalCurrent) * 100 : 0;

    const completedPrev = prevSchedules.filter(
      (s) => s.status === 'completed',
    ).length;
    const totalPrev = prevSchedules.length;
    const prevRate = totalPrev > 0 ? (completedPrev / totalPrev) * 100 : 0;

    const variationInPoints = currentRate - prevRate;
    const percentageChange =
      prevRate > 0
        ? parseFloat(((variationInPoints / prevRate) * 100).toFixed(1))
        : 0;

    return {
      value: parseFloat(currentRate.toFixed(1)),
      previousValue: parseFloat(prevRate.toFixed(1)),
      percentageChange,
      variationInPoints: parseFloat(variationInPoints.toFixed(1)),
    };
  }

  private calculateRevenuePerHour(
    currentSchedules: Schedule[],
    prevSchedules: Schedule[],
    store: Store,
  ) {
    // Calcular horas de funcionamento no mês
    const hoursPerDay = this.getBusinessHours(store);
    const businessDaysPerMonth = 22; // Aproximadamente
    const totalHoursPerMonth = hoursPerDay * businessDaysPerMonth;

    const completedCurrent = currentSchedules.filter(
      (s) => s.status === 'completed',
    );
    const currentRevenue = completedCurrent.reduce((sum, schedule) => {
      return sum + (schedule.service?.price || 0);
    }, 0);
    const currentRevenuePerHour =
      totalHoursPerMonth > 0 ? currentRevenue / totalHoursPerMonth : 0;

    const completedPrev = prevSchedules.filter((s) => s.status === 'completed');
    const prevRevenue = completedPrev.reduce((sum, schedule) => {
      return sum + (schedule.service?.price || 0);
    }, 0);
    const prevRevenuePerHour =
      totalHoursPerMonth > 0 ? prevRevenue / totalHoursPerMonth : 0;

    const absoluteChange = currentRevenuePerHour - prevRevenuePerHour;
    const percentageChange =
      prevRevenuePerHour > 0
        ? parseFloat(((absoluteChange / prevRevenuePerHour) * 100).toFixed(1))
        : 0;

    return {
      value: Math.round(currentRevenuePerHour),
      previousValue: Math.round(prevRevenuePerHour),
      percentageChange,
    };
  }

  private calculateGoal(
    currentRevenue: number,
    periodEnd: Date,
    store: Store,
    period: PeriodType,
  ) {
    // Selecionar a meta correta baseada no período
    let target = 0;
    switch (period) {
      case 'week':
        target = store.weeklyGoal; // Meta padrão semanal
        break;
      case 'month':
        target = store.monthlyGoal; // Meta padrão mensal
        break;
      case 'quarter':
        target = store.quarterlyGoal; // Meta padrão trimestral
        break;
    }

    const daysRemaining = this.getDaysRemaining(periodEnd);
    const remaining = Math.max(target - currentRevenue, 0);
    const percentage = Math.round((currentRevenue / target) * 100);

    return {
      current: Math.round(currentRevenue),
      target,
      percentage,
      remaining: Math.round(remaining),
      daysRemaining,
    };
  }

  private async calculateRevenueEvolution(storeId: string) {
    // Pegar últimos 6 meses
    const evolution = [];
    const monthNames = [
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

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      );

      const schedules = await this.scheduleRepository.find({
        where: {
          store: { id: storeId },
          date: Between(monthStart, monthEnd),
          status: 'completed',
        },
        relations: ['service'],
      });

      const revenue = schedules.reduce((sum, schedule) => {
        return sum + (schedule.service?.price || 0);
      }, 0);

      evolution.push({
        month: monthNames[date.getMonth()],
        revenue: Math.round(revenue),
        goal: 15000,
        appointments: schedules.length,
      });
    }

    return evolution;
  }

  private calculateRevenueByDayOfWeek(schedules: Schedule[]): Array<{
    day: 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb' | 'Dom';
    averageRevenue: number;
    averageTicket: number;
    appointments: number;
  }> {
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] as const;
    const dayData = new Map<number, { revenue: number; count: number }>();

    // Inicializar todos os dias
    for (let i = 0; i < 7; i++) {
      dayData.set(i, { revenue: 0, count: 0 });
    }

    // Agrupar por dia da semana
    for (const schedule of schedules) {
      if (schedule.status === 'completed') {
        const date = new Date(schedule.date);
        const dayOfWeek = (date.getDay() + 6) % 7; // Converter para segunda = 0
        const current = dayData.get(dayOfWeek) || { revenue: 0, count: 0 };
        current.revenue += schedule.service?.price || 0;
        current.count++;
        dayData.set(dayOfWeek, current);
      }
    }

    // Construir resultado
    const result = [];
    for (let i = 0; i < 7; i++) {
      const data = dayData.get(i) || { revenue: 0, count: 0 };
      const averageRevenue = data.count > 0 ? data.revenue / data.count : 0;

      result.push({
        day: days[i],
        averageRevenue: Math.round(data.revenue),
        averageTicket: Math.round(averageRevenue),
        appointments: data.count,
      });
    }

    return result;
  }

  private calculateRevenueByCategory(
    currentSchedules: Schedule[],
    prevSchedules: Schedule[],
  ) {
    // Agrupar receita por categoria
    const currentByCategory = new Map<
      string,
      { name: string; revenue: number }
    >();
    const prevByCategory = new Map<string, number>();

    for (const schedule of currentSchedules) {
      if (schedule.service?.category && schedule.status === 'completed') {
        const catId = schedule.service.category.id;
        const catName = schedule.service.category.name;
        const current = currentByCategory.get(catId) || {
          name: catName,
          revenue: 0,
        };
        current.revenue += schedule.service.price || 0;
        currentByCategory.set(catId, current);
      }
    }

    for (const schedule of prevSchedules) {
      if (schedule.service?.category && schedule.status === 'completed') {
        const catId = schedule.service.category.id;
        const current = prevByCategory.get(catId) || 0;
        prevByCategory.set(catId, current + (schedule.service.price || 0));
      }
    }

    // Calcular crescimento
    const result = [];
    for (const [id, data] of currentByCategory) {
      const prevRevenue = prevByCategory.get(id) || 0;
      const absoluteChange = data.revenue - prevRevenue;
      const growthPercentage =
        prevRevenue > 0
          ? parseFloat(((absoluteChange / prevRevenue) * 100).toFixed(1))
          : 0;

      result.push({
        id,
        name: data.name,
        revenue: Math.round(data.revenue),
        growthPercentage,
      });
    }

    return result;
  }

  private calculateTopServices(
    currentSchedules: Schedule[],
    prevSchedules: Schedule[],
    totalRevenue: number,
  ) {
    // Agrupar serviços
    const currentServices = new Map<
      string,
      { name: string; revenue: number; count: number }
    >();
    const prevServices = new Map<string, number>();

    for (const schedule of currentSchedules) {
      if (schedule.service && schedule.status === 'completed') {
        const serviceId = schedule.service.id;
        const current = currentServices.get(serviceId) || {
          name: schedule.service.name,
          revenue: 0,
          count: 0,
        };
        current.revenue += schedule.service.price || 0;
        current.count++;
        currentServices.set(serviceId, current);
      }
    }

    for (const schedule of prevSchedules) {
      if (schedule.service && schedule.status === 'completed') {
        const serviceId = schedule.service.id;
        const current = prevServices.get(serviceId) || 0;
        prevServices.set(serviceId, current + (schedule.service.price || 0));
      }
    }

    // Calcular métricas e ordenar por receita
    const services = Array.from(currentServices.entries())
      .map(([id, data]) => {
        const prevRevenue = prevServices.get(id) || 0;
        const absoluteChange = data.revenue - prevRevenue;
        const growthPercentage =
          prevRevenue > 0
            ? parseFloat(((absoluteChange / prevRevenue) * 100).toFixed(1))
            : 0;
        const percentageOfTotal =
          totalRevenue > 0
            ? parseFloat(((data.revenue / totalRevenue) * 100).toFixed(1))
            : 0;

        return {
          id,
          name: data.name,
          revenue: Math.round(data.revenue),
          appointments: data.count,
          percentageOfTotal,
          growthPercentage,
        };
      })
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return services;
  }

  private calculateProfitableHours(schedules: Schedule[]) {
    const hours = new Map<string, { revenue: number; count: number }>();

    // Inicializar horários
    const timeSlots = ['09', '10', '11', '14', '15', '16', '17', '18'];
    for (const slot of timeSlots) {
      hours.set(slot, { revenue: 0, count: 0 });
    }

    // Agrupar por horário
    for (const schedule of schedules) {
      if (schedule.status === 'completed' && schedule.startTime) {
        const hour = schedule.startTime.substring(0, 2);
        const current = hours.get(hour) || { revenue: 0, count: 0 };
        current.revenue += schedule.service?.price || 0;
        current.count++;
        hours.set(hour, current);
      }
    }

    // Construir resultado
    const result = [];
    for (const slot of timeSlots) {
      const data = hours.get(slot) || { revenue: 0, count: 0 };
      const utilizationRate =
        schedules.length > 0
          ? parseFloat(((data.count / schedules.length) * 100).toFixed(1))
          : 0;

      result.push({
        hour: `${slot}h`,
        revenue: Math.round(data.revenue),
        utilizationRate,
      });
    }

    return result;
  }

  private generateInsights(
    revenueByDayOfWeek: Array<{
      day: string;
      averageRevenue: number;
      averageTicket: number;
      appointments: number;
    }>,
  ) {
    // Encontrar dia mais rentável
    const mostProfitableDay = revenueByDayOfWeek.reduce((prev, current) =>
      prev.averageRevenue > current.averageRevenue ? prev : current,
    );

    const opportunities = [];
    // Identificar dias com receita baixa
    const avgRevenue =
      revenueByDayOfWeek.reduce((sum, day) => sum + day.averageRevenue, 0) /
      revenueByDayOfWeek.length;

    for (const day of revenueByDayOfWeek) {
      if (day.averageRevenue < avgRevenue * 0.7) {
        opportunities.push(
          `${day.day} apresenta receita ${(((avgRevenue - day.averageRevenue) / avgRevenue) * 100).toFixed(0)}% abaixo da média`,
        );
      }
    }

    return {
      mostProfitableDay: {
        day: mostProfitableDay.day as
          | 'Seg'
          | 'Ter'
          | 'Qua'
          | 'Qui'
          | 'Sex'
          | 'Sáb'
          | 'Dom',
        averageRevenue: Math.round(mostProfitableDay.averageRevenue),
      },
      opportunities,
    };
  }

  private getBusinessHours(store: Store): number {
    if (!store.openTime || !store.closeTime) return 8; // Padrão: 8 horas

    const [openHour] = store.openTime.split(':').map(Number);
    const [closeHour] = store.closeTime.split(':').map(Number);

    let hours = closeHour - openHour;

    // Descontar intervalo de almoço se existir
    if (store.lunchStartTime && store.lunchEndTime) {
      const [lunchStartHour] = store.lunchStartTime.split(':').map(Number);
      const [lunchEndHour] = store.lunchEndTime.split(':').map(Number);
      hours -= lunchEndHour - lunchStartHour;
    }

    return Math.max(hours, 0);
  }

  private getDaysRemaining(monthEnd: Date): number {
    const now = new Date();
    const remaining = Math.max(
      Math.ceil((monthEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
      0,
    );
    return remaining;
  }
}
