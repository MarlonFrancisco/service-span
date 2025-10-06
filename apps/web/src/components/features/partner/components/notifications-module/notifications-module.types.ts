export type TStore = {
  id: string;
  name: string;
  address: string;
};

export type TNotificationPreviewType = 'email' | 'sms';

export type TEmailReminderSettings = {
  enabled: boolean;
  timing: string;
  customMessage: string;
};

export type TSmsReminderSettings = {
  enabled: boolean;
  timing: string;
  customMessage: string;
};

export type TNewBookingNotificationSettings = {
  enabled: boolean;
};

export type TNotificationSettings = {
  unitId: string;
  unitName: string;
  emailReminders: TEmailReminderSettings;
  smsReminders: TSmsReminderSettings;
  newBookingNotifications: TNewBookingNotificationSettings;
};

export type TTimingOption = {
  value: string;
  label: string;
};

export type TPreviewModal = {
  isOpen: boolean;
  type: TNotificationPreviewType;
};

export type TUseNotificationsModuleReturn = {
  // State
  settings: TNotificationSettings;
  showPreviewModal: TPreviewModal;
  activeStore: TStore;
  timingOptions: TTimingOption[];

  // Actions
  updateEmailSettings: (key: string, value: boolean | string) => void;
  updateSmsSettings: (key: string, value: boolean | string) => void;
  updateNewBookingSettings: (enabled: boolean) => void;
  handleSaveSettings: () => void;
  handleOpenPreview: (type: TNotificationPreviewType) => void;
  handleClosePreview: () => void;
};
