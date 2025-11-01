import { IBlockedTime } from '@/types/api/blocked-times.types';
import type { IProfessional } from '@/types/api/users.types';

/**
 * Verifica se uma data é hoje
 */
export const isToday = (date: Date): boolean => {
  return date.toDateString() === new Date().toDateString();
};

/**
 * Formata o nome completo de um professional
 */
export const getProfessionalFullName = (
  professional: IProfessional,
): string => {
  return `${professional.user.firstName} ${professional.user.lastName}`;
};

/**
 * Formata uma data para o formato brasileiro
 */
export const formatDateBR = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
  });
};

/**
 * Converte Date para string ISO (YYYY-MM-DD)
 */
export const dateToISOString = (date: Date): string | null => {
  const isoStr = date.toISOString().split('T')[0];
  return isoStr || null;
};

/**
 * Verifica se um horário está bloqueado
 */
export const isBlockedTime = (
  blockedTimes: IBlockedTime[],
  date: string,
  time: string,
): IBlockedTime | undefined => {
  return blockedTimes.find(
    (blockedTime) => blockedTime.date === date && blockedTime.time === time,
  );
};
