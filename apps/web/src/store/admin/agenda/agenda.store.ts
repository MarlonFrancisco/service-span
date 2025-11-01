import { create } from 'zustand';
import {
  AGENDA_DAYS,
  AGENDA_WORKING_DAY_KEYS,
  INITIAL_APPOINTMENT_FORM,
} from './agenda.constants';
import type { IAgendaStore } from './agenda.types';

export const useAgendaStore = create<IAgendaStore>((set) => ({
  currentWeek: 0,
  selectedProfessional: 'all',
  selectedAppointment: undefined,
  detailsAppointment: INITIAL_APPOINTMENT_FORM,
  isAddAppointmentOpen: false,
  isFocusMode: false,
  isBlockMode: false,
  selectedDayIndex: 0,
  appointments: [],
  professionals: [],
  services: [],
  days: AGENDA_DAYS,
  workingDayKeys: AGENDA_WORKING_DAY_KEYS,

  setCurrentWeek: (currentWeek) => set({ currentWeek }),
  setSelectedProfessional: (selectedProfessional) =>
    set({ selectedProfessional }),
  setIsAddAppointmentOpen: ({ isAddAppointmentOpen, selectedAppointment }) =>
    set({ isAddAppointmentOpen, selectedAppointment }),
  setDetailsAppointment: (detailsAppointment = INITIAL_APPOINTMENT_FORM) =>
    set({ detailsAppointment }),
  setIsFocusMode: (isFocusMode) => set({ isFocusMode }),
  setIsBlockMode: (isBlockMode) => set({ isBlockMode }),

  setSelectedDayIndex: (selectedDayIndex) => set({ selectedDayIndex }),
}));
