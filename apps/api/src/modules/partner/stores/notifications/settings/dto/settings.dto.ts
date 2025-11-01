import type { Store } from '../../../store.entity';

export class NotificationsSettingsDto {
  id: string;
  emailReminderEnabled: boolean;
  emailReminderAdvanceHours: string;
  emailReminderCustomMessage: string;

  smsReminderEnabled: boolean;
  smsReminderAdvanceHours: string;
  smsReminderCustomMessage: string;

  store: Partial<Store>;

  constructor(data: Partial<NotificationsSettingsDto>) {
    this.id = data.id;
    this.emailReminderEnabled = data.emailReminderEnabled;
    this.emailReminderAdvanceHours = data.emailReminderAdvanceHours;
    this.emailReminderCustomMessage = data.emailReminderCustomMessage;
    this.smsReminderEnabled = data.smsReminderEnabled;
    this.smsReminderAdvanceHours = data.smsReminderAdvanceHours;
    this.smsReminderCustomMessage = data.smsReminderCustomMessage;
    this.store = data.store;
  }
}
