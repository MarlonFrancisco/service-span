import { useBlockedTimeMutations } from '@/hooks';
import { usePartnerStore } from '@/store';
import {
  getAppointmentForSlot as getAppointmentForSlotHelper,
  getSlotColor,
  getSlotsSpan,
  INITIAL_APPOINTMENT_FORM,
  isSlotOccupied as isSlotOccupiedHelper,
  selectTimeSlots,
  selectWeekDates,
  useAgendaStore,
} from '@/store/admin/agenda';
import { IBlockedTime } from '@/types/api/blocked-times.types';
import type { IAppointment } from '@/types/api/schedule.types';
import type { IProfessional } from '@/types/api/users.types';
import { useCallback, useMemo } from 'react';
import {
  dateToISOString,
  getProfessionalFullName,
} from './agenda-grid.helpers';
import type {
  TSelectedProfessionalData,
  TSlotRenderContext,
} from './agenda-grid.types';

/**
 * Hook base compartilhado para grids de agenda (mobile e desktop)
 * Contém toda a lógica comum de manipulação de slots, appointments e blocked times
 */
export const useAgendaGrid = () => {
  // Store selectors
  const professionals = usePartnerStore(
    (state) => state.activeStore.storeMembers,
  );
  const days = useAgendaStore((state) => state.days);
  const weekDates = useAgendaStore(selectWeekDates);
  const workingDayKeys = useAgendaStore((state) => state.workingDayKeys);
  const workingDays = useAgendaStore((state) => state.workingDays);
  const timeSlots = useAgendaStore(selectTimeSlots);
  const selectedProfessionalId = useAgendaStore(
    (state) => state.selectedProfessional,
  );
  const appointments = useAgendaStore((state) => state.appointments);
  const blockedSlotsMap = useAgendaStore((state) => state.blockedSlots);
  const isBlockMode = useAgendaStore((state) => state.isBlockMode);
  const selectedDayIndex = useAgendaStore((state) => state.selectedDayIndex);
  const { activeStore } = usePartnerStore();

  // Store actions
  const toggleBlockedSlot = useAgendaStore((state) => state.toggleBlockedSlot);
  const setDetailsAppointment = useAgendaStore(
    (state) => state.setDetailsAppointment,
  );
  const setIsAddAppointmentOpen = useAgendaStore(
    (state) => state.setIsAddAppointmentOpen,
  );

  const { createBlockedTime, deleteBlockedTime } = useBlockedTimeMutations({
    storeId: activeStore?.id,
  });

  // Computed values
  const blockedSlots = useMemo(
    () => new Set(Object.keys(blockedSlotsMap)),
    [blockedSlotsMap],
  );

  const filteredProfessionals = useMemo(() => {
    if (selectedProfessionalId === 'all') {
      return professionals;
    }
    return professionals.filter(
      (professional) => professional.id === selectedProfessionalId,
    );
  }, [professionals, selectedProfessionalId]);

  // ✅ FIX CRITICAL C1: Triple fetch otimizado com useMemo
  const selectedProfessionalData: TSelectedProfessionalData = useMemo(() => {
    if (selectedProfessionalId === 'all') {
      return { name: null, professional: null };
    }

    const professional = professionals.find(
      (p) => p.id === selectedProfessionalId,
    );

    const name = professional ? getProfessionalFullName(professional) : null;

    return { name, professional: professional ?? null };
  }, [professionals, selectedProfessionalId]);

  // Core utility functions
  const getAppointmentForSlot = useCallback(
    (professionalId: string, dayIndex: number, time: string) => {
      const date = weekDates[dayIndex];
      if (!date) {
        return null;
      }

      const dateStr = dateToISOString(date);
      if (!dateStr) {
        return null;
      }

      return getAppointmentForSlotHelper(
        appointments,
        professionalId,
        dateStr,
        time,
      );
    },
    [appointments, weekDates],
  );

  const isSlotOccupied = useCallback(
    (professionalId: string, dayIndex: number, time: string) => {
      const date = weekDates[dayIndex];
      if (!date) {
        return false;
      }

      const dateStr = dateToISOString(date);
      if (!dateStr) {
        return false;
      }

      return isSlotOccupiedHelper(appointments, professionalId, dateStr, time);
    },
    [appointments, weekDates],
  );

  // Default slot click handler
  const handleSlotClick = useCallback(
    (
      professional: IProfessional,
      dayIndex: number,
      time: string,
      blockedTime?: IBlockedTime,
    ) => {
      const appointment = getAppointmentForSlot(
        professional.id,
        dayIndex,
        time,
      );

      const date = weekDates[dayIndex];
      if (!date) {
        return;
      }

      const dateStr = dateToISOString(date);
      if (!dateStr) {
        return;
      }

      if (isBlockMode) {
        if (blockedTime) {
          deleteBlockedTime({
            id: blockedTime.id,
            date: dateStr,
            time: time,
            isRecurring: false,
            dayOfWeek: dayIndex,
            storeMember: professional,
          });
          return;
        }

        createBlockedTime({
          date: dateStr,
          time: time,
          isRecurring: false,
          dayOfWeek: dayIndex,
          storeMember: professional,
        });
        return;
      }

      if (blockedTime) return;

      // Default behavior
      if (appointment) {
        setDetailsAppointment(appointment);
        return;
      }

      setIsAddAppointmentOpen({
        isAddAppointmentOpen: true,
        selectedAppointment: {
          ...INITIAL_APPOINTMENT_FORM,
          date: dateStr,
          startTime: time,
          storeMember: professional,
        },
      });
    },
    [
      getAppointmentForSlot,
      isBlockMode,
      setDetailsAppointment,
      createBlockedTime,
      weekDates,
      setIsAddAppointmentOpen,
    ],
  );

  // Mobile-specific: Get appointments filtered by professional name (excluding cancelled)
  const getDayAppointmentsForCalendar = useCallback(
    (date: Date) => {
      const targetDate = dateToISOString(date);
      if (!targetDate) {
        return [];
      }

      return appointments
        .filter((appointment) => {
          if (appointment.date !== targetDate) {
            return false;
          }

          // Excluir appointments cancelados
          if (appointment.status === 'cancelled') {
            return false;
          }

          if (!selectedProfessionalData.name) {
            return true;
          }

          const appointmentName = getProfessionalFullName(
            appointment.storeMember,
          );

          return appointmentName === selectedProfessionalData.name;
        })
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
    },
    [appointments, selectedProfessionalData],
  );

  const handleQuickAdd = useCallback(() => {
    setIsAddAppointmentOpen({ isAddAppointmentOpen: true });
  }, [setIsAddAppointmentOpen]);

  const handleAppointmentClick = useCallback(
    (appointment: IAppointment) => {
      setDetailsAppointment(appointment);
    },
    [setDetailsAppointment],
  );

  // Desktop-specific: Slot className
  const getSlotClassName = useCallback((context: TSlotRenderContext) => {
    const base = 'px-2 py-1 transition-colors';

    if (!context.isWorkingDay) {
      return `${base} cursor-not-allowed opacity-60`;
    }

    if (context.appointment) {
      return `${base} rounded-lg ${getSlotColor(context.appointment, context.isBlocked)}`;
    }

    if (context.isBlocked) {
      return `${base} cursor-pointer border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200`;
    }

    return `${base} cursor-pointer border-gray-200 bg-white text-gray-700 hover:bg-gray-50`;
  }, []);

  return {
    // Store state
    days,
    weekDates,
    workingDayKeys,
    workingDays,
    timeSlots,
    selectedProfessionalId,
    appointments,
    blockedSlots,
    isBlockMode,
    selectedDayIndex,

    // Computed values
    filteredProfessionals,
    selectedProfessionalData,

    // Functions
    getAppointmentForSlot,
    isSlotOccupied,
    handleSlotClick,
    setDetailsAppointment,
    setIsAddAppointmentOpen,
    toggleBlockedSlot,
    getDayAppointmentsForCalendar,
    handleQuickAdd,
    handleAppointmentClick,
    getSlotClassName,
    getSlotsSpan,
  };
};
