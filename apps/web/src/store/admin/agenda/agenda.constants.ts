import type {
  IAppointment,
  IAppointmentFormData,
  IProfessional,
  IScheduleService,
  IWorkingDays,
  IWorkingHours,
} from './agenda.types';

export const INITIAL_WORKING_DAYS: IWorkingDays = {
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: true,
  sunday: false,
};

export const INITIAL_WORKING_HOURS: IWorkingHours = {
  start: '09:00',
  end: '18:00',
  lunchStart: '12:00',
  lunchEnd: '13:00',
};

export const INITIAL_APPOINTMENT_FORM: IAppointmentFormData = {
  clientName: '',
  clientPhone: '',
  clientEmail: '',
  service: '',
  professional: '',
  date: '',
  startTime: '',
  duration: '60',
  notes: '',
};

export const MOCK_PROFESSIONALS: IProfessional[] = [
  { id: '1', name: 'Maria Silva', specialty: 'Cabeleireira', color: 'blue' },
  { id: '2', name: 'João Santos', specialty: 'Barbeiro', color: 'purple' },
  { id: '3', name: 'Ana Costa', specialty: 'Esteticista', color: 'pink' },
];

export const MOCK_SERVICES: IScheduleService[] = [
  { id: '1', name: 'Corte Feminino', duration: 60, price: 65 },
  { id: '2', name: 'Corte Masculino', duration: 30, price: 35 },
  { id: '3', name: 'Escova', duration: 45, price: 45 },
  { id: '4', name: 'Barba', duration: 30, price: 25 },
  { id: '5', name: 'Limpeza de Pele', duration: 90, price: 120 },
];

export const MOCK_APPOINTMENTS: IAppointment[] = [
  {
    id: '1',
    clientName: 'Ana Silva',
    clientPhone: '(11) 98765-4321',
    clientEmail: 'ana@email.com',
    service: 'Corte + Escova',
    professional: 'Maria Silva',
    startTime: '10:00',
    endTime: '11:00',
    date: new Date().toISOString().split('T')[0],
    status: 'scheduled',
    price: 85,
    notes: 'Cliente preferencial, cabelo longo',
  },
  {
    id: '2',
    clientName: 'Carlos Moreira',
    clientPhone: '(11) 97654-3210',
    service: 'Barba',
    professional: 'João Santos',
    startTime: '14:30',
    endTime: '15:00',
    date: new Date().toISOString().split('T')[0],
    status: 'scheduled',
    price: 35,
  },
  {
    id: '3',
    clientName: 'Lucia Santos',
    clientPhone: '(11) 96543-2109',
    clientEmail: 'lucia@email.com',
    service: 'Limpeza de Pele',
    professional: 'Ana Costa',
    startTime: '16:00',
    endTime: '17:30',
    date: new Date().toISOString().split('T')[0],
    status: 'completed',
    price: 120,
  },
  {
    id: '4',
    clientName: 'Pedro Oliveira',
    service: 'Corte Masculino',
    professional: 'João Santos',
    startTime: '10:00',
    endTime: '10:30',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    status: 'scheduled',
    price: 35,
  },
  {
    id: '5',
    clientName: 'Julia Costa',
    clientPhone: '(11) 95432-1098',
    service: 'Escova',
    professional: 'Maria Silva',
    startTime: '14:00',
    endTime: '14:45',
    date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    status: 'scheduled',
    price: 45,
  },
];
