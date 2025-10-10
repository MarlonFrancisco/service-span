import type {
  IEmailReminder,
  INotificationStats,
  ISmsReminder,
} from './notifications.types';

export const INITIAL_STATS: INotificationStats = {
  emailsSent: 1247,
  smsSent: 892,
  emailRate: 94,
  smsRate: 87,
};

export const MOCK_EMAIL_REMINDERS: IEmailReminder[] = [
  {
    id: '1',
    name: 'Lembrete 24h antes',
    description: 'Email enviado 24 horas antes do agendamento',
    enabled: true,
    timing: 24,
    subject: 'Lembre-se do seu agendamento amanhã',
    template:
      'Olá {{clientName}}, você tem um agendamento amanhã às {{time}} para {{service}}.',
  },
  {
    id: '2',
    name: 'Lembrete 2h antes',
    description: 'Email enviado 2 horas antes do agendamento',
    enabled: true,
    timing: 2,
    subject: 'Seu agendamento é em breve',
    template:
      'Olá {{clientName}}, em 2 horas você tem agendamento para {{service}}.',
  },
];

export const MOCK_SMS_REMINDERS: ISmsReminder[] = [
  {
    id: '1',
    name: 'SMS 24h antes',
    description: 'SMS enviado 24 horas antes',
    enabled: true,
    timing: 24,
    message: 'Olá {{clientName}}! Lembre-se: amanhã às {{time}} - {{service}}',
  },
  {
    id: '2',
    name: 'SMS 1h antes',
    description: 'SMS enviado 1 hora antes',
    enabled: false,
    timing: 1,
    message: 'Em 1 hora você tem agendamento - {{service}} às {{time}}',
  },
];
