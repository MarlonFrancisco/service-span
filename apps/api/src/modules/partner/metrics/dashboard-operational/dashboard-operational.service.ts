import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Schedule } from '../../stores/schedule/schedule.entity';
import { Store } from '../../stores/store.entity';
import { DashboardOperationalDto } from './dto';

type PeriodType = 'week' | 'month' | 'quarter';

interface DateRange {
  start: Date;
  end: Date;
}

@Injectable()
export class DashboardOperationalService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  /**
   * Dashboard 3: Operacional
   * Calcula todas as métricas operacionais
   * @param storeId - ID da loja
   * @param period - Período para análise: 'week' (esta semana), 'month' (este mês), 'quarter' (este trimestre)
   */
  async getOperationalMetrics(
    storeId: string,
    period: PeriodType = 'month',
  ): Promise<DashboardOperationalDto> {
    const store = await this.storeRepository.findOne({
      where: { id: storeId },
      relations: ['schedules', 'services', 'storeMembers', 'storeMembers.user'],
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
        relations: ['service', 'storeMember', 'storeMember.user'],
      }),
      this.scheduleRepository.find({
        where: {
          store: { id: storeId },
          date: Between(previousPeriod.start, previousPeriod.end),
        },
        relations: ['service', 'storeMember', 'storeMember.user'],
      }),
    ]);

    // Calcular métricas principais
    const occupancyRate = this.calculateOccupancyRate(
      currentSchedules,
      prevSchedules,
      store,
      currentPeriod,
      previousPeriod,
    );
    const averageTime = this.calculateAverageTime(
      currentSchedules,
      prevSchedules,
    );
    const teamEfficiency = this.calculateTeamEfficiency(
      currentSchedules,
      prevSchedules,
      store,
    );
    const punctualityRate = this.calculatePunctualityRate(
      currentSchedules,
      prevSchedules,
    );

    // Dados de utilização
    const dailyCapacityUtilization = this.calculateDailyCapacityUtilization(
      currentSchedules,
      store,
    );
    const appointmentStatus = this.calculateAppointmentStatus(currentSchedules);
    const serviceDuration = this.calculateServiceDuration(currentSchedules);
    const periodDistribution = this.calculatePeriodDistribution(
      currentSchedules,
      prevSchedules,
      store,
    );
    const occupancyHeatMap = this.calculateOccupancyHeatMap(
      currentSchedules,
      store,
      currentPeriod,
    );
    const idleTimeOpportunities = this.calculateIdleTimeOpportunities(
      currentSchedules,
      store,
      currentPeriod,
    );
    const professionalPerformance =
      this.calculateProfessionalPerformance(currentSchedules);

    return {
      occupancyRate,
      averageTime,
      teamEfficiency,
      punctualityRate,
      dailyCapacityUtilization,
      appointmentStatus,
      serviceDuration,
      periodDistribution,
      occupancyHeatMap,
      idleTimeOpportunities,
      professionalPerformance,
    };
  }

  // ========== Helper Methods ==========

  /**
   * Converte diferentes tipos de entrada em uma instância Date
   * @param date - Pode ser Date, string, number ou qualquer outro tipo
   * @returns Uma instância Date válida ou a data atual se inválido
   * @example
   * ensureDate(new Date()) // retorna a Date
   * ensureDate('2024-01-15') // retorna Date(2024-01-15)
   * ensureDate(1705276800000) // retorna Date do timestamp
   */
  private ensureDate(date: unknown): Date {
    if (date instanceof Date) return date;
    if (typeof date === 'string' || typeof date === 'number') {
      return new Date(date);
    }
    return new Date();
  }

  /**
   * Converte tempo no formato HH:mm para minutos
   * @param time - Tempo em formato HH:mm (ex: "14:30")
   * @returns Número total de minutos desde meia-noite
   * @example
   * timeToMinutes("08:00") // retorna 480
   * timeToMinutes("14:30") // retorna 870
   * timeToMinutes("") // retorna 0
   */
  private timeToMinutes(time: string): number {
    if (!time) return 0;
    const [hoursStr, minutesStr] = time.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr || '0', 10);
    return hours * 60 + minutes;
  }

  /**
   * Calcula a duração média dos serviços de um conjunto de agendamentos
   * @param schedules - Array de agendamentos
   * @returns Duração média em minutos (padrão: 30 se nenhum serviço com duração)
   * @example
   * getAverageServiceDuration(schedules) // retorna 45 se média é 45 minutos
   */
  private getAverageServiceDuration(schedules: Schedule[]): number {
    const withDuration = schedules.filter((s) => s.service?.duration);
    if (withDuration.length === 0) return 30; // Default 30 minutos

    const totalDuration = withDuration.reduce(
      (sum, s) => sum + (s.service?.duration || 0),
      0,
    );
    return Math.round(totalDuration / withDuration.length);
  }

  /**
   * Gera períodos do dia (Manhã, Tarde, Noite) baseado nos horários de funcionamento da loja
   * Divide o período de operação em 3 partes aproximadamente iguais
   * @param store - Dados da loja com openTime e closeTime
   * @returns Array com períodos divididos em 3 partes
   * @example
   * // Se loja abre 8h e fecha 18h (10 horas):
   * // [
   * //   { label: 'Manhã (8h-11h)', startHour: 8, endHour: 11 },
   * //   { label: 'Tarde (11h-14h)', startHour: 11, endHour: 14 },
   * //   { label: 'Noite (14h-18h)', startHour: 14, endHour: 18 }
   * // ]
   */
  private generateDayPeriods(
    store: Store,
  ): Array<{ label: string; startHour: number; endHour: number }> {
    // Se não tiver horários configurados, retornar períodos padrão
    if (!store.openTime || !store.closeTime) {
      return [
        { label: 'Manhã (8h-12h)', startHour: 8, endHour: 12 },
        { label: 'Tarde (12h-18h)', startHour: 12, endHour: 18 },
        { label: 'Noite (18h-22h)', startHour: 18, endHour: 22 },
      ];
    }

    const openMinutes = this.timeToMinutes(store.openTime);
    const closeMinutes = this.timeToMinutes(store.closeTime);

    const openHour = Math.floor(openMinutes / 60);
    const closeHour = Math.ceil(closeMinutes / 60);

    // Dividir o tempo de funcionamento em 3 períodos
    const totalHours = closeHour - openHour;
    const hoursPerPeriod = Math.floor(totalHours / 3);

    const period1Start = openHour;
    const period1End = period1Start + hoursPerPeriod;
    const period2Start = period1End;
    const period2End = period2Start + hoursPerPeriod;
    const period3Start = period2End;
    const period3End = closeHour;

    const periodLabels = ['Manhã', 'Tarde', 'Noite'];

    return [
      {
        label: `${periodLabels[0]} (${period1Start}h-${period1End}h)`,
        startHour: period1Start,
        endHour: period1End,
      },
      {
        label: `${periodLabels[1]} (${period2Start}h-${period2End}h)`,
        startHour: period2Start,
        endHour: period2End,
      },
      {
        label: `${periodLabels[2]} (${period3Start}h-${period3End}h)`,
        startHour: period3Start,
        endHour: period3End,
      },
    ];
  }

  /**
   * Calcula a capacidade máxima de agendamentos para um período
   * Baseia-se em:
   * - Horário de funcionamento (openTime/closeTime)
   * - Pausa de almoço (lunchStartTime/lunchEndTime)
   * - Dias úteis (businessDays)
   * - Duração média dos serviços
   */
  private calculateMaxCapacity(
    store: Store,
    period: DateRange,
    schedules: Schedule[],
  ): {
    maxCapacity: number;
    dailyCapacity: number;
  } {
    // Se não houver configuração de horários, retornar um padrão
    if (!store.openTime || !store.closeTime || !store.businessDays) {
      return {
        maxCapacity: 10,
        dailyCapacity: 10,
      };
    }

    const openMinutes = this.timeToMinutes(store.openTime);
    const closeMinutes = this.timeToMinutes(store.closeTime);
    const lunchStartMinutes = store.lunchStartTime
      ? this.timeToMinutes(store.lunchStartTime)
      : null;
    const lunchEndMinutes = store.lunchEndTime
      ? this.timeToMinutes(store.lunchEndTime)
      : null;

    // Calcular minutos de funcionamento por dia
    let workingMinutesPerDay = closeMinutes - openMinutes;
    if (lunchStartMinutes !== null && lunchEndMinutes !== null) {
      workingMinutesPerDay -= lunchEndMinutes - lunchStartMinutes;
    }

    // Contar dias úteis no período que a loja está aberta
    let businessDaysInPeriod = 0;
    const currentDate = new Date(period.start);

    while (currentDate <= period.end) {
      const dayOfWeek = currentDate.getDay();
      const dayNames = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ];
      const dayKey = dayNames[dayOfWeek] as keyof Store['businessDays'];

      if (store.businessDays[dayKey]) {
        businessDaysInPeriod++;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Duração média de um agendamento
    const avgServiceDuration = this.getAverageServiceDuration(schedules);

    // Calcular capacidade máxima
    const totalWorkingMinutes = workingMinutesPerDay * businessDaysInPeriod;
    const maxCapacity = Math.floor(totalWorkingMinutes / avgServiceDuration);

    // Retornar no mínimo 1 para evitar divisão por zero
    return {
      maxCapacity: Math.max(1, maxCapacity),
      dailyCapacity: Math.max(1, maxCapacity / businessDaysInPeriod),
    };
  }

  /**
   * Obtém o intervalo de datas para um período específico
   * @param date - Data de referência para calcular o período
   * @param period - Tipo de período: 'week' (semana), 'month' (mês), 'quarter' (trimestre)
   * @returns Objeto com datas de início e fim do período
   * @example
   * getPeriodDateRange(new Date('2024-01-15'), 'week') // retorna segunda-feira a domingo da semana
   * getPeriodDateRange(new Date('2024-01-15'), 'month') // retorna 2024-01-01 a 2024-01-31
   */
  private getPeriodDateRange(date: Date, period: PeriodType): DateRange {
    const start = new Date(date);
    const end = new Date(date);

    if (period === 'week') {
      const dayOfWeek = start.getDay();
      const diff = start.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      start.setDate(diff);
      start.setHours(0, 0, 0, 0);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
    } else if (period === 'month') {
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
      end.setHours(23, 59, 59, 999);
    } else if (period === 'quarter') {
      const quarter = Math.floor(start.getMonth() / 3);
      start.setMonth(quarter * 3, 1);
      start.setHours(0, 0, 0, 0);
      end.setMonth((quarter + 1) * 3, 0);
      end.setHours(23, 59, 59, 999);
    }

    return { start, end };
  }

  /**
   * Calcula a data de início do período anterior
   * @param date - Data de referência
   * @param period - Tipo de período: 'week', 'month', 'quarter'
   * @returns Data de início do período anterior
   * @example
   * getPreviousPeriodStart(new Date('2024-01-15'), 'week') // retorna 2024-01-08
   * getPreviousPeriodStart(new Date('2024-01-15'), 'month') // retorna 2023-12-15
   */
  private getPreviousPeriodStart(date: Date, period: PeriodType): Date {
    const previous = new Date(date);

    if (period === 'week') {
      previous.setDate(previous.getDate() - 7);
    } else if (period === 'month') {
      previous.setMonth(previous.getMonth() - 1);
    } else if (period === 'quarter') {
      previous.setMonth(previous.getMonth() - 3);
    }

    return previous;
  }

  // ========== Metrics Calculation Methods ==========

  /**
   * Calcula a taxa de ocupação (agendamentos / capacidade máxima)
   * Compara o período atual com o período anterior para calcular a variação percentual
   * @param current - Agendamentos do período atual
   * @param previous - Agendamentos do período anterior
   * @param store - Dados da loja (horários, dias abertos)
   * @param currentPeriod - Intervalo de datas do período atual
   * @param previousPeriod - Intervalo de datas do período anterior
   * @returns Objeto com taxa de ocupação (%), valor anterior e variação percentual
   * @example
   * // Se capacidade = 100 e tem 80 agendamentos: 80%
   * // Se capacidade = 100 e tem 120 agendamentos: 100% (limitado)
   */
  private calculateOccupancyRate(
    current: Schedule[],
    previous: Schedule[],
    store: Store,
    currentPeriod: DateRange,
    previousPeriod: DateRange,
  ) {
    const { maxCapacity: currentCapacity } = this.calculateMaxCapacity(
      store,
      currentPeriod,
      current,
    );
    const { maxCapacity: previousCapacity } = this.calculateMaxCapacity(
      store,
      previousPeriod,
      previous,
    );

    const currentOccupancy =
      (current.length / Math.max(1, currentCapacity)) * 100;
    const previousOccupancy =
      (previous.length / Math.max(1, previousCapacity)) * 100;

    // Limitar a 100% para não mostrar sobrecarga
    const currentValue = Math.min(currentOccupancy, 100);
    const previousValue = Math.min(previousOccupancy, 100);

    return {
      value: parseFloat(currentValue.toFixed(1)),
      previousValue: parseFloat(previousValue.toFixed(1)),
      percentageChange: parseFloat(
        (
          ((currentValue - previousValue) / Math.max(0.1, previousValue)) *
          100
        ).toFixed(1),
      ),
    };
  }

  /**
   * Calcula o tempo médio de duração dos agendamentos
   * @param current - Agendamentos do período atual
   * @param previous - Agendamentos do período anterior
   * @returns Objeto com duração média em minutos, valor anterior e variação percentual
   * @example
   * // Se tem serviços de 30, 45 e 60 minutos: média = 45
   * // Se nenhum serviço tem duração: retorna padrão 30 minutos
   */
  private calculateAverageTime(current: Schedule[], previous: Schedule[]) {
    // Calcular tempo médio com base no service duration
    const currentAvg =
      current.filter((s) => s.service?.duration).length > 0
        ? current
            .filter((s) => s.service?.duration)
            .reduce((sum, s) => sum + (s.service?.duration || 0), 0) /
          current.filter((s) => s.service?.duration).length
        : 30;

    const previousAvg =
      previous.filter((p) => p.service?.duration).length > 0
        ? previous
            .filter((p) => p.service?.duration)
            .reduce((sum, s) => sum + (s.service?.duration || 0), 0) /
          previous.filter((p) => p.service?.duration).length
        : 30;

    return {
      value: Math.round(currentAvg),
      previousValue: Math.round(previousAvg),
      percentageChange: parseFloat(
        (((currentAvg - previousAvg) / previousAvg) * 100).toFixed(1),
      ),
    };
  }

  /**
   * Calcula a eficiência do time (profissionais com agendamentos / total de profissionais)
   * Mede quantos profissionais estão ativamente trabalhando no período
   * @param current - Agendamentos do período atual
   * @param previous - Agendamentos do período anterior
   * @param store - Dados da loja com lista de profissionais
   * @returns Objeto com percentual de profissionais ativos, valor anterior e variação
   * @example
   * // Se tem 8 profissionais e 6 têm agendamentos: 75%
   * // Se tem 8 profissionais e 2 têm agendamentos: 25%
   */
  private calculateTeamEfficiency(
    current: Schedule[],
    previous: Schedule[],
    store: Store,
  ) {
    const totalProfessionals = store.storeMembers?.length || 1;

    // Profissionais com agendamentos no período atual
    const activeProfessionalsCurrentSet = new Set(
      current.map((s) => s.storeMember?.id).filter(Boolean),
    );
    const activeProfessionalsCurrent = activeProfessionalsCurrentSet.size;

    // Profissionais com agendamentos no período anterior
    const activeProfessionalsPrevSet = new Set(
      previous.map((s) => s.storeMember?.id).filter(Boolean),
    );
    const activeProfessionalsPrev = activeProfessionalsPrevSet.size;

    const currentEfficiency =
      (activeProfessionalsCurrent / totalProfessionals) * 100;
    const previousEfficiency =
      (activeProfessionalsPrev / totalProfessionals) * 100;

    return {
      value: parseFloat(currentEfficiency.toFixed(1)),
      previousValue: parseFloat(previousEfficiency.toFixed(1)),
      percentageChange: parseFloat(
        (
          ((currentEfficiency - previousEfficiency) /
            Math.max(0.1, previousEfficiency)) *
          100
        ).toFixed(1),
      ),
    };
  }

  /**
   * Calcula a taxa de pontualidade (agendamentos completados / total de agendamentos)
   * Também calcula a taxa de não-comparecimento (no-show)
   * @param current - Agendamentos do período atual
   * @param previous - Agendamentos do período anterior
   * @returns Objeto com taxa de pontualidade (%), taxa de não-comparecimento e variação
   * @example
   * // Se 80 completados de 100: 80% de pontualidade
   * // Se 5 no-show de 100: 5% de não-comparecimento
   */
  private calculatePunctualityRate(current: Schedule[], previous: Schedule[]) {
    const currentOnTime = current.filter(
      (s) => s.status === 'completed',
    ).length;
    const currentRate = (currentOnTime / Math.max(1, current.length)) * 100;
    const previousOnTime = previous.filter(
      (s) => s.status === 'completed',
    ).length;
    const previousRate = (previousOnTime / Math.max(1, previous.length)) * 100;

    return {
      value: parseFloat(currentRate.toFixed(1)),
      previousValue: parseFloat(previousRate.toFixed(1)),
      percentageChange: parseFloat(
        ((currentRate - previousRate) / Math.max(1, previousRate)).toFixed(1),
      ),
      noShowRate: parseFloat(
        (
          (current.filter((s) => s.status === 'no-show').length /
            Math.max(1, current.length)) *
          100
        ).toFixed(1),
      ),
    };
  }

  /**
   * Calcula a utilização de capacidade para cada dia da semana
   * Retorna agendamentos reais, capacidade máxima, percentual de ocupação e receita por dia
   * @param schedules - Agendamentos do período
   * @param store - Dados da loja (horários de funcionamento)
   * @returns Array com dados de cada dia da semana
   * @example
   * // Segunda-feira: 15 agendamentos, capacidade 20, 75% ocupação, R$ 500 de receita
   */
  private calculateDailyCapacityUtilization(
    schedules: Schedule[],
    store: Store,
  ) {
    const dayLabels = [
      'Dom',
      'Seg',
      'Ter',
      'Qua',
      'Qui',
      'Sex',
      'Sáb',
    ] as const;
    const dayKeys = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ] as const;

    const result = dayLabels.map((dayLabel, dayIndex) => {
      // Filtrar agendamentos do dia da semana
      const daySchedules = schedules.filter(
        (s) => this.ensureDate(s.date).getDay() === dayIndex,
      );

      // Verificar se a loja está aberta nesse dia
      const isOpen = store.businessDays?.[dayKeys[dayIndex]] ?? true;

      // Calcular capacidade do dia
      let dayCapacity = 0;
      if (isOpen && store.openTime && store.closeTime) {
        const openMinutes = this.timeToMinutes(store.openTime);
        const closeMinutes = this.timeToMinutes(store.closeTime);
        const lunchStartMinutes = store.lunchStartTime
          ? this.timeToMinutes(store.lunchStartTime)
          : null;
        const lunchEndMinutes = store.lunchEndTime
          ? this.timeToMinutes(store.lunchEndTime)
          : null;

        let workingMinutes = closeMinutes - openMinutes;
        if (lunchStartMinutes !== null && lunchEndMinutes !== null) {
          workingMinutes -= lunchEndMinutes - lunchStartMinutes;
        }

        const avgServiceDuration = this.getAverageServiceDuration(daySchedules);
        dayCapacity = Math.floor(workingMinutes / avgServiceDuration);
      }

      // Evitar divisão por zero
      const totalCapacity = Math.max(dayCapacity, 1);
      const usedCapacity = Math.min(daySchedules.length, totalCapacity);
      const usedCapacityPercentage = (usedCapacity / totalCapacity) * 100;

      // Receita do dia
      const revenue = daySchedules.reduce(
        (sum, s) => sum + (s.service?.price || 0),
        0,
      );

      return {
        day: dayLabel,
        totalCapacity,
        usedCapacity,
        emptyCapacity: Math.max(totalCapacity - usedCapacity, 0),
        utilizationPercentage: parseFloat(usedCapacityPercentage.toFixed(1)),
        isOpen,
        revenue,
      };
    });

    return result;
  }

  /**
   * Calcula a distribuição de agendamentos por status
   * Mostra quantos agendamentos estão em cada status e o percentual
   * @param schedules - Agendamentos do período
   * @returns Array com quantidade e percentual para cada status
   * @example
   * // [
   * //   { status: 'completed', quantity: 80, percentage: 80 },
   * //   { status: 'scheduled', quantity: 15, percentage: 15 },
   * //   { status: 'no-show', quantity: 4, percentage: 4 },
   * //   { status: 'cancelled', quantity: 1, percentage: 1 }
   * // ]
   */
  private calculateAppointmentStatus(schedules: Schedule[]) {
    const statuses = [
      'completed',
      'scheduled',
      'no-show',
      'cancelled',
    ] as const;

    return statuses.map((status) => {
      const quantity = schedules.filter((s) => s.status === status).length;
      return {
        status,
        quantity,
        percentage: parseFloat(
          ((quantity / Math.max(1, schedules.length)) * 100).toFixed(1),
        ),
      };
    });
  }

  /**
   * Calcula a duração média de cada serviço
   * Mostra tempo planejado vs tempo real (quando disponível)
   * @param schedules - Agendamentos do período
   * @returns Array com duração média de cada serviço
   * @example
   * // [
   * //   { id: '1', name: 'Corte', averageRealTime: 45, plannedTime: 45, variation: 0 },
   * //   { id: '2', name: 'Coloração', averageRealTime: 90, plannedTime: 90, variation: 0 }
   * // ]
   */
  private calculateServiceDuration(schedules: Schedule[]) {
    type ServiceMapValue = {
      id: string;
      name: string;
      count: number;
      planned: number;
    };
    const serviceMap = new Map<string, ServiceMapValue>();

    schedules.forEach((s) => {
      if (s.service) {
        const key = s.service.id;
        if (!serviceMap.has(key)) {
          serviceMap.set(key, {
            id: s.service.id,
            name: s.service.name,
            count: 0,
            planned: s.service.duration || 30,
          });
        }
        const service = serviceMap.get(key);
        if (service) service.count++;
      }
    });

    return Array.from(serviceMap.values()).map((item) => {
      // For now, average real time = planned time, as Schedule doesn't store actual duration
      const avgReal = item.planned;
      return {
        id: item.id,
        name: item.name,
        averageRealTime: Math.round(avgReal),
        plannedTime: item.planned,
        variation: 0,
      };
    });
  }

  /**
   * Calcula a distribuição de agendamentos por período do dia (Manhã, Tarde, Noite)
   * Mostra tendência de mudança em relação ao período anterior
   * Usa horários reais de funcionamento da loja
   * @param current - Agendamentos do período atual
   * @param previous - Agendamentos do período anterior
   * @param store - Dados da loja para gerar períodos dinâmicos
   * @returns Array com dados de cada período do dia
   * @example
   * // [
   * //   { period: 'morning', label: 'Manhã (8h-11h)', appointmentCount: 25, percentage: 50, trend: +10 },
   * //   { period: 'afternoon', label: 'Tarde (11h-15h)', appointmentCount: 15, percentage: 30, trend: -5 }
   * // ]
   */
  private calculatePeriodDistribution(
    current: Schedule[],
    previous: Schedule[],
    store: Store,
  ) {
    const periodLabels = ['morning', 'afternoon', 'night'] as const;
    const generatedPeriods = this.generateDayPeriods(store);

    const periods = generatedPeriods.map((p, idx) => ({
      period: periodLabels[idx],
      label: p.label,
      hours: [p.startHour, p.endHour],
    }));

    return periods.map((p) => {
      const currentCount = current.filter((s) => {
        const hour = parseInt(s.startTime.split(':')[0]);
        return hour >= p.hours[0] && hour <= p.hours[1];
      }).length;

      const prevCount = previous.filter((s) => {
        const hour = parseInt(s.startTime.split(':')[0]);
        return hour >= p.hours[0] && hour <= p.hours[1];
      }).length;

      return {
        period: p.period,
        label: p.label,
        appointmentCount: currentCount,
        percentage: parseFloat(
          ((currentCount / Math.max(1, current.length)) * 100).toFixed(1),
        ),
        trend: parseFloat(
          (((currentCount - prevCount) / Math.max(1, prevCount)) * 100).toFixed(
            1,
          ),
        ),
      };
    });
  }

  /**
   * Calcula um mapa de calor da ocupação por hora e dia da semana
   * Respeita o horário de funcionamento e dias abertos da loja
   * @param schedules - Agendamentos do período
   * @param store - Dados da loja (horários de funcionamento)
   * @returns Objeto com horas e dados de ocupação para cada dia da semana
   * @example
   * // {
   * //   hours: ['8h', '9h', '10h', ...],
   * //   data: [
   * //     { day: 'Seg', values: [30, 60, 100, ...], isOpen: true },  // percentual de ocupação por hora
   * //     { day: 'Dom', values: [0, 0, 0, ...], isOpen: false }       // dias fechados têm 0%
   * //   ]
   * // }
   */
  private calculateOccupancyHeatMap(
    schedules: Schedule[],
    store: Store,
    currentPeriod: DateRange,
  ) {
    const dayLabels = [
      'Dom',
      'Seg',
      'Ter',
      'Qua',
      'Qui',
      'Sex',
      'Sáb',
    ] as const;
    const dayKeys = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ] as const;

    // Gerar horas baseado no horário de funcionamento da loja
    const hours: string[] = [];

    const openMinutes = this.timeToMinutes(store.openTime);
    const closeMinutes = this.timeToMinutes(store.closeTime);

    // Gerar horas a cada intervalo de 1 hora
    for (let minute = openMinutes; minute < closeMinutes; minute += 60) {
      const hour = Math.floor(minute / 60);
      hours.push(`${hour}h`);
    }

    const { dailyCapacity } = this.calculateMaxCapacity(
      store,
      currentPeriod,
      schedules,
    );

    // Calcular dados para cada dia da semana
    const data = dayLabels.map((day, dayIndex) => {
      const isOpen = store.businessDays?.[dayKeys[dayIndex]] ?? true;

      const values = hours.map((hour) => {
        if (!isOpen) return 0; // Dia fechado = 0% ocupação

        const hourNum = parseInt(hour);
        const count = schedules.filter((s) => {
          const date = this.ensureDate(s.date);
          const scheduleHour = parseInt(s.startTime.split(':')[0]);
          return scheduleHour === hourNum && date.getDay() === dayIndex;
        }).length;

        // Normalizar ocupação por hora (máx 1 agendamento por hora disponível)
        return Math.min((count / dailyCapacity) * 100, 100);
      });

      return {
        day,
        values,
        isOpen,
      };
    });

    return { hours, data };
  }

  /**
   * Identifica oportunidades de tempo ocioso (períodos sem agendamentos)
   * Calcula o potencial de receita baseado em dados reais
   * @param schedules - Agendamentos do período
   * @param store - Dados da loja (horários de funcionamento)
   * @param period - Intervalo de datas do período
   * @returns Array com períodos ociosos e potencial de receita
   * @example
   * // [
   * //   { dayAndPeriod: 'Seg - Manhã', emptyHours: 3, potentialRevenue: 1200 },
   * //   { dayAndPeriod: 'Qua - Tarde', emptyHours: 2, potentialRevenue: 800 }
   * // ]
   */
  private calculateIdleTimeOpportunities(
    schedules: Schedule[],
    store: Store,
    period: DateRange,
  ) {
    const opportunities: Array<{
      dayAndPeriod: string;
      emptyHours: number;
      potentialRevenue: number;
    }> = [];

    if (!store.openTime || !store.closeTime) return opportunities;

    const dayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const dayKeys = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ] as const;

    // Gerar períodos dinâmicos baseado nos horários reais da loja
    const periodParts = this.generateDayPeriods(store);

    // Calcular preço médio dos serviços
    const servicesWithPrice = schedules.filter((s) => s.service?.price);
    const avgServicePrice =
      servicesWithPrice.length > 0
        ? servicesWithPrice.reduce(
            (sum, s) => sum + (s.service?.price || 0),
            0,
          ) / servicesWithPrice.length
        : 0;

    const avgServiceDuration = this.getAverageServiceDuration(schedules);
    const estimatedRevenuePerHour = (avgServicePrice / avgServiceDuration) * 60; // Receita por hora

    // Analisar cada dia e período
    const currentDate = new Date(period.start);
    while (currentDate <= period.end) {
      const dayOfWeek = currentDate.getDay();
      const dayLabel = dayLabels[dayOfWeek];
      const dayKey = dayKeys[dayOfWeek];

      // Verificar se a loja está aberta neste dia
      const isOpen = store.businessDays?.[dayKey] ?? true;
      if (!isOpen) {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
      }

      // Analisar cada período do dia
      for (const periodPart of periodParts) {
        // Contar agendamentos no período
        const schedulesInPeriod = schedules.filter((s) => {
          const date = this.ensureDate(s.date);
          const isSameDay =
            date.getFullYear() === currentDate.getFullYear() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getDate() === currentDate.getDate();

          if (!isSameDay) return false;

          const hour = parseInt(s.startTime.split(':')[0]);
          return hour >= periodPart.startHour && hour < periodPart.endHour;
        });

        // Se houver poucos agendamentos no período, é oportunidade
        const totalHoursInPeriod = periodPart.endHour - periodPart.startHour;
        const expectedSlotsInPeriod = Math.floor(
          (totalHoursInPeriod * 60) / avgServiceDuration,
        );

        if (schedulesInPeriod.length < expectedSlotsInPeriod * 0.5) {
          // Menos de 50% ocupado
          const emptySlots = expectedSlotsInPeriod - schedulesInPeriod.length;
          const emptyHours = (emptySlots * avgServiceDuration) / 60;
          const potentialRevenue = emptyHours * estimatedRevenuePerHour;

          if (potentialRevenue > 0) {
            opportunities.push({
              dayAndPeriod: `${dayLabel} - ${periodPart.label}`,
              emptyHours: Math.round(emptyHours * 10) / 10, // Arredondar para 1 casa decimal
              potentialRevenue: Math.round(potentialRevenue),
            });
          }
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Ordenar por potencial de receita descendente e limitar aos top 5
    return opportunities
      .sort((a, b) => b.potentialRevenue - a.potentialRevenue)
      .slice(0, 5);
  }

  /**
   * Calcula a performance de cada profissional (agendamentos, receita, eficiência)
   * Mostra métricas individuais de cada membro da equipe
   * @param schedules - Agendamentos do período
   * @returns Array com dados de performance de cada profissional
   * @example
   * // [
   * //   {
   * //     id: '1',
   * //     name: 'João Silva',
   * //     appointmentCount: 50,
   * //     revenue: 2500,
   * //     efficiency: 96.0,
   * //     punctualityRate: 96.0,
   * //     utilizationRate: 50.0
   * //   }
   * // ]
   */
  private calculateProfessionalPerformance(schedules: Schedule[]) {
    type ProfMapValue = {
      id: string;
      name: string;
      appointments: number;
      revenue: number;
      completedCount: number;
      avgDuration: number;
    };
    const profMap = new Map<string, ProfMapValue>();

    schedules.forEach((s) => {
      if (s.storeMember) {
        const key = s.storeMember.id;
        if (!profMap.has(key)) {
          profMap.set(key, {
            id: s.storeMember.id,
            name:
              s.storeMember.user.firstName +
                ' ' +
                s.storeMember.user.lastName || 'Unknown',
            appointments: 0,
            revenue: 0,
            completedCount: 0,
            avgDuration: 0,
          });
        }
        const prof = profMap.get(key);
        if (prof) {
          prof.appointments++;
          prof.revenue += s.service?.price || 0;
          if (s.status === 'completed') prof.completedCount++;
        }
      }
    });

    return Array.from(profMap.values()).map((prof) => {
      const avgDuration = prof.appointments > 0 ? 45 : 0;

      return {
        id: prof.id,
        name: prof.name,
        appointmentCount: prof.appointments,
        averageRating: 4.5, // Placeholder
        revenue: prof.revenue,
        efficiency: parseFloat(
          (
            (prof.completedCount / Math.max(1, prof.appointments)) *
            100
          ).toFixed(1),
        ),
        punctualityRate: parseFloat(
          (
            (prof.completedCount / Math.max(1, prof.appointments)) *
            100
          ).toFixed(1),
        ),
        averageAttendanceTime: Math.round(avgDuration),
        utilizationRate: parseFloat(
          ((prof.appointments / Math.max(1, 100)) * 100).toFixed(1),
        ),
      };
    });
  }
}
