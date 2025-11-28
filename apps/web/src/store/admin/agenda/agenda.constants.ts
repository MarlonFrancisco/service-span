import type { IAppointment } from '@/types/api/schedule.types';
import type { IService } from '@/types/api/service.types';
import type { IProfessional } from '@/types/api/users.types';
import type {
  TWorkingDayKey,
  TWorkingDays,
  TWorkingHours,
} from './agenda.types';

export const AGENDA_PROFESSIONALS: IProfessional[] = [
  {
    id: '1',
    role: 'professional',
    isActive: true,
    blockedTimes: [],
    user: {
      id: '1',
      firstName: 'Maria',
      lastName: 'Silva',
      email: 'maria@email.com',
      telephone: '(11) 98765-4321',
      avatar: 'https://via.placeholder.com/150',
    },
    createdAt: new Date(),
  },
  {
    id: '2',
    role: 'professional',
    isActive: true,
    blockedTimes: [],
    user: {
      id: '2',
      firstName: 'João',
      lastName: 'Santos',
      email: 'joao@email.com',
      telephone: '(11) 97654-3210',
      avatar: 'https://via.placeholder.com/150',
    },
    createdAt: new Date(),
  },
  {
    id: '3',
    role: 'professional',
    isActive: true,
    blockedTimes: [],
    user: {
      id: '3',
      firstName: 'Ana',
      lastName: 'Costa',
      email: 'ana@email.com',
      telephone: '(11) 96543-2109',
      avatar: 'https://via.placeholder.com/150',
    },
    createdAt: new Date(),
  },
];

export const AGENDA_SERVICES: IService[] = [
  {
    id: '1',
    name: 'Corte Feminino',
    duration: 60,
    price: 65,
    description: 'Corte feminino',
    isActive: true,
  },
  {
    id: '2',
    name: 'Corte Masculino',
    duration: 30,
    price: 35,
    description: 'Corte masculino',
    isActive: true,
  },
  {
    id: '3',
    name: 'Escova',
    duration: 45,
    price: 45,
    description: 'Escova',
    isActive: true,
  },
  {
    id: '4',
    name: 'Barba',
    duration: 30,
    price: 25,
    description: 'Barba',
    isActive: true,
  },
  {
    id: '5',
    name: 'Limpeza de Pele',
    duration: 90,
    price: 120,
    description: 'Limpeza de Pele',
    isActive: true,
  },
];

export const AGENDA_DAYS: string[] = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo',
];

export const AGENDA_WORKING_DAY_KEYS: readonly TWorkingDayKey[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

export const INITIAL_WORKING_DAYS: TWorkingDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

export const INITIAL_WORKING_HOURS: TWorkingHours = {
  openTime: '09:00',
  closeTime: '18:00',
  lunchStartTime: '12:00',
  lunchEndTime: '13:00',
};

export const INITIAL_APPOINTMENT_FORM: IAppointment = {
  id: '',
  startTime: '',
  endTime: '',
  date: '',
  status: 'scheduled',
  price: 0,
  notes: '',
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    avatar: '',
  },
  service: {
    id: '',
    name: '',
    duration: 0,
    price: 0,
    description: '',
    isActive: true,
  },
  storeMember: {
    id: '',
    role: 'professional',
    isActive: true,
    createdAt: new Date(),
    blockedTimes: [],
    user: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      telephone: '',
      avatar: '',
    },
  },
};

export const INITIAL_APPOINTMENTS: IAppointment[] = [
  {
    id: '1',
    user: {
      id: '1',
      firstName: 'Ana',
      lastName: 'Silva',
      email: 'ana@email.com',
      telephone: '(11) 98765-4321',
      avatar: 'https://via.placeholder.com/150',
      favorites: [],
      schedules: [],
      createdAt: new Date(),
    },
    service: {
      id: '1',
      name: 'Corte + Escova',
      duration: 60,
      price: 85,
      description: 'Corte + Escova',
      isActive: true,
    },
    storeMember: {
      id: '1',
      role: 'professional',
      isActive: true,
      createdAt: new Date(),
      blockedTimes: [],
      user: {
        id: '1',
        email: 'maria@email.com',
        firstName: 'Maria',
        lastName: 'Silva',
        telephone: '(11) 98765-4321',
      },
    },
    startTime: '10:00',
    endTime: '11:00',
    date: '2025-01-01',
    status: 'scheduled',
    price: 85,
    notes: 'Cliente preferencial, cabelo longo',
  },
];
