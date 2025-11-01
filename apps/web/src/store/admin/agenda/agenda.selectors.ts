import { IPartnerStore } from '@/store/partner';
import { TWorkingHours } from '@/types/api/stores.types';
import { generateTimeSlots, getWeekDates } from './agenda.helpers';
import type { IAgendaStore } from './agenda.types';

const timeSlotsCache = new Map<string, string[]>();

const serializeWorkingHours = (workingHours: TWorkingHours) =>
  `${workingHours.openTime}-${workingHours.closeTime}-${workingHours.lunchStartTime}-${workingHours.lunchEndTime}`;

export const selectTimeSlots = (state: IPartnerStore) => {
  const workingHours = {
    openTime: state.activeStore.openTime,
    closeTime: state.activeStore.closeTime,
    lunchStartTime: state.activeStore.lunchStartTime,
    lunchEndTime: state.activeStore.lunchEndTime,
  };

  const key = serializeWorkingHours(workingHours);

  if (timeSlotsCache.has(key)) {
    return timeSlotsCache.get(key)!;
  }

  const slots = generateTimeSlots(workingHours);
  timeSlotsCache.set(key, slots);
  return slots;
};

const weekDatesCache = new Map<number, Date[]>();

export const selectWeekDates = (state: IAgendaStore) => {
  const { currentWeek } = state;

  if (weekDatesCache.has(currentWeek)) {
    return weekDatesCache.get(currentWeek)!;
  }

  const weekDates = getWeekDates(currentWeek);
  weekDatesCache.set(currentWeek, weekDates);
  return weekDates;
};
