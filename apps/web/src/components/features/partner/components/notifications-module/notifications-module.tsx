'use client';

import { Badge, Button, Card } from '@repo/ui';
import { Bell, Eye, Save } from 'lucide-react';
import { EmailRemindersCard } from './components/email-reminders-card';
import { NotificationPreviewModal } from './components/notification-preview-modal';
import { SmsRemindersCard } from './components/sms-reminders-card';
import { useNotificationsModule } from './notifications-module.hook';

export const NotificationsModule = () => {
  const {
    settings,
    showPreviewModal,
    timingOptions,
    updateEmailSettings,
    updateSmsSettings,
    updateNewBookingSettings,
    handleSaveSettings,
    handleOpenPreview,
    handleClosePreview,
  } = useNotificationsModule();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#1a2b4c] mb-2">
            Configurações de Notificações
          </h1>
          <p className="text-gray-600">
            Configure os lembretes automáticos e notificações para a unidade{' '}
            <strong>{settings.unitName}</strong>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => handleOpenPreview('email')}
            className="border-[#20b2aa] text-[#20b2aa] hover:bg-[#20b2aa]/10"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview E-mail
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOpenPreview('sms')}
            className="border-[#20b2aa] text-[#20b2aa] hover:bg-[#20b2aa]/10"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview SMS
          </Button>
        </div>
      </div>

      {/* Current Unit Badge */}
      <Card className="p-4 bg-[#20b2aa]/5 border-[#20b2aa]/20">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-[#20b2aa]" />
          <div>
            <p className="text-sm text-gray-600">
              Configurando notificações para:
            </p>
            <Badge className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white mt-1">
              Unidade {settings.unitName}
            </Badge>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        {/* Email Reminders */}
        <EmailRemindersCard
          settings={settings.emailReminders}
          timingOptions={timingOptions}
          onUpdateSettings={updateEmailSettings}
        />

        {/* SMS Reminders */}
        <SmsRemindersCard
          settings={settings.smsReminders}
          timingOptions={timingOptions}
          onUpdateSettings={updateSmsSettings}
        />

        {/* New Booking Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-[#1a2b4c]" />
            <h3 className="text-lg text-[#1a2b4c]">Notificações Internas</h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">
                Receber e-mail para novas reservas
              </p>
              <p className="text-sm text-gray-500">
                Notificação instantânea quando um cliente agendar
              </p>
            </div>
            <Button
              variant={
                settings.newBookingNotifications.enabled ? 'default' : 'outline'
              }
              size="sm"
              onClick={() =>
                updateNewBookingSettings(
                  !settings.newBookingNotifications.enabled,
                )
              }
              className={
                settings.newBookingNotifications.enabled
                  ? 'bg-[#20b2aa] hover:bg-[#20b2aa]/90'
                  : ''
              }
            >
              {settings.newBookingNotifications.enabled ? 'Ativo' : 'Inativo'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveSettings}
          className="bg-[#1a2b4c] hover:bg-[#1a2b4c]/90 text-white px-8"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>

      {/* Preview Modal */}
      <NotificationPreviewModal
        isOpen={showPreviewModal.isOpen}
        type={showPreviewModal.type}
        customMessage={
          showPreviewModal.type === 'email'
            ? settings.emailReminders.customMessage
            : settings.smsReminders.customMessage
        }
        onClose={handleClosePreview}
      />
    </div>
  );
};
