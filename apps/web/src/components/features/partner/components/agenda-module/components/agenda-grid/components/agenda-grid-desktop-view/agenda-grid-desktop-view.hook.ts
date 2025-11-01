import { useMemo } from 'react';
import type { useAgendaGrid } from '../../agenda-grid.hook';
import { isToday } from '../../agenda-grid.helpers';

/**
 * Hook para Desktop View
 */
export const useAgendaGridDesktopView = (
  gridHook: ReturnType<typeof useAgendaGrid>,
) => {
  const { weekDates, workingDayKeys, workingDays, days } = gridHook;

  // Computa dados dos dias para desktop
  const desktopDayData = useMemo(() => {
    return days.map((label, dayIndex) => {
      const date = weekDates[dayIndex];
      const workingKey = workingDayKeys[dayIndex];

      if (!date || !workingKey) {
        return null;
      }

      return {
        label,
        dayIndex,
        date,
        isToday: isToday(date),
        isWorkingDay: workingDays[workingKey],
      };
    });
  }, [days, weekDates, workingDayKeys, workingDays]);

  return {
    desktopDayData,
  };
};
