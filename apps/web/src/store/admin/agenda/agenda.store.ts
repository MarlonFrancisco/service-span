import { create } from 'zustand';
import {
  INITIAL_APPOINTMENT_FORM,
  INITIAL_WORKING_DAYS,
  INITIAL_WORKING_HOURS,
  MOCK_APPOINTMENTS,
  MOCK_PROFESSIONALS,
  MOCK_SERVICES,
} from './agenda.constants';
import type {
  IAgendaStore,
  IAppointment,
  IAppointmentFormData,
  IWorkingDays,
  IWorkingHours,
} from './agenda.types';

export const useAgendaStore = create<IAgendaStore>((set) => ({
  // State
  appointments: MOCK_APPOINTMENTS,
  professionals: MOCK_PROFESSIONALS,
  services: MOCK_SERVICES,
  currentWeek: 0,
  selectedProfessional: 'all',
  selectedAppointment: null,
  isSettingsOpen: false,
  isAddAppointmentOpen: false,
  isFocusMode: false,
  isBlockMode: false,
  blockedSlots: new Set<string>(),
  workingDays: INITIAL_WORKING_DAYS,
  workingHours: INITIAL_WORKING_HOURS,
  appointmentForm: INITIAL_APPOINTMENT_FORM,

  // Actions
  setCurrentWeek: (week: number) => set({ currentWeek: week }),
  setSelectedProfessional: (professionalId: string) =>
    set({ selectedProfessional: professionalId }),
  setSelectedAppointment: (appointment: IAppointment | null) =>
    set({ selectedAppointment: appointment }),
  setIsSettingsOpen: (isOpen: boolean) => set({ isSettingsOpen: isOpen }),
  setIsAddAppointmentOpen: (isOpen: boolean) =>
    set({ isAddAppointmentOpen: isOpen }),
  setIsFocusMode: (isFocus: boolean) => set({ isFocusMode: isFocus }),
  setIsBlockMode: (isBlock: boolean) => set({ isBlockMode: isBlock }),

  setAppointmentForm: (form: Partial<IAppointmentFormData>) => {
    set((state) => ({
      appointmentForm: { ...state.appointmentForm, ...form },
    }));
  },

  setWorkingDays: (days: Partial<IWorkingDays>) => {
    set((state) => ({
      workingDays: { ...state.workingDays, ...days },
    }));
  },

  setWorkingHours: (hours: Partial<IWorkingHours>) => {
    set((state) => ({
      workingHours: { ...state.workingHours, ...hours },
    }));
  },

  toggleBlockedSlot: (slotKey: string) => {
    set((state) => {
      const newSet = new Set(state.blockedSlots);
      if (newSet.has(slotKey)) {
        newSet.delete(slotKey);
      } else {
        newSet.add(slotKey);
      }
      return { blockedSlots: newSet };
    });
  },

  resetAppointmentForm: () =>
    set({ appointmentForm: INITIAL_APPOINTMENT_FORM }),

  // Appointment CRUD
  addAppointment: (appointment: Omit<IAppointment, 'id'>) => {
    set((state) => ({
      appointments: [
        ...state.appointments,
        { ...appointment, id: String(Date.now()) },
      ],
    }));
  },

  updateAppointmentStatus: (id: string, status: IAppointment['status']) => {
    set((state) => ({
      appointments: state.appointments.map((apt) =>
        apt.id === id ? { ...apt, status } : apt,
      ),
    }));
  },

  deleteAppointment: (id: string) => {
    set((state) => ({
      appointments: state.appointments.filter((apt) => apt.id !== id),
    }));
  },
}));
