import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Bell, Mail, MessageSquare, Save, Eye } from "lucide-react";
import { NotificationPreviewModal } from "./NotificationPreviewModal";

interface NotificationSettings {
  unitId: string;
  unitName: string;
  emailReminders: {
    enabled: boolean;
    timing: string;
    customMessage: string;
  };
  smsReminders: {
    enabled: boolean;
    timing: string;
    customMessage: string;
  };
  newBookingNotifications: {
    enabled: boolean;
  };
}

interface NotificationsModuleProps {
  activeStore: string;
}

export function NotificationsModule({ activeStore }: NotificationsModuleProps) {
  const [showPreviewModal, setShowPreviewModal] = useState<{
    isOpen: boolean;
    type: 'email' | 'sms';
  }>({
    isOpen: false,
    type: 'email'
  });
  
  // Mock data - substituir por dados reais
  const [settings, setSettings] = useState<NotificationSettings>({
    unitId: activeStore,
    unitName: activeStore === 'centro' ? 'Centro' : activeStore === 'shopping' ? 'Shopping Norte' : 'Zona Sul',
    emailReminders: {
      enabled: true,
      timing: '24h',
      customMessage: 'Estamos ansiosos para atendê-lo!'
    },
    smsReminders: {
      enabled: true,
      timing: '2h',
      customMessage: ''
    },
    newBookingNotifications: {
      enabled: true
    }
  });

  const timingOptions = [
    { value: '48h', label: '48 horas antes' },
    { value: '24h', label: '24 horas antes' },
    { value: '12h', label: '12 horas antes' },
    { value: '2h', label: '2 horas antes' },
    { value: '1h', label: '1 hora antes' }
  ];

  const handleSaveSettings = () => {
    // Implementar salvamento
    alert('Configurações salvas com sucesso!');
  };

  const updateEmailSettings = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      emailReminders: {
        ...prev.emailReminders,
        [key]: value
      }
    }));
  };

  const updateSmsSettings = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      smsReminders: {
        ...prev.smsReminders,
        [key]: value
      }
    }));
  };

  const updateNewBookingSettings = (enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      newBookingNotifications: {
        enabled
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#1a2b4c] mb-2">Configurações de Notificações</h1>
          <p className="text-gray-600">
            Configure os lembretes automáticos e notificações para a unidade <strong>{settings.unitName}</strong>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setShowPreviewModal({ isOpen: true, type: 'email' })}
            className="border-[#20b2aa] text-[#20b2aa] hover:bg-[#20b2aa]/10"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview E-mail
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowPreviewModal({ isOpen: true, type: 'sms' })}
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
            <p className="text-sm text-gray-600">Configurando notificações para:</p>
            <Badge className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white mt-1">
              Unidade {settings.unitName}
            </Badge>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        {/* Email Reminders */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="h-5 w-5 text-[#1a2b4c]" />
            <h3 className="text-lg text-[#1a2b4c]">Lembretes por E-mail</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Ativar lembretes por e-mail</p>
                <p className="text-sm text-gray-500">Envio automático de lembretes para clientes</p>
              </div>
              <Switch
                checked={settings.emailReminders.enabled}
                onCheckedChange={(checked) => updateEmailSettings('enabled', checked)}
                className="data-[state=checked]:bg-[#20b2aa]"
              />
            </div>

            {settings.emailReminders.enabled && (
              <>
                <Separator />
                
                <div className="space-y-3">
                  <label className="text-sm text-gray-700">Tempo de antecedência:</label>
                  <Select 
                    value={settings.emailReminders.timing} 
                    onValueChange={(value) => updateEmailSettings('timing', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tempo" />
                    </SelectTrigger>
                    <SelectContent>
                      {timingOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm text-gray-700">Mensagem personalizada (opcional):</label>
                  <Textarea
                    placeholder="Ex: Estamos ansiosos para atendê-lo! Caso precise remarcar, use o link abaixo."
                    value={settings.emailReminders.customMessage}
                    onChange={(e) => updateEmailSettings('customMessage', e.target.value)}
                    className="min-h-[80px]"
                    maxLength={200}
                  />
                  <p className="text-xs text-gray-500">
                    {settings.emailReminders.customMessage.length}/200 caracteres
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* SMS Reminders */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="h-5 w-5 text-[#1a2b4c]" />
            <h3 className="text-lg text-[#1a2b4c]">Lembretes por SMS</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900">Ativar lembretes por SMS</p>
                <p className="text-sm text-gray-500">Mensagens de texto para maior alcance</p>
              </div>
              <Switch
                checked={settings.smsReminders.enabled}
                onCheckedChange={(checked) => updateSmsSettings('enabled', checked)}
                className="data-[state=checked]:bg-[#20b2aa]"
              />
            </div>

            {settings.smsReminders.enabled && (
              <>
                <Separator />
                
                <div className="space-y-3">
                  <label className="text-sm text-gray-700">Tempo de antecedência:</label>
                  <Select 
                    value={settings.smsReminders.timing} 
                    onValueChange={(value) => updateSmsSettings('timing', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tempo" />
                    </SelectTrigger>
                    <SelectContent>
                      {timingOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm text-gray-700">Mensagem personalizada (opcional):</label>
                  <Textarea
                    placeholder="Ex: Até amanhã! - Equipe Barbearia"
                    value={settings.smsReminders.customMessage}
                    onChange={(e) => updateSmsSettings('customMessage', e.target.value)}
                    className="min-h-[60px]"
                    maxLength={50}
                  />
                  <p className="text-xs text-gray-500">
                    {settings.smsReminders.customMessage.length}/50 caracteres (SMS tem limite menor)
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* New Booking Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-[#1a2b4c]" />
            <h3 className="text-lg text-[#1a2b4c]">Notificações Internas</h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Receber e-mail para novas reservas</p>
              <p className="text-sm text-gray-500">Notificação instantânea quando um cliente agendar</p>
            </div>
            <Switch
              checked={settings.newBookingNotifications.enabled}
              onCheckedChange={updateNewBookingSettings}
              className="data-[state=checked]:bg-[#20b2aa]"
            />
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
        onClose={() => setShowPreviewModal({ ...showPreviewModal, isOpen: false })}
        type={showPreviewModal.type}
        customMessage={
          showPreviewModal.type === 'email' 
            ? settings.emailReminders.customMessage 
            : settings.smsReminders.customMessage
        }
      />
    </div>
  );
}