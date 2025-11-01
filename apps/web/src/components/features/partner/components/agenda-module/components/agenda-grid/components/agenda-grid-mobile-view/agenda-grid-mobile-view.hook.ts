import { useMemo } from 'react';
import type { useAgendaGrid } from '../../agenda-grid.hook';
import { formatDateBR, isToday } from '../../agenda-grid.helpers';
import type { TDayViewData } from '../../agenda-grid.types';

/**
 * Hook para Mobile View
 * Computa dados dos dias para evitar recálculos no render
 */
export const useAgendaGridMobileView = (
  gridHook: ReturnType<typeof useAgendaGrid>,
) => {
  const { weekDates, workingDayKeys, workingDays, days } = gridHook;

  // ✅ Performance: Computar dayViewData uma vez com useMemo
  const dayViewData = useMemo((): (TDayViewData | null)[] => {
    return weekDates.map((date, dayIndex) => {
      if (!date) return null;

      const dayKey = workingDayKeys[dayIndex];
      if (!dayKey) return null;

      return {
        date,
        dayIndex,
        isToday: isToday(date),
        isWorkingDay: workingDays[dayKey],
        dayKey,
        label: days[dayIndex],
      };
    });
  }, [weekDates, workingDayKeys, workingDays, days]);

  // ✅ Performance: Computar selectedDayData uma vez
  const selectedDayData = useMemo((): TDayViewData | null => {
    const date = weekDates[gridHook.selectedDayIndex];
    if (!date) return null;

    const dayKey = workingDayKeys[gridHook.selectedDayIndex];
    if (!dayKey) return null;

    return {
      date,
      dayIndex: gridHook.selectedDayIndex,
      isToday: isToday(date),
      isWorkingDay: workingDays[dayKey],
      dayKey,
      label: days[gridHook.selectedDayIndex],
    };
  }, [
    weekDates,
    workingDayKeys,
    workingDays,
    days,
    gridHook.selectedDayIndex,
  ]);

  return {
    dayViewData,
    selectedDayData,
    formatDateBR,
  };
};
