import { create } from 'zustand';
import {
  INITIAL_STATS,
  MOCK_EMAIL_REMINDERS,
  MOCK_SMS_REMINDERS,
} from './notifications.constants';
import type {
  IEmailReminder,
  INotificationsStore,
  ISmsReminder,
} from './notifications.types';

export const useNotificationsStore = create<INotificationsStore>((set) => ({
  // State
  emailReminders: MOCK_EMAIL_REMINDERS,
  smsReminders: MOCK_SMS_REMINDERS,
  stats: INITIAL_STATS,
  isPreviewModalOpen: false,
  previewContent: '',
  previewType: null,

  // Actions
  setIsPreviewModalOpen: (isOpen: boolean) =>
    set({ isPreviewModalOpen: isOpen }),

  setPreviewContent: (content: string, type: 'email' | 'sms') =>
    set({
      previewContent: content,
      previewType: type,
      isPreviewModalOpen: true,
    }),

  // Email Reminders CRUD
  addEmailReminder: (reminder: Omit<IEmailReminder, 'id'>) => {
    set((state) => ({
      emailReminders: [
        ...state.emailReminders,
        { ...reminder, id: String(Date.now()) },
      ],
    }));
  },

  updateEmailReminder: (id: string, reminder: Partial<IEmailReminder>) => {
    set((state) => ({
      emailReminders: state.emailReminders.map((r) =>
        r.id === id ? { ...r, ...reminder } : r,
      ),
    }));
  },

  deleteEmailReminder: (id: string) => {
    set((state) => ({
      emailReminders: state.emailReminders.filter((r) => r.id !== id),
    }));
  },

  toggleEmailReminder: (id: string) => {
    set((state) => ({
      emailReminders: state.emailReminders.map((r) =>
        r.id === id ? { ...r, enabled: !r.enabled } : r,
      ),
    }));
  },

  // SMS Reminders CRUD
  addSmsReminder: (reminder: Omit<ISmsReminder, 'id'>) => {
    set((state) => ({
      smsReminders: [
        ...state.smsReminders,
        { ...reminder, id: String(Date.now()) },
      ],
    }));
  },

  updateSmsReminder: (id: string, reminder: Partial<ISmsReminder>) => {
    set((state) => ({
      smsReminders: state.smsReminders.map((r) =>
        r.id === id ? { ...r, ...reminder } : r,
      ),
    }));
  },

  deleteSmsReminder: (id: string) => {
    set((state) => ({
      smsReminders: state.smsReminders.filter((r) => r.id !== id),
    }));
  },

  toggleSmsReminder: (id: string) => {
    set((state) => ({
      smsReminders: state.smsReminders.map((r) =>
        r.id === id ? { ...r, enabled: !r.enabled } : r,
      ),
    }));
  },
}));
