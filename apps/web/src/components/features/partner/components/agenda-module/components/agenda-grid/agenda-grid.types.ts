import type { IAppointment } from '@/types/api/schedule.types';
import type { IProfessional } from '@/types/api/users.types';

/**
 * Configuração principal do AgendaGrid
 */
export type TAgendaGridConfig = {
  onSlotClick?: TSlotClickHandler;
  viewMode?: 'mobile' | 'desktop';
};

/**
 * Handler para clique em slot
 */
export type TSlotClickHandler = (
  professional: IProfessional,
  dayIndex: number,
  time: string,
  context: TSlotContext,
) => void;

/**
 * Contexto de um slot
 */
export type TSlotContext = {
  appointment: IAppointment | null;
  isBlockMode: boolean;
  date: Date;
  dateStr: string;
};

/**
 * Dados computados de um dia
 */
export type TDayViewData = {
  date: Date;
  dayIndex: number;
  isToday: boolean;
  isWorkingDay: boolean;
  dayKey: string;
  label: string;
};

/**
 * Configuração do hook useAgendaGrid
 */
export type TAgendaGridHookConfig = {
  professionals: IProfessional[];
  onSlotClick?: TSlotClickHandler;
};

/**
 * Configuração para Mobile View
 */
export type TMobileViewConfig = {
  professionals: IProfessional[];
  onSlotClick: TSlotClickHandler;
};

/**
 * Configuração para Desktop View
 */
export type TDesktopViewConfig = {
  professionals: IProfessional[];
  onSlotClick: TSlotClickHandler;
};

/**
 * Dados de um professional selecionado
 */
export type TSelectedProfessionalData = {
  name: string | null;
  professional: IProfessional | null;
};

/**
 * Contexto de renderização de slot
 */
export type TSlotRenderContext = {
  appointment: IAppointment | null;
  isBlocked: boolean;
  isWorkingDay: boolean;
};
