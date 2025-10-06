import { useCallback, useState } from 'react';
import type {
  TNotificationPreviewType,
  TNotificationSettings,
  TPreviewModal,
  TStore,
  TTimingOption,
  TUseNotificationsModuleReturn,
} from './notifications-module.types';

const MOCK_STORE: TStore = {
  id: '1',
  name: 'Loja 1',
  address: 'Rua 1, 123',
};

const TIMING_OPTIONS: TTimingOption[] = [
  { value: '48h', label: '48 horas antes' },
  { value: '24h', label: '24 horas antes' },
  { value: '12h', label: '12 horas antes' },
  { value: '2h', label: '2 horas antes' },
  { value: '1h', label: '1 hora antes' },
];

const INITIAL_SETTINGS: TNotificationSettings = {
  unitId: MOCK_STORE.id,
  unitName:
    MOCK_STORE.name === 'Centro'
      ? 'Centro'
      : MOCK_STORE.name === 'Shopping Norte'
        ? 'Shopping Norte'
        : 'Zona Sul',
  emailReminders: {
    enabled: true,
    timing: '24h',
    customMessage: 'Estamos ansiosos para atendê-lo!',
  },
  smsReminders: {
    enabled: true,
    timing: '2h',
    customMessage: '',
  },
  newBookingNotifications: {
    enabled: true,
  },
};

export const useNotificationsModule = (): TUseNotificationsModuleReturn => {
  const [settings, setSettings] =
    useState<TNotificationSettings>(INITIAL_SETTINGS);
  const [showPreviewModal, setShowPreviewModal] = useState<TPreviewModal>({
    isOpen: false,
    type: 'email',
  });
  const [activeStore] = useState<TStore>(MOCK_STORE);
  const [timingOptions] = useState<TTimingOption[]>(TIMING_OPTIONS);

  const updateEmailSettings = useCallback(
    (key: string, value: boolean | string) => {
      setSettings((prev) => ({
        ...prev,
        emailReminders: {
          ...prev.emailReminders,
          [key]: value,
        },
      }));
    },
    [],
  );

  const updateSmsSettings = useCallback(
    (key: string, value: boolean | string) => {
      setSettings((prev) => ({
        ...prev,
        smsReminders: {
          ...prev.smsReminders,
          [key]: value,
        },
      }));
    },
    [],
  );

  const updateNewBookingSettings = useCallback((enabled: boolean) => {
    setSettings((prev) => ({
      ...prev,
      newBookingNotifications: {
        enabled,
      },
    }));
  }, []);

  const handleSaveSettings = useCallback(() => {
    // TODO: Implementar integração com API
    alert('Configurações salvas com sucesso!');
  }, []);

  const handleOpenPreview = useCallback((type: TNotificationPreviewType) => {
    setShowPreviewModal({ isOpen: true, type });
  }, []);

  const handleClosePreview = useCallback(() => {
    setShowPreviewModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return {
    settings,
    showPreviewModal,
    activeStore,
    timingOptions,
    updateEmailSettings,
    updateSmsSettings,
    updateNewBookingSettings,
    handleSaveSettings,
    handleOpenPreview,
    handleClosePreview,
  };
};
