import { IBlockedTime } from '@/types/api/blocked-times.types';
import type { IAppointment } from '@/types/api/schedule.types';
import type { IService } from '@/types/api/service.types';
import type { IProfessional } from '@/types/api/users.types';

export type TSelectedProfessionalId = 'all' | string;

export interface TWorkingHours {
  start: string;
  end: string;
  lunchStart: string;
  lunchEnd: string;
}

export interface TWorkingDays {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export type TWorkingDayKey = keyof TWorkingDays;

export type TBlockedSlots = IBlockedTime[];

export interface IAgendaState {
  currentWeek: number;
  selectedProfessional: TSelectedProfessionalId;
  selectedAppointment?: IAppointment;
  detailsAppointment: IAppointment;
  isSettingsOpen: boolean;
  isAddAppointmentOpen: boolean;
  isFocusMode: boolean;
  isBlockMode: boolean;
  blockedSlots: TBlockedSlots;
  selectedDayIndex: number;
  workingDays: TWorkingDays;
  workingHours: TWorkingHours;
  appointments: IAppointment[];
  professionals: IProfessional[];
  services: IService[];
  days: string[];
  workingDayKeys: readonly TWorkingDayKey[];
}

export interface IAgendaActions {
  setCurrentWeek: (currentWeek: number) => void;
  setSelectedProfessional: (professionalId: TSelectedProfessionalId) => void;
  setIsSettingsOpen: (isOpen: boolean) => void;
  setIsAddAppointmentOpen: ({
    isAddAppointmentOpen,
    selectedAppointment,
  }: {
    isAddAppointmentOpen: boolean;
    selectedAppointment?: IAppointment;
  }) => void;
  setDetailsAppointment: (detailsAppointment?: IAppointment) => void;
  setIsFocusMode: (isFocusMode: boolean) => void;
  setIsBlockMode: (isBlockMode: boolean) => void;
  toggleBlockedSlot: (slotKey: string) => void;
  setSelectedDayIndex: (index: number) => void;
  setWorkingDays: (workingDays: TWorkingDays) => void;
  updateWorkingDays: (updater: (prev: TWorkingDays) => TWorkingDays) => void;
  setWorkingHours: (workingHours: TWorkingHours) => void;
  updateWorkingHours: (updater: (prev: TWorkingHours) => TWorkingHours) => void;
  seedAppointments: (appointments: IAppointment[]) => void;
}

export type IAgendaStore = IAgendaState & IAgendaActions;
