export interface IEmailReminder {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  timing: number; // horas antes do agendamento
  subject: string;
  template: string;
}

export interface ISmsReminder {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  timing: number; // horas antes do agendamento
  message: string;
}

export interface INotificationStats {
  emailsSent: number;
  smsSent: number;
  emailRate: number;
  smsRate: number;
}

export interface INotificationsStore {
  // State
  emailReminders: IEmailReminder[];
  smsReminders: ISmsReminder[];
  stats: INotificationStats;
  isPreviewModalOpen: boolean;
  previewContent: string;
  previewType: 'email' | 'sms' | null;

  // Actions
  setIsPreviewModalOpen: (isOpen: boolean) => void;
  setPreviewContent: (content: string, type: 'email' | 'sms') => void;

  // Email Reminders CRUD
  addEmailReminder: (reminder: Omit<IEmailReminder, 'id'>) => void;
  updateEmailReminder: (id: string, reminder: Partial<IEmailReminder>) => void;
  deleteEmailReminder: (id: string) => void;
  toggleEmailReminder: (id: string) => void;

  // SMS Reminders CRUD
  addSmsReminder: (reminder: Omit<ISmsReminder, 'id'>) => void;
  updateSmsReminder: (id: string, reminder: Partial<ISmsReminder>) => void;
  deleteSmsReminder: (id: string) => void;
  toggleSmsReminder: (id: string) => void;
}
