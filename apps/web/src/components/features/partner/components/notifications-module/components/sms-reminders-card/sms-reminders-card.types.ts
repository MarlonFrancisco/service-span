import type {
  TSmsReminderSettings,
  TTimingOption,
} from '../../notifications-module.types';

export type TSmsRemindersCardConfig = {
  settings: TSmsReminderSettings;
  timingOptions: TTimingOption[];
  onUpdateSettings: (key: string, value: boolean | string) => void;
};
