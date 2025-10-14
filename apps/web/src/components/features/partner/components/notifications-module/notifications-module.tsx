'use client';
import {
  Alert,
  AlertDescription,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '@repo/ui';
import {
  BarChart3,
  Bell,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  List,
  Mail,
  MessageSquare,
  Save,
  Search,
  Send,
  Settings as SettingsIcon,
  Smartphone,
  Sparkles,
  Trash2,
  TrendingUp,
  User,
  Users,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { NotificationPreviewModal } from './components/notification-preview-modal';

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
  cancellationNotifications: {
    enabled: boolean;
  };
  marketingNotifications: {
    enabled: boolean;
  };
}

interface Notification {
  id: string;
  type: 'booking' | 'cancellation' | 'reminder' | 'system' | 'marketing';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  recipient?: string;
  status?: 'sent' | 'delivered' | 'failed' | 'pending';
}
const activeStore = 'centro';

export function NotificationsModule() {
  const [activeTab, setActiveTab] = useState<'history' | 'settings'>('history');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [showPreviewModal, setShowPreviewModal] = useState<{
    isOpen: boolean;
    type: 'email' | 'sms';
  }>({
    isOpen: false,
    type: 'email',
  });

  const [settings, setSettings] = useState<NotificationSettings>({
    unitId: activeStore,
    unitName:
      activeStore === 'centro'
        ? 'Centro'
        : activeStore === 'shopping'
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
    cancellationNotifications: {
      enabled: true,
    },
    marketingNotifications: {
      enabled: false,
    },
  });

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'Novo Agendamento',
      message: 'Ana Silva agendou um Corte Feminino para amanhã às 14:00',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      read: false,
      recipient: 'Ana Silva',
      status: 'sent',
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Lembrete Enviado',
      message:
        'Lembrete por SMS enviado para Carlos Moreira sobre agendamento de hoje',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true,
      recipient: 'Carlos Moreira',
      status: 'delivered',
    },
    {
      id: '3',
      type: 'cancellation',
      title: 'Agendamento Cancelado',
      message: 'Pedro Santos cancelou o agendamento de Barba para 15/10',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      read: true,
      recipient: 'Pedro Santos',
      status: 'delivered',
    },
    {
      id: '4',
      type: 'system',
      title: 'Sistema Atualizado',
      message: 'Novos templates de notificação disponíveis',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
      status: 'sent',
    },
    {
      id: '5',
      type: 'booking',
      title: 'Novo Agendamento',
      message: 'Julia Costa agendou uma Escova para quinta-feira às 16:00',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      read: true,
      recipient: 'Julia Costa',
      status: 'sent',
    },
    {
      id: '6',
      type: 'reminder',
      title: 'Lembrete Enviado',
      message: 'Lembrete por E-mail enviado para Maria Silva',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      read: true,
      recipient: 'Maria Silva',
      status: 'delivered',
    },
  ]);

  // Mock statistics
  const stats = {
    sentToday: 47,
    openRate: 78,
    customersReached: 124,
    timeSaved: 3.5,
  };

  const timingOptions = [
    { value: '48h', label: '48 horas antes' },
    { value: '24h', label: '24 horas antes' },
    { value: '12h', label: '12 horas antes' },
    { value: '2h', label: '2 horas antes' },
    { value: '1h', label: '1 hora antes' },
  ];

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-4 w-4" />;
      case 'cancellation':
        return <X className="h-4 w-4" />;
      case 'reminder':
        return <Bell className="h-4 w-4" />;
      case 'system':
        return <SettingsIcon className="h-4 w-4" />;
      case 'marketing':
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'cancellation':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'reminder':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'system':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'marketing':
        return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  const getStatusBadge = (status?: Notification['status']) => {
    if (!status) return null;

    const statusConfig = {
      sent: {
        label: 'Enviada',
        className: 'bg-blue-50 text-blue-700 border-blue-200',
      },
      delivered: {
        label: 'Entregue',
        className: 'bg-green-50 text-green-700 border-green-200',
      },
      failed: {
        label: 'Falhou',
        className: 'bg-red-50 text-red-700 border-red-200',
      },
      pending: {
        label: 'Pendente',
        className: 'bg-orange-50 text-orange-700 border-orange-200',
      },
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={`text-xs ${config.className}`}>
        {config.label}
      </Badge>
    );
  };

  const handleSaveSettings = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  const updateEmailSettings = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      emailReminders: {
        ...prev.emailReminders,
        [key]: value,
      },
    }));
  };

  const updateSmsSettings = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      smsReminders: {
        ...prev.smsReminders,
        [key]: value,
      },
    }));
  };

  const updateNotificationSettings = (key: string, enabled: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: { enabled },
    }));
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n,
      ),
    );
    toast.success('Marcado como lido');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success('Todas as notificações marcadas como lidas');
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter((n) => n.id !== notificationId));
    toast.success('Notificação excluída');
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `${minutes}min atrás`;
    if (hours < 24) return `${hours}h atrás`;
    if (days === 1) return 'Ontem';
    if (days < 7) return `${days} dias atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.recipient?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      filterType === 'all' || notification.type === filterType;
    const matchesStatus =
      filterStatus === 'all' || notification.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Action Button */}
      {unreadCount > 0 && activeTab === 'history' && (
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            className="border-gray-300"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Marcar todas como lidas
          </Button>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Enviadas Hoje</p>
                  <p className="text-3xl text-gray-900">{stats.sentToday}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Send className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Taxa de Abertura</p>
                  <p className="text-3xl text-gray-900">{stats.openRate}%</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Clientes Alcançados
                  </p>
                  <p className="text-3xl text-gray-900">
                    {stats.customersReached}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Tempo Economizado
                  </p>
                  <p className="text-3xl text-gray-900">{stats.timeSaved}h</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Desempenho das Notificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      E-mails Abertos
                    </span>
                    <span className="text-sm text-gray-900">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">SMS Entregues</span>
                    <span className="text-sm text-gray-900">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Confirmações Recebidas
                    </span>
                    <span className="text-sm text-gray-900">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Redução de No-shows
                    </span>
                    <span className="text-sm text-gray-900">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as 'history' | 'settings')}
      >
        <TabsList className="bg-gray-100">
          <TabsTrigger value="history">
            <List className="h-4 w-4 mr-2" />
            Histórico
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-black text-white">{unreadCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings">
            <SettingsIcon className="h-4 w-4 mr-2" />
            Configurações
          </TabsTrigger>
        </TabsList>

        {/* History Tab */}
        <TabsContent value="history" className="mt-6">
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar notificações..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="booking">Agendamentos</SelectItem>
                    <SelectItem value="cancellation">Cancelamentos</SelectItem>
                    <SelectItem value="reminder">Lembretes</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="sent">Enviada</SelectItem>
                    <SelectItem value="delivered">Entregue</SelectItem>
                    <SelectItem value="failed">Falhou</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                <AnimatePresence mode="popLayout">
                  {filteredNotifications.length === 0 ? (
                    <div className="p-12 text-center">
                      <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-gray-900 mb-2">
                        Nenhuma notificação encontrada
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Tente ajustar os filtros de busca
                      </p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          !notification.read ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getNotificationColor(
                              notification.type,
                            )}`}
                          >
                            {getNotificationIcon(notification.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-gray-900">
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                )}
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {getStatusBadge(notification.status)}
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                  {formatTimestamp(notification.timestamp)}
                                </span>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-2">
                              {notification.message}
                            </p>

                            {notification.recipient && (
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <User className="h-3 w-3" />
                                {notification.recipient}
                              </div>
                            )}

                            <div className="flex items-center gap-2 mt-3">
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-7 text-xs"
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Marcar como lida
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                                className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Excluir
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-6 space-y-6">
          {/* Preview Buttons */}
          <div className="flex items-center gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() =>
                setShowPreviewModal({ isOpen: true, type: 'email' })
              }
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview E-mail
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowPreviewModal({ isOpen: true, type: 'sms' })}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview SMS
            </Button>
          </div>

          {/* Email Reminders */}
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-900">
                      Lembretes por E-mail
                    </h3>
                    <p className="text-sm text-gray-600">
                      Envio automático de lembretes para clientes
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.emailReminders.enabled}
                  onCheckedChange={(checked) =>
                    updateEmailSettings('enabled', checked)
                  }
                />
              </div>
            </CardHeader>

            {settings.emailReminders.enabled && (
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <Alert>
                    <Sparkles className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      E-mails têm <strong>82% de taxa de abertura</strong> nesta
                      unidade. Seus clientes preferem receber lembretes 24h
                      antes.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <label className="text-sm text-gray-900">
                      Tempo de antecedência:
                    </label>
                    <Select
                      value={settings.emailReminders.timing}
                      onValueChange={(value) =>
                        updateEmailSettings('timing', value)
                      }
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
                    <label className="text-sm text-gray-900">
                      Mensagem personalizada (opcional):
                    </label>
                    <Textarea
                      placeholder="Ex: Estamos ansiosos para atendê-lo! Caso precise remarcar, use o link abaixo."
                      value={settings.emailReminders.customMessage}
                      onChange={(e) =>
                        updateEmailSettings('customMessage', e.target.value)
                      }
                      className="min-h-[100px] resize-none"
                      maxLength={200}
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {settings.emailReminders.customMessage.length}/200
                        caracteres
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Template Padrão + Personalização
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* SMS Reminders */}
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-900">Lembretes por SMS</h3>
                    <p className="text-sm text-gray-600">
                      Mensagens de texto para maior alcance
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.smsReminders.enabled}
                  onCheckedChange={(checked) =>
                    updateSmsSettings('enabled', checked)
                  }
                />
              </div>
            </CardHeader>

            {settings.smsReminders.enabled && (
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <Alert>
                    <Smartphone className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      SMS têm <strong>95% de taxa de entrega</strong>. Ideal
                      para lembretes de última hora.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <label className="text-sm text-gray-900">
                      Tempo de antecedência:
                    </label>
                    <Select
                      value={settings.smsReminders.timing}
                      onValueChange={(value) =>
                        updateSmsSettings('timing', value)
                      }
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
                    <label className="text-sm text-gray-900">
                      Mensagem personalizada (opcional):
                    </label>
                    <Textarea
                      placeholder="Ex: Até amanhã! - Equipe Barbearia"
                      value={settings.smsReminders.customMessage}
                      onChange={(e) =>
                        updateSmsSettings('customMessage', e.target.value)
                      }
                      className="min-h-[80px] resize-none"
                      maxLength={50}
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {settings.smsReminders.customMessage.length}/50
                        caracteres
                      </p>
                      <Badge
                        variant="outline"
                        className="text-xs border-orange-200 text-orange-700"
                      >
                        Limite de SMS
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Other Notifications */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                Outras Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="text-sm text-gray-900">
                      Novos Agendamentos
                    </h4>
                    <p className="text-xs text-gray-600">
                      Receba notificação instantânea
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.newBookingNotifications.enabled}
                  onCheckedChange={(checked) =>
                    updateNotificationSettings(
                      'newBookingNotifications',
                      checked,
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <X className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="text-sm text-gray-900">Cancelamentos</h4>
                    <p className="text-xs text-gray-600">
                      Seja avisado sobre cancelamentos
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.cancellationNotifications.enabled}
                  onCheckedChange={(checked) =>
                    updateNotificationSettings(
                      'cancellationNotifications',
                      checked,
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="text-sm text-gray-900">Marketing</h4>
                    <p className="text-xs text-gray-600">
                      Novidades e promoções
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.marketingNotifications.enabled}
                  onCheckedChange={(checked) =>
                    updateNotificationSettings(
                      'marketingNotifications',
                      checked,
                    )
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="border-gray-200 bg-gradient-to-br from-gray-50 to-white">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                Dicas para Melhorar o Engajamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <Mail className="h-4 w-4 text-gray-900" />
                  </div>
                  <h4 className="text-sm text-gray-900 mb-1">
                    E-mails Personalizados
                  </h4>
                  <p className="text-xs text-gray-600">
                    Mensagens personalizadas aumentam em 40% a taxa de abertura
                  </p>
                </div>

                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <Clock className="h-4 w-4 text-gray-900" />
                  </div>
                  <h4 className="text-sm text-gray-900 mb-1">
                    Timing Adequado
                  </h4>
                  <p className="text-xs text-gray-600">
                    Envie SMS 2h antes e e-mails 24h antes para melhores
                    resultados
                  </p>
                </div>

                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <CheckCircle className="h-4 w-4 text-gray-900" />
                  </div>
                  <h4 className="text-sm text-gray-900 mb-1">Multi-canal</h4>
                  <p className="text-xs text-gray-600">
                    Combine e-mail e SMS para reduzir no-shows em até 45%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveSettings}
              className="bg-black hover:bg-gray-800 text-white px-8"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Modal */}
      <NotificationPreviewModal
        isOpen={showPreviewModal.isOpen}
        onClose={() =>
          setShowPreviewModal({ ...showPreviewModal, isOpen: false })
        }
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
