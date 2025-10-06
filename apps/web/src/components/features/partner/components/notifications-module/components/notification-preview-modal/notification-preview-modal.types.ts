import type { TNotificationPreviewType } from '../../notifications-module.types';

export type TNotificationPreviewModalConfig = {
  isOpen: boolean;
  type: TNotificationPreviewType;
  customMessage: string;
  onClose: () => void;
};
