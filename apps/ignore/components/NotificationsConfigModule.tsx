import { useState } from "react";
import { Bell, Mail, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { StoreSelector } from "./StoreSelector";

interface Store {
  id: string;
  name: string;
  address: string;
}

interface NotificationsConfigModuleProps {
  activeStore: Store;
  stores: Store[];
  onStoreChange: (store: Store) => void;
}

export function NotificationsConfigModule({ activeStore, stores, onStoreChange }: NotificationsConfigModuleProps) {
  const [emailReminders, setEmailReminders] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);
  const [emailTiming, setEmailTiming] = useState("24");
  const [smsTiming, setSmsTiming] = useState("24");
  const [customMessage, setCustomMessage] = useState("");
  const [newBookingNotifications, setNewBookingNotifications] = useState(true);

  const timingOptions = [
    { value: "48", label: "48 horas antes" },
    { value: "24", label: "24 horas antes" },
    { value: "12", label: "12 horas antes" },
    { value: "6", label: "6 horas antes" },
    { value: "2", label: "2 horas antes" },
    { value: "1", label: "1 hora antes" },
  ];

  return (
    <div className="space-y-6">
      {/* Header com Seletor de Unidade */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#1a2b4c]/10 rounded-lg flex items-center justify-center">
              <Bell className="h-5 w-5 text-[#1a2b4c]" />
            </div>
            <div>
              <h2 className="text-[#1a2b4c] text-lg">Configurações de Notificações</h2>
              <p className="text-sm text-gray-600">Configure lembretes e comunicações automáticas</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Label className="text-sm text-gray-700">Configurações para:</Label>
          <div className="min-w-[200px]">
            <StoreSelector 
              stores={stores}
              activeStore={activeStore}
              onStoreChange={onStoreChange}
            />
          </div>
          <Badge variant="outline" className="text-[#20b2aa] border-[#20b2aa]/30">
            Unidade Ativa
          </Badge>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Configuração de Lembretes por E-mail */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-[#1a2b4c]">Lembretes por E-mail</CardTitle>
                <CardDescription>Configure lembretes automáticos enviados por e-mail aos clientes</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label className="text-sm">Ativar lembretes por e-mail</Label>
                <p className="text-xs text-gray-600 mt-1">Enviar lembretes automáticos antes dos agendamentos</p>
              </div>
              <Switch checked={emailReminders} onCheckedChange={setEmailReminders} />
            </div>

            {emailReminders && (
              <div className="space-y-4 pl-4 border-l-2 border-blue-100">
                <div>
                  <Label className="text-sm text-gray-700 mb-2 block">Tempo de antecedência</Label>
                  <Select value={emailTiming} onValueChange={setEmailTiming}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
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

                <div>
                  <Label className="text-sm text-gray-700 mb-2 block">Mensagem personalizada (opcional)</Label>
                  <Textarea
                    placeholder="Adicione uma mensagem personalizada que aparecerá no e-mail..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Esta mensagem será incluída no corpo do e-mail de lembrete
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Configuração de Lembretes por SMS */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-green-50 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-[#1a2b4c]">Lembretes por SMS</CardTitle>
                <CardDescription>Configure lembretes automáticos enviados por SMS aos clientes</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label className="text-sm">Ativar lembretes por SMS</Label>
                <p className="text-xs text-gray-600 mt-1">Enviar lembretes automáticos por mensagem de texto</p>
              </div>
              <Switch checked={smsReminders} onCheckedChange={setSmsReminders} />
            </div>

            {smsReminders && (
              <div className="space-y-4 pl-4 border-l-2 border-green-100">
                <div>
                  <Label className="text-sm text-gray-700 mb-2 block">Tempo de antecedência</Label>
                  <Select value={smsTiming} onValueChange={setSmsTiming}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
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

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-yellow-800">Limite de caracteres</p>
                      <p className="text-xs text-yellow-700">
                        SMS são limitados a 160 caracteres. Mensagens personalizadas não são suportadas para SMS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notificações Internas */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-[#20b2aa]/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-[#20b2aa]" />
              </div>
              <div>
                <CardTitle className="text-[#1a2b4c]">Notificações Internas</CardTitle>
                <CardDescription>Configure notificações que você receberá sobre novos agendamentos</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Checkbox 
                id="new-booking-notifications"
                checked={newBookingNotifications}
                onCheckedChange={setNewBookingNotifications}
              />
              <div className="flex-1">
                <Label htmlFor="new-booking-notifications" className="text-sm">
                  Receber e-mail para cada nova reserva
                </Label>
                <p className="text-xs text-gray-600 mt-1">
                  Você receberá um e-mail instantâneo sempre que um novo agendamento for feito
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Summary */}
        <Card className="bg-[#20b2aa]/5 border-[#20b2aa]/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-[#20b2aa] mt-0.5" />
              <div>
                <h3 className="text-sm text-[#1a2b4c] mb-2">Resumo das Configurações</h3>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>• Lembretes por e-mail: {emailReminders ? `Ativo (${emailTiming}h antes)` : 'Desativado'}</p>
                  <p>• Lembretes por SMS: {smsReminders ? `Ativo (${smsTiming}h antes)` : 'Desativado'}</p>
                  <p>• Notificações de nova reserva: {newBookingNotifications ? 'Ativo' : 'Desativado'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}