export type TAppointmentStatus = 'scheduled' | 'completed' | 'cancelled';

export type TViewType = 'week' | 'day' | 'month';

export type TAppointment = {
  id: string;
  clientName: string;
  service: string;
  professional: string;
  startTime: string;
  endTime: string;
  status: TAppointmentStatus;
  price: number;
};

export type TProfessional = {
  id: string;
  name: string;
  specialty: string;
};

export type TWorkingDays = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
};

export type TWorkingDayKey = keyof TWorkingDays;

export type TStore = {
  id: string;
  name: string;
  address: string;
};

export type TUseAgendaModuleReturn = {
  // State
  viewType: TViewType;
  currentWeek: number;
  selectedProfessional: string;
  selectedAppointment: TAppointment | null;
  isSettingsOpen: boolean;
  workingDays: TWorkingDays;
  professionals: TProfessional[];
  timeSlots: string[];
  activeStore: TStore;
  blockedSlots: Set<string>;
  selectedSlots: Set<string>;
  isDragging: boolean;

  // Actions
  setViewType: (type: TViewType) => void;
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
  setSelectedProfessional: (professionalId: string) => void;
  handleAppointmentAction: (
    action: 'complete' | 'cancel' | 'reschedule',
  ) => void;
  handleCloseAppointment: () => void;
  handleOpenSettings: () => void;
  handleCloseSettings: () => void;
  handleSlotClick: (
    professional: string,
    dayIndex: number,
    time: string,
  ) => void;
  handleMouseDown: (
    professional: string,
    dayIndex: number,
    time: string,
  ) => void;
  handleMouseEnter: (
    professional: string,
    dayIndex: number,
    time: string,
  ) => void;
  handleMouseUp: () => void;
  getAppointmentForSlot: (
    professional: string,
    day: number,
    time: string,
  ) => TAppointment | null;
  getFilteredProfessionals: () => TProfessional[];
  isSlotBlocked: (
    professional: string,
    dayIndex: number,
    time: string,
  ) => boolean;
  isSlotSelected: (
    professional: string,
    dayIndex: number,
    time: string,
  ) => boolean;
  isWorkingDay: (dayIndex: number) => boolean;
  getSlotColor: (appointment: TAppointment | null) => string;
};
