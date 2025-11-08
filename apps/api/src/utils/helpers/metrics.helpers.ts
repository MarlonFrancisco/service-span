/**
 * Helpers Utilitários para Cálculo de Períodos em Métricas
 * Reutilizável por todos os módulos de métricas (overview, sales, operational, customers)
 */

export type PeriodType = 'week' | 'month' | 'quarter';

export interface DateRange {
  start: Date;
  end: Date;
}

/**
 * Obtém o range de datas para um período específico
 * @param date - Data base para cálculo
 * @param period - Tipo de período: 'week' (7 dias), 'month' (30 dias), 'quarter' (90 dias)
 * @returns DateRange com start e end do período
 */
export function getPeriodDateRange(date: Date, period: PeriodType): DateRange {
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
      // Este trimestre
      const quarter = Math.floor(d.getMonth() / 3);
      const monthStart = quarter * 3;
      start = new Date(d.getFullYear(), monthStart, 1);
      start.setHours(0, 0, 0, 0);

      end = new Date(d.getFullYear(), monthStart + 3, 0);
      end.setHours(23, 59, 59, 999);
      break;
    }
  }

  return { start, end };
}

/**
 * Obtém o início do período anterior
 * @param date - Data base
 * @param period - Tipo de período
 * @returns Data do início do período anterior
 */
export function getPreviousPeriodStart(date: Date, period: PeriodType): Date {
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

/**
 * Retorna a quantidade de dias em um período
 * @param period - Tipo de período
 * @returns Número de dias no período (7, 30 ou 90)
 */
export function getDaysInPeriod(period: PeriodType): number {
  switch (period) {
    case 'week':
      return 7;
    case 'month':
      return 30;
    case 'quarter':
      return 90;
  }
}

/**
 * Retorna o texto formatado do período em português
 * @param period - Tipo de período
 * @returns Texto do período (ex: "Esta semana")
 */
export function getPeriodLabel(period: PeriodType): string {
  switch (period) {
    case 'week':
      return 'Esta semana';
    case 'month':
      return 'Este mês';
    case 'quarter':
      return 'Este trimestre';
  }
}

/**
 * Retorna o texto de comparação do período em português
 * @param period - Tipo de período
 * @returns Texto de comparação (ex: "vs semana passada")
 */
export function getPeriodComparisonLabel(period: PeriodType): string {
  switch (period) {
    case 'week':
      return 'vs semana passada';
    case 'month':
      return 'vs mês passado';
    case 'quarter':
      return 'vs trimestre passado';
  }
}
