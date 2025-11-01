import { toast } from 'sonner';
import { create } from 'zustand';
import {
  AGENDA_DAYS,
  AGENDA_WORKING_DAY_KEYS,
  INITIAL_APPOINTMENT_FORM,
  INITIAL_WORKING_DAYS,
  INITIAL_WORKING_HOURS,
} from './agenda.constants';
import type { IAgendaStore } from './agenda.types';

export const useAgendaStore = create<IAgendaStore>((set) => ({
  currentWeek: 0,
  selectedProfessional: 'all',
  selectedAppointment: undefined,
  detailsAppointment: INITIAL_APPOINTMENT_FORM,
  isSettingsOpen: false,
  isAddAppointmentOpen: false,
  isFocusMode: false,
  isBlockMode: false,
  blockedSlots: {},
  selectedDayIndex: 0,
  workingDays: INITIAL_WORKING_DAYS,
  workingHours: INITIAL_WORKING_HOURS,
  appointments: [],
  professionals: [],
  services: [],
  days: AGENDA_DAYS,
  workingDayKeys: AGENDA_WORKING_DAY_KEYS,

  setCurrentWeek: (currentWeek) => set({ currentWeek }),
  setSelectedProfessional: (selectedProfessional) =>
    set({ selectedProfessional }),
  setIsSettingsOpen: (isSettingsOpen) => set({ isSettingsOpen }),
  setIsAddAppointmentOpen: ({ isAddAppointmentOpen, selectedAppointment }) =>
    set({ isAddAppointmentOpen, selectedAppointment }),
  setDetailsAppointment: (detailsAppointment = INITIAL_APPOINTMENT_FORM) =>
    set({ detailsAppointment }),
  setIsFocusMode: (isFocusMode) => set({ isFocusMode }),
  setIsBlockMode: (isBlockMode) => set({ isBlockMode }),

  toggleBlockedSlot: (slotKey) => {
    set((state) => {
      const blockedSlots = { ...state.blockedSlots };
      const isBlocked = Boolean(blockedSlots[slotKey]);

      if (isBlocked) {
        delete blockedSlots[slotKey];
        toast.success('Horário desbloqueado');
      } else {
        blockedSlots[slotKey] = true;
        toast.success('Horário bloqueado');
      }

      return { blockedSlots };
    });
  },

  setSelectedDayIndex: (selectedDayIndex) => set({ selectedDayIndex }),

  setWorkingDays: (workingDays) => set({ workingDays }),
  updateWorkingDays: (updater) =>
    set((state) => ({ workingDays: updater(state.workingDays) })),

  setWorkingHours: (workingHours) => set({ workingHours }),
  updateWorkingHours: (updater) =>
    set((state) => ({ workingHours: updater(state.workingHours) })),

  seedAppointments: (appointments) => set({ appointments }),
}));
