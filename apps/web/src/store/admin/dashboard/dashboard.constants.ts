import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import type {
  IPerformanceData,
  IRecentActivity,
  IStoreMetrics,
  IUpcomingAppointment,
} from './dashboard.types';

export const INITIAL_METRICS: IStoreMetrics = {
  todayAppointments: 8,
  weeklyRevenue: 3250,
  monthlyTotal: 147,
  averageRating: 4.7,
  pendingBookings: 3,
  completedToday: 5,
  totalCustomers: 342,
  growthRate: 18,
};

export const MOCK_PERFORMANCE_DATA: IPerformanceData[] = [
  { day: 'Seg', appointments: 12, revenue: 580 },
  { day: 'Ter', appointments: 15, revenue: 720 },
  { day: 'Qua', appointments: 10, revenue: 490 },
  { day: 'Qui', appointments: 18, revenue: 850 },
  { day: 'Sex', appointments: 22, revenue: 1050 },
  { day: 'Sáb', appointments: 28, revenue: 1340 },
  { day: 'Dom', appointments: 14, revenue: 670 },
];

export const MOCK_RECENT_ACTIVITY: IRecentActivity[] = [
  {
    id: 1,
    type: 'booking',
    icon: CheckCircle2,
    message: 'Novo agendamento - Maria Silva',
    service: 'Corte e Escova',
    time: '2 min atrás',
    status: 'new',
  },
  {
    id: 2,
    type: 'completion',
    icon: CheckCircle2,
    message: 'Serviço concluído - João Santos',
    service: 'Barba + Corte',
    time: '15 min atrás',
    status: 'completed',
  },
  {
    id: 3,
    type: 'cancellation',
    icon: XCircle,
    message: 'Cancelamento - Ana Costa',
    service: 'Manicure',
    time: '1h atrás',
    status: 'cancelled',
  },
  {
    id: 4,
    type: 'booking',
    icon: AlertCircle,
    message: 'Agendamento pendente - Pedro Lima',
    service: 'Massagem',
    time: '2h atrás',
    status: 'pending',
  },
];

export const MOCK_UPCOMING_APPOINTMENTS: IUpcomingAppointment[] = [
  {
    id: 1,
    client: 'Ana Silva',
    service: 'Corte',
    time: '14:30 - 15:00',
    duration: '30min',
    badge: 'Em 30min',
    badgeColor: 'bg-green-50 text-green-700 border-green-200',
  },
  {
    id: 2,
    client: 'Carlos Moreira',
    service: 'Barba',
    time: '15:00 - 15:30',
    duration: '30min',
    badge: 'Em 1h',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 3,
    client: 'Beatriz Santos',
    service: 'Manicure',
    time: '15:30 - 16:30',
    duration: '1h',
    badge: 'Em 1h30',
    badgeColor: 'bg-gray-100 text-gray-700 border-gray-200',
  },
];
