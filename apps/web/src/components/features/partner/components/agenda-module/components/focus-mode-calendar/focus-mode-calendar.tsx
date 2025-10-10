'use client';
import { useAgenda } from '@/store/admin/agenda';
import { Alert, AlertDescription, Button, Card, CardContent } from '@repo/ui';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Lock,
  Minimize2,
  Plus,
  Unlock,
  User,
} from 'lucide-react';
import { toast } from 'sonner';
import { AddAppointmentDialog, AppointmentDetailsDialog } from '../index';
import { useCalendarHelpers } from '../weekly-calendar/weekly-calendar.hook';

export function FocusModeCalendar() {
  const {
    currentWeek,
    selectedProfessional,
    isBlockMode,
    blockedSlots,
    workingDays,
    timeSlots,
    professionals,
    setCurrentWeek,
    setSelectedProfessional,
    setIsFocusMode,
    setIsBlockMode,
    setIsAddAppointmentOpen,
    selectedAppointment,
    setSelectedAppointment,
    updateAppointmentStatus,
    deleteAppointment,
  } = useAgenda();

  const {
    weekDates,
    days,
    workingDayKeys,
    getAppointmentForSlot,
    isSlotOccupied,
    getSlotColor,
    getSlotsSpan,
    handleSlotClick,
  } = useCalendarHelpers();

  const filteredProfessionals =
    selectedProfessional === 'all'
      ? professionals
      : professionals.filter((p) => p.id === selectedProfessional);

  const monthYear = weekDates[0].toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFocusMode(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Minimize2 className="h-4 w-4 mr-2" />
            Sair do Modo Focado
          </Button>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-900 capitalize">
              {monthYear}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Professional Selector */}
          <Button variant="outline" size="sm" className="border-gray-300">
            <User className="h-4 w-4 mr-2" />
            {professionals.find((p) => p.id === selectedProfessional)?.name ||
              'Todos'}
          </Button>

          {/* Week Navigation */}
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

          <div className="h-6 w-px bg-gray-200 ml-2" />

          {/* Block Mode Toggle */}
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
                ? 'bg-orange-600 hover:bg-orange-700 text-white ml-2'
                : 'ml-2'
            }
          >
            {isBlockMode ? (
              <Lock className="h-4 w-4 mr-2" />
            ) : (
              <Unlock className="h-4 w-4 mr-2" />
            )}
            {isBlockMode ? 'Desativar' : 'Bloquear'}
          </Button>

          <Button
            onClick={() => setIsAddAppointmentOpen(true)}
            className="bg-black hover:bg-gray-800 text-white"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="h-[calc(100vh-73px)] overflow-auto bg-gray-50 p-6">
        {isBlockMode && (
          <Alert className="border-orange-200 bg-orange-50 mb-4">
            <Lock className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Modo de bloqueio ativado.</strong> Clique nos horários
              vazios para bloquear ou desbloquear.
            </AlertDescription>
          </Alert>
        )}

        <Card className="border-gray-200 py-0">
          <CardContent className="p-0">
            <div className="grid grid-cols-8">
              {/* Time Column */}
              <div className="border-r border-gray-200 bg-gray-50">
                <div className="h-14 border-b border-gray-200 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
                {timeSlots.map((time, index) => (
                  <div
                    key={time}
                    className={`h-16 px-3 flex items-center justify-end text-xs text-gray-500 ${index < timeSlots.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    {time}
                  </div>
                ))}
              </div>

              {/* Day Columns */}
              {days.map((day, dayIndex) => {
                const currentDate = weekDates[dayIndex];
                const isToday =
                  currentDate.toDateString() === new Date().toDateString();
                const dayKey = workingDayKeys[dayIndex];
                const isWorkingDay = workingDays[dayKey];

                return (
                  <div
                    key={dayIndex}
                    className={`border-r border-gray-200 ${!isWorkingDay ? 'bg-gray-50 opacity-60' : ''}`}
                  >
                    {/* Day Header */}
                    <div
                      className={`h-14 border-b border-gray-200 px-3 ${isToday ? 'bg-black text-white' : 'bg-gray-50'}`}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <div
                          className={`text-xs ${isToday ? 'text-white' : 'text-gray-500'}`}
                        >
                          {day}
                        </div>
                        <div
                          className={`${isToday ? 'text-white' : 'text-gray-900'} mt-0.5`}
                        >
                          {currentDate.getDate()}
                        </div>
                      </div>
                    </div>

                    {/* Slots */}
                    <div className="relative overflow-hidden">
                      {!isWorkingDay && (
                        <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center z-10 pointer-events-none">
                          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-sm text-gray-600">
                              Dia não útil
                            </p>
                          </div>
                        </div>
                      )}

                      {filteredProfessionals.map((professional, profIndex) => (
                        <div
                          key={professional.id}
                          className={
                            profIndex > 0
                              ? 'absolute inset-0 top-0 opacity-30 pointer-events-none'
                              : ''
                          }
                        >
                          {timeSlots.map((time, timeIndex) => {
                            if (
                              isSlotOccupied(professional.name, dayIndex, time)
                            ) {
                              return null;
                            }

                            const appointment = getAppointmentForSlot(
                              professional.name,
                              dayIndex,
                              time,
                            );
                            const slotKey = `${professional.id}-${dayIndex}-${time}`;
                            const isBlocked = blockedSlots.has(slotKey);
                            const slotsSpan = appointment
                              ? getSlotsSpan(appointment)
                              : 1;
                            const heightPx = 64 * slotsSpan;
                            const isLastSlot =
                              timeIndex === timeSlots.length - 1;

                            return (
                              <div
                                key={`${professional.id}-${time}`}
                                onClick={() =>
                                  !isWorkingDay
                                    ? null
                                    : handleSlotClick(
                                        professional,
                                        dayIndex,
                                        time,
                                        appointment,
                                      )
                                }
                                className={`px-2 py-1 transition-colors ${!isLastSlot ? 'border-b border-gray-200' : ''} ${!isWorkingDay ? 'cursor-not-allowed' : getSlotColor(appointment, isBlocked)}`}
                                style={{ height: `${heightPx}px` }}
                              >
                                {isBlocked && (
                                  <div className="h-full flex items-center justify-center">
                                    <Lock className="h-4 w-4 text-gray-400" />
                                  </div>
                                )}
                                {appointment && (
                                  <div className="h-full flex flex-col justify-center overflow-hidden">
                                    <div className="text-xs truncate">
                                      {appointment.clientName}
                                    </div>
                                    <div className="text-xs truncate text-gray-600">
                                      {appointment.service}
                                    </div>
                                    {slotsSpan > 1 && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        {appointment.startTime} -{' '}
                                        {appointment.endTime}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

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
    </div>
  );
}
