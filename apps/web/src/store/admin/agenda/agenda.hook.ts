import { useMemo } from 'react';
import { generateTimeSlots } from './agenda.helpers';
import { useAgendaStore } from './agenda.store';

export const useAgenda = () => {
  const {
    appointments,
    professionals,
    services,
    currentWeek,
    selectedProfessional,
    selectedAppointment,
    isSettingsOpen,
    isAddAppointmentOpen,
    isFocusMode,
    isBlockMode,
    blockedSlots,
    workingDays,
    workingHours,
    appointmentForm,
    setCurrentWeek,
    setSelectedProfessional,
    setSelectedAppointment,
    setIsSettingsOpen,
    setIsAddAppointmentOpen,
    setIsFocusMode,
    setIsBlockMode,
    setAppointmentForm,
    setWorkingDays,
    setWorkingHours,
    toggleBlockedSlot,
    resetAppointmentForm,
    addAppointment,
    updateAppointmentStatus,
    deleteAppointment,
  } = useAgendaStore();

  // Computed values com useMemo
  const timeSlots = useMemo(
    () => generateTimeSlots(workingHours),
    [workingHours],
  );

  const todayAppointments = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(
      (apt) => apt.date === today && apt.status === 'scheduled',
    ).length;
  }, [appointments]);

  const completedToday = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(
      (apt) => apt.date === today && apt.status === 'completed',
    ).length;
  }, [appointments]);

  const todayRevenue = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments
      .filter((apt) => apt.date === today && apt.status === 'completed')
      .reduce((acc, apt) => acc + apt.price, 0);
  }, [appointments]);

  const weeklyAppointments = useMemo(() => {
    return appointments.filter((apt) => apt.status !== 'cancelled').length;
  }, [appointments]);

  return {
    // State
    appointments,
    professionals,
    services,
    currentWeek,
    selectedProfessional,
    selectedAppointment,
    isSettingsOpen,
    isAddAppointmentOpen,
    isFocusMode,
    isBlockMode,
    blockedSlots,
    workingDays,
    workingHours,
    appointmentForm,

    // Computed
    timeSlots,
    todayAppointments,
    completedToday,
    todayRevenue,
    weeklyAppointments,

    // Actions
    setCurrentWeek,
    setSelectedProfessional,
    setSelectedAppointment,
    setIsSettingsOpen,
    setIsAddAppointmentOpen,
    setIsFocusMode,
    setIsBlockMode,
    setAppointmentForm,
    setWorkingDays,
    setWorkingHours,
    toggleBlockedSlot,
    resetAppointmentForm,

    // CRUD
    addAppointment,
    updateAppointmentStatus,
    deleteAppointment,
  };
};
