import type { IAppointment } from '@/types/api/schedule.types';
import type { IService } from '@/types/api/service.types';
import { TWorkingDays } from '@/types/api/stores.types';
import type { IProfessional } from '@/types/api/users.types';

export type TSelectedProfessionalId = 'all' | string;

export type TWorkingDayKey = keyof TWorkingDays;

export interface IAgendaState {
  currentWeek: number;
  selectedProfessional: TSelectedProfessionalId;
  selectedAppointment?: IAppointment;
  detailsAppointment: IAppointment;
  isAddAppointmentOpen: boolean;
  isFocusMode: boolean;
  isBlockMode: boolean;
  selectedDayIndex: number;
  appointments: IAppointment[];
  professionals: IProfessional[];
  services: IService[];
  days: string[];
  workingDayKeys: readonly TWorkingDayKey[];
}

export interface IAgendaActions {
  setCurrentWeek: (currentWeek: number) => void;
  setSelectedProfessional: (professionalId: TSelectedProfessionalId) => void;
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
  setSelectedDayIndex: (index: number) => void;
}

export type IAgendaStore = IAgendaState & IAgendaActions;
