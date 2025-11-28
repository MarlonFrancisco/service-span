export type TNotificationStatus = 'sent' | 'delivered' | 'failed' | 'pending';
export type TNotificationType =
  | 'booking'
  | 'cancellation'
  | 'reminder'
  | 'system'
  | 'marketing';

export interface INotificationsHistory {
  id: string;
  type: TNotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  recipient?: string;
  status?: TNotificationStatus;
}

export interface INotificationsSettings {
  id: string;
  emailReminderEnabled: boolean;
  emailReminderAdvanceHours: string;
  emailReminderCustomMessage: string;
  smsReminderEnabled: boolean;
  smsReminderAdvanceHours: string;
  smsReminderCustomMessage: string;
  whatsappReminderEnabled: boolean;
  whatsappReminderAdvanceHours: string;
  whatsappReminderCustomMessage: string;
}

export interface INotificationsHistoryResponse {
  data: INotificationsHistory[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
