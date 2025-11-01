import { generateTimeSlots, getWeekDates } from './agenda.helpers';
import type { IAgendaStore } from './agenda.types';

const timeSlotsCache = new Map<string, string[]>();

const serializeWorkingHours = (workingHours: IAgendaStore['workingHours']) =>
  `${workingHours.start}-${workingHours.end}-${workingHours.lunchStart}-${workingHours.lunchEnd}`;

export const selectTimeSlots = (state: IAgendaStore) => {
  const key = serializeWorkingHours(state.workingHours);

  if (timeSlotsCache.has(key)) {
    return timeSlotsCache.get(key)!;
  }

  const slots = generateTimeSlots(state.workingHours);
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
