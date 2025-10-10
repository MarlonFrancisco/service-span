export interface IAppointment {
  id: string;
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  service: string;
  professional: string;
  startTime: string;
  endTime: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  price: number;
  notes?: string;
}

export interface IProfessional {
  id: string;
  name: string;
  specialty: string;
  color: string;
}

export interface IScheduleService {
  id: string;
  name: string;
  duration: number;
  price: number;
}

export interface IWorkingDays {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface IWorkingHours {
  start: string;
  end: string;
  lunchStart: string;
  lunchEnd: string;
}

export interface IAppointmentFormData {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  service: string;
  professional: string;
  date: string;
  startTime: string;
  duration: string;
  notes: string;
}

export interface IAgendaStore {
  // State
  appointments: IAppointment[];
  professionals: IProfessional[];
  services: IScheduleService[];
  currentWeek: number;
  selectedProfessional: string;
  selectedAppointment: IAppointment | null;
  isSettingsOpen: boolean;
  isAddAppointmentOpen: boolean;
  isFocusMode: boolean;
  isBlockMode: boolean;
  blockedSlots: Set<string>;
  workingDays: IWorkingDays;
  workingHours: IWorkingHours;
  appointmentForm: IAppointmentFormData;

  // Actions
  setCurrentWeek: (week: number) => void;
  setSelectedProfessional: (professionalId: string) => void;
  setSelectedAppointment: (appointment: IAppointment | null) => void;
  setIsSettingsOpen: (isOpen: boolean) => void;
  setIsAddAppointmentOpen: (isOpen: boolean) => void;
  setIsFocusMode: (isFocus: boolean) => void;
  setIsBlockMode: (isBlock: boolean) => void;
  setAppointmentForm: (form: Partial<IAppointmentFormData>) => void;
  setWorkingDays: (days: Partial<IWorkingDays>) => void;
  setWorkingHours: (hours: Partial<IWorkingHours>) => void;
  toggleBlockedSlot: (slotKey: string) => void;
  resetAppointmentForm: () => void;

  // Appointment CRUD
  addAppointment: (appointment: Omit<IAppointment, 'id'>) => void;
  updateAppointmentStatus: (id: string, status: IAppointment['status']) => void;
  deleteAppointment: (id: string) => void;
}
