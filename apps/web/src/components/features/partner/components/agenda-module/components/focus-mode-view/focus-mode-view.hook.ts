import {
  formatMonthYear,
  INITIAL_APPOINTMENT_FORM,
  selectWeekDates,
  useAgendaStore,
} from '@/store/admin/agenda';
import { useCallback, useMemo } from 'react';

export function useFocusModeView() {
  const currentWeek = useAgendaStore((state) => state.currentWeek);
  const setCurrentWeek = useAgendaStore((state) => state.setCurrentWeek);
  const isBlockMode = useAgendaStore((state) => state.isBlockMode);
  const setIsBlockMode = useAgendaStore((state) => state.setIsBlockMode);
  const setIsFocusMode = useAgendaStore((state) => state.setIsFocusMode);
  const selectedProfessional = useAgendaStore(
    (state) => state.selectedProfessional,
  );
  const setSelectedProfessional = useAgendaStore(
    (state) => state.setSelectedProfessional,
  );
  const professionals = useAgendaStore((state) => state.professionals);
  const selectedDayIndex = useAgendaStore((state) => state.selectedDayIndex);
  const setSelectedDayIndex = useAgendaStore(
    (state) => state.setSelectedDayIndex,
  );
  const weekDates = useAgendaStore(selectWeekDates);
  const appointments = useAgendaStore((state) => state.appointments);
  const setIsAddAppointmentOpen = useAgendaStore(
    (state) => state.setIsAddAppointmentOpen,
  );
  const selectedDate = weekDates[selectedDayIndex] ?? weekDates[0];
  const monthYear = useMemo(
    () => formatMonthYear(selectedDate),
    [selectedDate],
  );

  const selectedProfessionalName = useMemo(() => {
    if (selectedProfessional === 'all') {
      return null;
    }

    return (
      professionals.find(
        (professional) => professional.id === selectedProfessional,
      )?.user.firstName ?? null
    );
  }, [professionals, selectedProfessional]);

  const getDayAppointmentsForCalendar = useCallback(
    (dayIndex: number, date: Date) => {
      const targetDate = date.toISOString().split('T')[0];
      return appointments
        .filter((appointment) => {
          if (appointment.date !== targetDate) {
            return false;
          }

          if (!selectedProfessionalName) {
            return true;
          }

          return (
            `${appointment.storeMember.user.firstName} ${appointment.storeMember.user.lastName}` ===
            selectedProfessionalName
          );
        })
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
    },
    [appointments, selectedProfessionalName],
  );

  const handleQuickAdd = useCallback(
    (professionalId: string | null, date: Date, time?: string) => {
      setIsAddAppointmentOpen({
        isAddAppointmentOpen: true,
        selectedAppointment: {
          ...INITIAL_APPOINTMENT_FORM,
          date: date.toISOString().split('T')[0]!,
          storeMember: professionalId
            ? professionals.find((p) => p.id === professionalId)!
            : INITIAL_APPOINTMENT_FORM.storeMember,
          startTime: time ?? INITIAL_APPOINTMENT_FORM.startTime,
        },
      });
    },
    [setIsAddAppointmentOpen, professionals],
  );

  const handleOpenAddAppointment = useCallback(() => {
    setIsAddAppointmentOpen({ isAddAppointmentOpen: true });
  }, [setIsAddAppointmentOpen]);

  return {
    currentWeek,
    isBlockMode,
    selectedProfessional,
    professionals,
    selectedDayIndex,
    appointments,
    monthYear,

    setCurrentWeek,
    setIsBlockMode,
    setIsFocusMode,
    setSelectedProfessional,
    setSelectedDayIndex,
    getDayAppointmentsForCalendar,
    handleQuickAdd,
    handleOpenAddAppointment,
  };
}
