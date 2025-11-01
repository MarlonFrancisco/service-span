import { usePartnerStore } from '@/store';
import {
  formatMonthYear,
  selectWeekDates,
  useAgendaStore,
} from '@/store/admin/agenda';
import { useCallback, useMemo } from 'react';
import { toast } from 'sonner';

export function useAgendaToolbar() {
  const weekDates = useAgendaStore(selectWeekDates);
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
  const professionals = usePartnerStore(
    (state) => state.activeStore.storeMembers,
  );
  const setIsSettingsOpen = useAgendaStore((state) => state.setIsSettingsOpen);
  const setIsAddAppointmentOpen = useAgendaStore(
    (state) => state.setIsAddAppointmentOpen,
  );

  const monthYear = useMemo(() => {
    const firstDate = weekDates[0];
    if (!firstDate) {
      return '';
    }
    return formatMonthYear(firstDate);
  }, [weekDates]);

  const handlePreviousWeek = useCallback(() => {
    setCurrentWeek(currentWeek - 1);
  }, [currentWeek, setCurrentWeek]);

  const handleNextWeek = useCallback(() => {
    setCurrentWeek(currentWeek + 1);
  }, [currentWeek, setCurrentWeek]);

  const handleToday = useCallback(() => {
    setCurrentWeek(0);
  }, [setCurrentWeek]);

  const handleToggleBlockMode = useCallback(() => {
    const newBlockMode = !isBlockMode;
    setIsBlockMode(newBlockMode);
    toast.info(
      newBlockMode ? 'Modo de bloqueio ativado' : 'Modo de bloqueio desativado',
    );
  }, [isBlockMode, setIsBlockMode]);

  const handleEnterFocusMode = useCallback(() => {
    setIsFocusMode(true);
  }, [setIsFocusMode]);

  const handleOpenSettings = useCallback(() => {
    setIsSettingsOpen(true);
  }, [setIsSettingsOpen]);

  const handleOpenAddAppointment = useCallback(() => {
    setIsAddAppointmentOpen({ isAddAppointmentOpen: true });
  }, [setIsAddAppointmentOpen]);

  const handleProfessionalChange = useCallback(
    (professionalId: string) => {
      setSelectedProfessional(professionalId);
    },
    [setSelectedProfessional],
  );

  return {
    // Data
    monthYear,
    currentWeek,
    isBlockMode,
    selectedProfessional,
    professionals,

    // Actions
    handlePreviousWeek,
    handleNextWeek,
    handleToday,
    handleToggleBlockMode,
    handleEnterFocusMode,
    handleOpenSettings,
    handleOpenAddAppointment,
    handleProfessionalChange,
  };
}
