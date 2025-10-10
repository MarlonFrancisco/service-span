'use client';
import { useAgenda } from '@/store/admin/agenda';
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui';
import {
  CalendarCheck,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Lock,
  Maximize2,
  Plus,
  Settings,
  TrendingUp,
  Unlock,
  User,
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { AddAppointmentDialog } from './components/add-appointment-dialog';
import { AppointmentDetailsDialog } from './components/appointment-details-dialog';
import { FocusModeCalendar } from './components/focus-mode-calendar';
import { SettingsDialog } from './components/settings-dialog';
import { WeeklyCalendar } from './components/weekly-calendar';

export function AgendaModule() {
  const {
    currentWeek,
    selectedProfessional,
    selectedAppointment,
    isFocusMode,
    isBlockMode,
    todayAppointments,
    completedToday,
    todayRevenue,
    weeklyAppointments,
    professionals,
    setCurrentWeek,
    setSelectedProfessional,
    setSelectedAppointment,
    setIsSettingsOpen,
    setIsAddAppointmentOpen,
    setIsFocusMode,
    setIsBlockMode,
    updateAppointmentStatus,
    deleteAppointment,
  } = useAgenda();

  // Focus Mode
  if (isFocusMode) {
    return <FocusModeCalendar />;
  }

  // Normal Mode
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Hoje</p>
                  <p className="text-2xl text-gray-900">{todayAppointments}</p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Concluídos</p>
                  <p className="text-2xl text-gray-900">{completedToday}</p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Receita Hoje</p>
                  <p className="text-2xl text-gray-900">R$ {todayRevenue}</p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Semana</p>
                  <p className="text-2xl text-gray-900">{weeklyAppointments}</p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-gray-900" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Block Mode Alert */}
      {isBlockMode && (
        <Alert className="border-orange-200 bg-orange-50">
          <Lock className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Modo de bloqueio ativado.</strong> Clique nos horários
            vazios para bloquear ou desbloquear.
          </AlertDescription>
        </Alert>
      )}

      {/* Action Buttons and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          {/* Professional Filter */}
          <Select
            value={selectedProfessional}
            onValueChange={setSelectedProfessional}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filtrar profissional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Todos os profissionais
                </div>
              </SelectItem>
              {professionals.map((prof) => (
                <SelectItem key={prof.id} value={prof.id}>
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 bg-${prof.color}-500`}
                    />
                    {prof.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Week Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(currentWeek - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(0)}
              disabled={currentWeek === 0}
            >
              Hoje
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(currentWeek + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          <Button
            variant={isBlockMode ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setIsBlockMode(!isBlockMode);
              if (!isBlockMode) {
                toast.info('Modo de bloqueio ativado');
              }
            }}
            className={
              isBlockMode
                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                : 'border-gray-300'
            }
          >
            {isBlockMode ? (
              <Lock className="h-4 w-4 sm:mr-2" />
            ) : (
              <Unlock className="h-4 w-4 sm:mr-2" />
            )}
            <span className="hidden sm:inline">
              {isBlockMode ? 'Desativar Bloqueio' : 'Bloquear Horários'}
            </span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFocusMode(true)}
            className="border-gray-300"
          >
            <Maximize2 className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Modo Focado</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSettingsOpen(true)}
            className="border-gray-300 hidden md:inline-flex"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>

          <Button
            onClick={() => setIsAddAppointmentOpen(true)}
            className="bg-black hover:bg-gray-800 text-white"
            size="sm"
          >
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Novo Agendamento</span>
          </Button>
        </div>
      </div>

      {/* Weekly Calendar */}
      <WeeklyCalendar />

      {/* Dialogs */}
      {selectedAppointment && (
        <AppointmentDetailsDialog
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onStatusChange={updateAppointmentStatus}
          onDelete={deleteAppointment}
        />
      )}

      <AddAppointmentDialog />
      <SettingsDialog />
    </div>
  );
}
