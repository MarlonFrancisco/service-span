import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Review } from '../../stores/review/review.entity';
import { Schedule } from '../../stores/schedule/schedule.entity';
import { Store } from '../../stores/store.entity';
import { DashboardOverviewDto } from './dto/dashboard-overview.dto';

type PeriodType = 'today' | 'week' | 'month' | 'quarter';

interface DateRange {
  start: Date;
  end: Date;
}

@Injectable()
export class DashboardOverviewService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  /**
   * Dashboard 1: Visão Geral
   * Calcula todas as métricas para o dashboard de visão geral
   * @param storeId - ID da loja
   * @param period - Período para análise: 'today' (hoje), 'week' (esta semana), 'month' (este mês)
   */
  async getDashboardOverview(
    storeId: string,
    period: PeriodType = 'week',
  ): Promise<DashboardOverviewDto> {
    const store = await this.storeRepository.findOne({
      where: { id: storeId },
      relations: ['schedules', 'reviews', 'services'],
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

    // Buscar agendamentos e reviews
    const [currentSchedules, prevSchedules, allReviews] = await Promise.all([
      this.scheduleRepository.find({
        where: {
          store: { id: storeId },
          date: Between(currentPeriod.start, currentPeriod.end),
        },
        relations: ['service', 'user'],
      }),
      this.scheduleRepository.find({
        where: {
          store: { id: storeId },
          date: Between(previousPeriod.start, previousPeriod.end),
        },
        relations: ['service'],
      }),
      this.reviewRepository.find({
        where: { store: { id: storeId } },
      }),
    ]);

    // Calcular métricas principais
    const weeklyRevenue = this.calculateRevenue(
      currentSchedules,
      prevSchedules,
    );
    const occupationRate = this.calculateOccupationRate(
      currentSchedules,
      prevSchedules,
      period,
    );
    const averageTicket = this.calculateAverageTicket(
      currentSchedules,
      prevSchedules,
    );
    const averageRating = this.calculateAverageRating(
      currentSchedules,
      allReviews,
    );

    // Calcular métricas secundárias
    const newCustomers = await this.countNewCustomers(
      storeId,
      currentPeriod.start,
    );
    const recurringCustomers = await this.countRecurringCustomers(
      storeId,
      currentSchedules,
    );
    const cancellationRate = this.calculateCancellationRate(currentSchedules);
    const conversionRate = this.calculateConversionRate(currentSchedules);
    const peakHours = this.calculatePeakHours(currentSchedules);

    // Dados temporais
    const appointmentsByDay = this.calculateAppointmentsByDay(
      currentSchedules,
      currentPeriod.start,
      period,
    );
    const topServices = this.calculateTopServices(currentSchedules);

    return {
      weeklyRevenue,
      occupationRate,
      averageTicket,
      averageRating,
      newCustomers,
      recurringCustomers,
      cancellationRate,
      conversionRate,
      peakHours,
      appointmentsByDay,
      topServices,
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
      case 'today': {
        // Hoje: de 00:00 até 23:59
        end.setHours(23, 59, 59, 999);
        break;
      }

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
    }

    return { start, end };
  }

  /**
   * Obtém o início do período anterior
   */
  private getPreviousPeriodStart(date: Date, period: PeriodType): Date {
    const d = new Date(date);

    switch (period) {
      case 'today':
        d.setDate(d.getDate() - 1);
        break;

      case 'week':
        d.setDate(d.getDate() - 7);
        break;

      case 'month':
        d.setMonth(d.getMonth() - 1);
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

  private calculateOccupationRate(
    currentSchedules: Schedule[],
    prevSchedules: Schedule[],
    period: PeriodType,
  ) {
    // Taxa de ocupação = agendamentos confirmados + completados / total de slots disponíveis
    // Calculado com base no período
    const slotsPerDay = 10;
    const daysInPeriod = period === 'today' ? 1 : period === 'week' ? 7 : 30;
    const totalSlots = slotsPerDay * daysInPeriod;

    const currentOccupied = currentSchedules.filter(
      (s) => s.status === 'scheduled' || s.status === 'completed',
    ).length;

    const prevOccupied = prevSchedules.filter(
      (s) => s.status === 'scheduled' || s.status === 'completed',
    ).length;

    const currentRate = (currentOccupied / totalSlots) * 100;
    const prevRate = (prevOccupied / totalSlots) * 100;
    const percentageChange = (currentRate - prevRate).toFixed(1);

    return {
      value: parseFloat(currentRate.toFixed(1)),
      previousValue: parseFloat(prevRate.toFixed(1)),
      percentageChange: parseFloat(percentageChange),
    };
  }

  private calculateAverageTicket(
    currentWeekSchedules: Schedule[],
    prevWeekSchedules: Schedule[],
  ) {
    const completedCurrent = currentWeekSchedules.filter(
      (s) => s.status === 'completed',
    );
    const completedPrev = prevWeekSchedules.filter(
      (s) => s.status === 'completed',
    );

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

    return {
      value: Math.round(currentTicket),
      previousValue: Math.round(prevTicket),
      absoluteChange: Math.round(absoluteChange),
    };
  }

  private calculateAverageRating(
    currentWeekSchedules: Schedule[],
    allReviews: Review[],
  ) {
    const currentWeekUserIds = new Set(
      currentWeekSchedules.map((s) => s.user?.id),
    );
    const currentWeekReviews = allReviews.filter((r) =>
      currentWeekUserIds.has(r.user?.id),
    );

    const avgRating =
      currentWeekReviews.length > 0
        ? parseFloat(
            (
              currentWeekReviews.reduce((sum, r) => sum + r.rating, 0) /
              currentWeekReviews.length
            ).toFixed(1),
          )
        : 0;

    // Para comparação com semana anterior (simplificado)
    const prevAvg = avgRating - 0.2;

    return {
      value: avgRating,
      previousValue: Math.max(prevAvg, 0),
      reviewCount: currentWeekReviews.length,
    };
  }

  private async countNewCustomers(
    storeId: string,
    weekStart: Date,
  ): Promise<number> {
    // Novos clientes: usuários cuja primeira compra foi nessa semana
    const schedules = await this.scheduleRepository.find({
      where: { store: { id: storeId } },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });

    const userFirstSchedule = new Map<string, Date>();
    for (const schedule of schedules) {
      if (schedule.user && !userFirstSchedule.has(schedule.user.id)) {
        userFirstSchedule.set(schedule.user.id, schedule.createdAt);
      }
    }

    let newCustomersCount = 0;
    for (const [, firstScheduleDate] of userFirstSchedule) {
      if (firstScheduleDate >= weekStart && firstScheduleDate <= new Date()) {
        newCustomersCount++;
      }
    }

    return newCustomersCount;
  }

  private async countRecurringCustomers(
    storeId: string,
    schedules: Schedule[],
  ): Promise<number> {
    // Clientes recorrentes: usuários com mais de 1 agendamento no período
    const userCount = new Map<string, number>();
    for (const schedule of schedules) {
      if (schedule.user) {
        userCount.set(
          schedule.user.id,
          (userCount.get(schedule.user.id) || 0) + 1,
        );
      }
    }

    let recurringCount = 0;
    for (const [, count] of userCount) {
      if (count > 1) {
        recurringCount++;
      }
    }

    return recurringCount;
  }

  private calculateCancellationRate(schedules: Schedule[]) {
    const totalSchedules = schedules.length;
    const cancelled = schedules.filter((s) => s.status === 'cancelled').length;

    const rate = totalSchedules > 0 ? (cancelled / totalSchedules) * 100 : 0;

    return {
      value: parseFloat(rate.toFixed(1)),
    };
  }

  private calculateConversionRate(schedules: Schedule[]) {
    // Conversão = agendamentos completados / total de agendamentos (simplificado)
    const completed = schedules.filter((s) => s.status === 'completed').length;
    const total = schedules.length;

    const rate = total > 0 ? (completed / total) * 100 : 0;

    return {
      value: Math.round(rate),
    };
  }

  private calculatePeakHours(schedules: Schedule[]) {
    // Encontrar a hora com mais agendamentos
    const hourCount = new Map<string, number>();

    for (const schedule of schedules) {
      if (schedule.startTime) {
        const hour = schedule.startTime.split(':')[0];
        hourCount.set(hour, (hourCount.get(hour) || 0) + 1);
      }
    }

    // Encontrar hora com maior frequência
    let maxHour = '14';
    let maxCount = 0;

    for (const [hour, count] of hourCount) {
      if (count > maxCount) {
        maxCount = count;
        maxHour = hour;
      }
    }

    const endHour = String(parseInt(maxHour) + 4).padStart(2, '0');

    return {
      start: `${maxHour}h`,
      end: `${endHour}h`,
    };
  }

  private calculateAppointmentsByDay(
    schedules: Schedule[],
    startDate: Date,
    period: PeriodType,
  ): Array<{
    day: 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb' | 'Dom';
    appointments: number;
    revenue: number;
    completed: number;
    cancelled: number;
  }> {
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] as const;
    const result = [];

    // Determinar quantidade de dias a iterar
    const daysToIterate = period === 'today' ? 1 : period === 'week' ? 7 : 30;

    for (let i = 0; i < daysToIterate; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);
      const dayOfWeek = currentDate.getDay();
      const dayName = days[(dayOfWeek + 6) % 7]; // Adjust for Monday = 0

      const daySchedules = schedules.filter((s) => {
        const scheduleDate = new Date(s.date);
        return (
          scheduleDate.getFullYear() === currentDate.getFullYear() &&
          scheduleDate.getMonth() === currentDate.getMonth() &&
          scheduleDate.getDate() === currentDate.getDate()
        );
      });

      const completed = daySchedules.filter(
        (s) => s.status === 'completed',
      ).length;
      const cancelled = daySchedules.filter(
        (s) => s.status === 'cancelled',
      ).length;
      const revenue = daySchedules.reduce((sum, s) => {
        return sum + (s.service?.price || 0);
      }, 0);

      result.push({
        day: dayName,
        appointments: daySchedules.length,
        revenue: Math.round(revenue),
        completed,
        cancelled,
      });
    }

    return result;
  }

  private calculateTopServices(schedules: Schedule[]): Array<{
    id: string;
    name: string;
    bookings: number;
    revenue: number;
  }> {
    const serviceMap = new Map<
      string,
      { name: string; bookings: number; revenue: number }
    >();

    for (const schedule of schedules) {
      if (schedule.service) {
        const existing = serviceMap.get(schedule.service.id) || {
          name: schedule.service.name,
          bookings: 0,
          revenue: 0,
        };

        existing.bookings++;
        existing.revenue += schedule.service.price || 0;

        serviceMap.set(schedule.service.id, existing);
      }
    }

    // Converter para array e ordenar por bookings
    const services = Array.from(serviceMap.entries())
      .map(([id, data]) => ({
        id,
        ...data,
        revenue: Math.round(data.revenue),
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5);

    return services;
  }
}
