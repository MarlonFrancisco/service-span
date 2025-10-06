import type {
  TEmailReminderSettings,
  TTimingOption,
} from '../../notifications-module.types';

export type TEmailRemindersCardConfig = {
  settings: TEmailReminderSettings;
  timingOptions: TTimingOption[];
  onUpdateSettings: (key: string, value: boolean | string) => void;
};
