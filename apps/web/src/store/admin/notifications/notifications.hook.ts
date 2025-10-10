import { useNotificationsStore } from './notifications.store';

export const useNotifications = () => {
  const store = useNotificationsStore();

  return {
    emailReminders: store.emailReminders,
    smsReminders: store.smsReminders,
    stats: store.stats,
    isPreviewModalOpen: store.isPreviewModalOpen,
    previewContent: store.previewContent,
    previewType: store.previewType,
    setIsPreviewModalOpen: store.setIsPreviewModalOpen,
    setPreviewContent: store.setPreviewContent,
    addEmailReminder: store.addEmailReminder,
    updateEmailReminder: store.updateEmailReminder,
    deleteEmailReminder: store.deleteEmailReminder,
    toggleEmailReminder: store.toggleEmailReminder,
    addSmsReminder: store.addSmsReminder,
    updateSmsReminder: store.updateSmsReminder,
    deleteSmsReminder: store.deleteSmsReminder,
    toggleSmsReminder: store.toggleSmsReminder,
  };
};
