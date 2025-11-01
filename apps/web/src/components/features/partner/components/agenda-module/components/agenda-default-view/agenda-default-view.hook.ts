import {
  INITIAL_APPOINTMENT_FORM,
  selectWeekDates,
  useAgendaStore,
} from '@/store/admin/agenda';
import type { IAppointment } from '@/types/api/schedule.types';
import { useCallback, useMemo } from 'react';

export function useAgendaDefaultView() {
  const days = useAgendaStore((state) => state.days);
  const weekDates = useAgendaStore(selectWeekDates);
  const workingDayKeys = useAgendaStore((state) => state.workingDayKeys);
  const workingDays = useAgendaStore((state) => state.workingDays);
  const appointments = useAgendaStore((state) => state.appointments);
  const professionals = useAgendaStore((state) => state.professionals);
  const selectedProfessionalId = useAgendaStore(
    (state) => state.selectedProfessional,
  );
  const isBlockMode = useAgendaStore((state) => state.isBlockMode);
  const setIsAddAppointmentOpen = useAgendaStore(
    (state) => state.setIsAddAppointmentOpen,
  );
  const setDetailsAppointment = useAgendaStore(
    (state) => state.setDetailsAppointment,
  );

  const filteredProfessionals = useMemo(() => {
    if (selectedProfessionalId === 'all') {
      return professionals;
    }

    return professionals.filter(
      (professional) => professional.id === selectedProfessionalId,
    );
  }, [professionals, selectedProfessionalId]);

  const selectedProfessionalName = useMemo(() => {
    if (selectedProfessionalId === 'all') {
      return null;
    }

    const professional = professionals.find(
      (professional) => professional.id === selectedProfessionalId,
    );

    if (!professional) {
      return null;
    }

    return `${professional.user.firstName} ${professional.user.lastName}`;
  }, [professionals, selectedProfessionalId]);

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
    (date: Date) => {
      setIsAddAppointmentOpen({
        isAddAppointmentOpen: true,
        selectedAppointment: {
          ...INITIAL_APPOINTMENT_FORM,
          date: date.toISOString().split('T')[0]!,
          storeMember:
            filteredProfessionals.length === 1
              ? filteredProfessionals[0]!
              : INITIAL_APPOINTMENT_FORM.storeMember,
        },
      });
    },
    [setIsAddAppointmentOpen, filteredProfessionals],
  );

  const handleAppointmentClick = useCallback(
    (appointment: IAppointment) => {
      setDetailsAppointment(appointment);
    },
    [setDetailsAppointment],
  );

  const handleOpenAddAppointment = useCallback(() => {
    setIsAddAppointmentOpen({ isAddAppointmentOpen: true });
  }, [setIsAddAppointmentOpen]);

  return {
    // Data
    days,
    weekDates,
    workingDayKeys,
    workingDays,
    appointments,
    filteredProfessionals,
    selectedProfessionalId,
    isBlockMode,

    // Functions
    getDayAppointmentsForCalendar,
    handleQuickAdd,
    handleAppointmentClick,
    handleOpenAddAppointment,
  };
}
