import {
  Card,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Switch,
  Textarea,
} from '@repo/ui';
import { Mail } from 'lucide-react';
import type { TEmailRemindersCardConfig } from './email-reminders-card.types';

export const EmailRemindersCard = ({
  settings,
  timingOptions,
  onUpdateSettings,
}: TEmailRemindersCardConfig) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="h-5 w-5 text-[#1a2b4c]" />
        <h3 className="text-lg text-[#1a2b4c]">Lembretes por E-mail</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-900">Ativar lembretes por e-mail</p>
            <p className="text-sm text-gray-500">
              Envio automático de lembretes para clientes
            </p>
          </div>
          <Switch
            checked={settings.enabled}
            onCheckedChange={(checked) => onUpdateSettings('enabled', checked)}
            className="data-[state=checked]:bg-[#20b2aa]"
          />
        </div>

        {settings.enabled && (
          <>
            <Separator />

            <div className="space-y-3">
              <label className="text-sm text-gray-700">
                Tempo de antecedência:
              </label>
              <Select
                value={settings.timing}
                onValueChange={(value) => onUpdateSettings('timing', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o tempo" />
                </SelectTrigger>
                <SelectContent>
                  {timingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm text-gray-700">
                Mensagem personalizada (opcional):
              </label>
              <Textarea
                placeholder="Ex: Estamos ansiosos para atendê-lo! Caso precise remarcar, use o link abaixo."
                value={settings.customMessage}
                onChange={(e) =>
                  onUpdateSettings('customMessage', e.target.value)
                }
                className="min-h-[80px]"
                maxLength={200}
              />
              <p className="text-xs text-gray-500">
                {settings.customMessage.length}/200 caracteres
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
