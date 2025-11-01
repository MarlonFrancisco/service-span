import { create } from 'zustand';
import type { INotificationsStore } from './notifications.types';

export const useNotificationsStore = create<INotificationsStore>(() => ({
  notificationsHistory: [],
}));
