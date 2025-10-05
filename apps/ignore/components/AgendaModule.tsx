import { useState, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  X,
  CheckCircle,
  RotateCcw,
  Settings,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Store {
  id: string;
  name: string;
  address: string;
}

interface AgendaModuleProps {
  activeStore: Store;
}

interface Appointment {
  id: string;
  clientName: string;
  service: string;
  professional: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  price: number;
}

export function AgendaModule({ activeStore }: AgendaModuleProps) {
  const [viewType, setViewType] = useState<'week' | 'day' | 'month'>('week');
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedProfessional, setSelectedProfessional] =
    useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartSlot, setDragStartSlot] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const [blockedSlots, setBlockedSlots] = useState<Set<string>>(new Set());
  const dragRef = useRef<boolean>(false);

  const [workingDays, setWorkingDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: false,
  });

  const professionals = [
    { id: '1', name: 'Maria Silva', specialty: 'Cabeleireira' },
    { id: '2', name: 'João Santos', specialty: 'Barbeiro' },
    { id: '3', name: 'Ana Costa', specialty: 'Esteticista' },
  ];

  const timeSlots = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
  ];

  const mockAppointments: Appointment[] = [
    {
      id: '1',
      clientName: 'Ana Silva',
      service: 'Corte + Escova',
      professional: 'Maria Silva',
      startTime: '10:00',
      endTime: '11:00',
      status: 'scheduled',
      price: 85,
    },
    {
      id: '2',
      clientName: 'Carlos Moreira',
      service: 'Barba',
      professional: 'João Santos',
      startTime: '14:30',
      endTime: '15:00',
      status: 'scheduled',
      price: 35,
    },
    {
      id: '3',
      clientName: 'Lucia Santos',
      service: 'Limpeza de Pele',
      professional: 'Ana Costa',
      startTime: '16:00',
      endTime: '17:30',
      status: 'completed',
      price: 120,
    },
  ];

  const days = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ];
  const workingDayKeys = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ] as const;

  const getAppointmentForSlot = (
    professional: string,
    day: number,
    time: string,
  ) => {
    // Mock logic - in real app this would filter by date
    if (professional === 'Maria Silva' && day === 0 && time === '10:00') {
      return mockAppointments[0];
    }
    if (professional === 'João Santos' && day === 3 && time === '14:30') {
      return mockAppointments[1];
    }
    if (professional === 'Ana Costa' && day === 4 && time === '16:00') {
      return mockAppointments[2];
    }
    return null;
  };

  const getSlotColor = (appointment: Appointment | null) => {
    if (!appointment)
      return 'bg-[#20b2aa]/10 hover:bg-[#20b2aa]/20 border-[#20b2aa]/30';

    switch (appointment.status) {
      case 'scheduled':
        return 'bg-[#1a2b4c]/20 border-[#1a2b4c]/40 text-[#1a2b4c]';
      case 'completed':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'cancelled':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const handleAppointmentAction = (
    action: 'complete' | 'cancel' | 'reschedule',
  ) => {
    if (!selectedAppointment) return;

    console.log(`${action} appointment:`, selectedAppointment);
    setSelectedAppointment(null);
  };

  const handleMouseDown = useCallback(
    (professional: string, dayIndex: number, time: string) => {
      const appointment = getAppointmentForSlot(professional, dayIndex, time);
      if (appointment) return; // Can't modify booked slots

      const slotId = `${professional}-${dayIndex}-${time}`;
      setIsDragging(true);
      setDragStartSlot(slotId);
      dragRef.current = true;

      // Start selection
      setSelectedSlots(new Set([slotId]));
    },
    [],
  );

  const handleMouseEnter = useCallback(
    (professional: string, dayIndex: number, time: string) => {
      if (!dragRef.current) return;

      const appointment = getAppointmentForSlot(professional, dayIndex, time);
      if (appointment) return; // Can't modify booked slots

      const slotId = `${professional}-${dayIndex}-${time}`;
      // Add to selection during drag
      setSelectedSlots((prev) => new Set([...prev, slotId]));
    },
    [],
  );

  const handleMouseUp = useCallback(() => {
    if (!dragRef.current) return;

    // Apply blocking to selected slots
    setBlockedSlots((prev) => new Set([...prev, ...selectedSlots]));

    // Reset drag state
    setIsDragging(false);
    setDragStartSlot(null);
    setSelectedSlots(new Set());
    dragRef.current = false;
  }, [selectedSlots]);

  const handleSlotClick = (
    professional: string,
    dayIndex: number,
    time: string,
  ) => {
    if (isDragging) return;

    const appointment = getAppointmentForSlot(professional, dayIndex, time);
    if (appointment) {
      setSelectedAppointment(appointment);
      return;
    }

    const slotId = `${professional}-${dayIndex}-${time}`;
    // Toggle block status on single click
    setBlockedSlots((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(slotId)) {
        newSet.delete(slotId);
      } else {
        newSet.add(slotId);
      }
      return newSet;
    });
  };

  const isSlotBlocked = (
    professional: string,
    dayIndex: number,
    time: string,
  ) => {
    const slotId = `${professional}-${dayIndex}-${time}`;
    return blockedSlots.has(slotId);
  };

  const isSlotSelected = (
    professional: string,
    dayIndex: number,
    time: string,
  ) => {
    const slotId = `${professional}-${dayIndex}-${time}`;
    return selectedSlots.has(slotId);
  };

  const isWorkingDay = (dayIndex: number) => {
    return workingDays[workingDayKeys[dayIndex]];
  };

  const getFilteredProfessionals = () => {
    if (selectedProfessional === 'all') {
      return professionals;
    }
    return professionals.filter((p) => p.id === selectedProfessional);
  };

  const renderCalendarView = () => {
    const filteredProfessionals = getFilteredProfessionals();

    if (viewType === 'day') {
      return renderDayView(filteredProfessionals);
    } else if (viewType === 'month') {
      return renderMonthView(filteredProfessionals);
    }
    return renderWeekView(filteredProfessionals);
  };

  const renderWeekView = (professionalsToShow: typeof professionals) => (
    <div
      className="overflow-x-auto"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="min-w-[800px]">
        {/* Header with days */}
        <div className="grid grid-cols-8 gap-1 mb-4">
          <div className="p-3 text-sm text-gray-600">Profissional</div>
          {days.map((day, index) => {
            const isWorking = isWorkingDay(index);
            return (
              <div
                key={day}
                className={`p-3 text-center ${!isWorking ? 'opacity-50' : ''}`}
              >
                <div className="text-sm text-[#1a2b4c]">{day}</div>
                <div className="text-xs text-gray-500">
                  {new Date(
                    Date.now() +
                      (currentWeek * 7 + index) * 24 * 60 * 60 * 1000,
                  ).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                  })}
                </div>
                {!isWorking && (
                  <div className="text-xs text-red-500">Fechado</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Professional rows */}
        {professionalsToShow.map((professional) => (
          <div key={professional.id} className="mb-6">
            <div className="grid grid-cols-8 gap-1">
              {/* Professional info */}
              <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                <div>
                  <div className="text-sm text-[#1a2b4c]">
                    {professional.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {professional.specialty}
                  </div>
                </div>
              </div>

              {/* Time slots for each day */}
              {days.map((day, dayIndex) => {
                const isWorking = isWorkingDay(dayIndex);

                return (
                  <div
                    key={dayIndex}
                    className={`space-y-1 ${!isWorking ? 'opacity-50' : ''}`}
                  >
                    {timeSlots.slice(0, 8).map((time) => {
                      const appointment = getAppointmentForSlot(
                        professional.name,
                        dayIndex,
                        time,
                      );
                      const isBlocked = isSlotBlocked(
                        professional.name,
                        dayIndex,
                        time,
                      );
                      const isSelected = isSlotSelected(
                        professional.name,
                        dayIndex,
                        time,
                      );

                      let slotClass = '';
                      if (!isWorking) {
                        slotClass =
                          'bg-gray-200 border-gray-300 cursor-not-allowed';
                      } else if (appointment) {
                        slotClass = getSlotColor(appointment);
                      } else if (isBlocked) {
                        slotClass = 'bg-gray-300 border-gray-400 text-gray-600';
                      } else if (isSelected) {
                        slotClass =
                          'bg-[#1a2b4c]/30 border-[#1a2b4c] ring-2 ring-[#1a2b4c]/50';
                      } else {
                        slotClass =
                          'bg-[#20b2aa]/10 hover:bg-[#20b2aa]/20 border-[#20b2aa]/30';
                      }

                      return (
                        <div
                          key={time}
                          className={`
                            min-h-[40px] p-2 rounded border cursor-pointer transition-colors text-xs select-none
                            ${slotClass}
                          `}
                          onMouseDown={() =>
                            isWorking &&
                            handleMouseDown(professional.name, dayIndex, time)
                          }
                          onMouseEnter={() =>
                            isWorking &&
                            handleMouseEnter(professional.name, dayIndex, time)
                          }
                          onClick={() =>
                            isWorking &&
                            handleSlotClick(professional.name, dayIndex, time)
                          }
                        >
                          <div className="text-xs text-gray-600">{time}</div>
                          {appointment && (
                            <div className="mt-1">
                              <div className="truncate">
                                {appointment.clientName}
                              </div>
                              <div className="text-xs opacity-75 truncate">
                                {appointment.service}
                              </div>
                            </div>
                          )}
                          {isBlocked && !appointment && (
                            <div className="text-xs text-center mt-1">
                              Bloqueado
                            </div>
                          )}
                          {!isWorking && (
                            <div className="text-xs text-center mt-1">
                              Fechado
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDayView = (professionalsToShow: typeof professionals) => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg text-[#1a2b4c] mb-2">
          {new Date(
            Date.now() + currentWeek * 7 * 24 * 60 * 60 * 1000,
          ).toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
          })}
        </h3>
      </div>

      {professionalsToShow.map((professional) => (
        <Card key={professional.id}>
          <CardHeader className="pb-4">
            <CardTitle className="text-[#1a2b4c] flex items-center gap-2">
              <User className="h-5 w-5" />
              {professional.name} - {professional.specialty}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => {
                const appointment = getAppointmentForSlot(
                  professional.name,
                  0,
                  time,
                );
                const isBlocked = isSlotBlocked(professional.name, 0, time);

                let slotClass = '';
                if (appointment) {
                  slotClass = getSlotColor(appointment);
                } else if (isBlocked) {
                  slotClass = 'bg-gray-300 border-gray-400 text-gray-600';
                } else {
                  slotClass =
                    'bg-[#20b2aa]/10 hover:bg-[#20b2aa]/20 border-[#20b2aa]/30';
                }

                return (
                  <div
                    key={time}
                    className={`p-3 rounded border cursor-pointer transition-colors text-sm ${slotClass}`}
                    onClick={() => handleSlotClick(professional.name, 0, time)}
                  >
                    <div className="text-center">{time}</div>
                    {appointment && (
                      <div className="mt-2 text-center">
                        <div className="truncate">{appointment.clientName}</div>
                        <div className="text-xs opacity-75 truncate">
                          {appointment.service}
                        </div>
                      </div>
                    )}
                    {isBlocked && !appointment && (
                      <div className="text-xs text-center mt-1">Bloqueado</div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderMonthView = (professionalsToShow: typeof professionals) => {
    const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg text-[#1a2b4c] mb-4">
            {new Date().toLocaleDateString('pt-BR', {
              month: 'long',
              year: 'numeric',
            })}
          </h3>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {/* Days of week header */}
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm text-gray-600 font-medium"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {monthDays.map((day) => {
            const dayAppointments = mockAppointments.filter((apt) =>
              professionalsToShow.some(
                (prof) => prof.name === apt.professional,
              ),
            );

            return (
              <div
                key={day}
                className="min-h-[80px] p-2 border rounded-lg bg-white hover:bg-gray-50"
              >
                <div className="text-sm text-[#1a2b4c] mb-1">{day}</div>
                <div className="space-y-1">
                  {dayAppointments.slice(0, 2).map((apt) => (
                    <div
                      key={apt.id}
                      className="text-xs p-1 bg-[#1a2b4c]/10 rounded truncate cursor-pointer"
                      onClick={() => setSelectedAppointment(apt)}
                    >
                      {apt.clientName}
                    </div>
                  ))}
                  {dayAppointments.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayAppointments.length - 2} mais
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#1a2b4c]">Agenda - {activeStore.name}</h2>
          <p className="text-gray-600 text-sm">
            Gerencie os agendamentos da unidade selecionada
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Professional Filter */}
          <Select
            value={selectedProfessional}
            onValueChange={setSelectedProfessional}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Selecionar profissional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Profissionais</SelectItem>
              {professionals.map((prof) => (
                <SelectItem key={prof.id} value={prof.id}>
                  {prof.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Tabs
            value={viewType}
            onValueChange={(value) =>
              setViewType(value as 'week' | 'day' | 'month')
            }
          >
            <TabsList>
              <TabsTrigger value="day">Dia</TabsTrigger>
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="month">Mês</TabsTrigger>
            </TabsList>
          </Tabs>

          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurar Funcionamento
              </Button>
            </DialogTrigger>
          </Dialog>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(currentWeek - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-[#1a2b4c] min-w-[100px] text-center">
              {currentWeek === 0
                ? 'Esta Semana'
                : currentWeek > 0
                  ? `+${currentWeek} semanas`
                  : `${currentWeek} semanas`}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(currentWeek + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <Tabs
        value={viewType}
        onValueChange={(value) =>
          setViewType(value as 'week' | 'day' | 'month')
        }
      >
        <TabsContent value="week">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1a2b4c] flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Visualização Semanal
                {selectedProfessional !== 'all' && (
                  <span className="text-[#20b2aa]">
                    -{' '}
                    {
                      professionals.find((p) => p.id === selectedProfessional)
                        ?.name
                    }
                  </span>
                )}
              </CardTitle>
              <p className="text-sm text-gray-600">
                Clique para bloquear/desbloquear horários ou arraste para
                selecionar múltiplos
              </p>
            </CardHeader>
            <CardContent>{renderCalendarView()}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="day">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1a2b4c] flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Visualização Diária
                {selectedProfessional !== 'all' && (
                  <span className="text-[#20b2aa]">
                    -{' '}
                    {
                      professionals.find((p) => p.id === selectedProfessional)
                        ?.name
                    }
                  </span>
                )}
              </CardTitle>
              <p className="text-sm text-gray-600">
                Clique nos horários para gerenciar disponibilidade
              </p>
            </CardHeader>
            <CardContent>{renderCalendarView()}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1a2b4c] flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Visualização Mensal
                {selectedProfessional !== 'all' && (
                  <span className="text-[#20b2aa]">
                    -{' '}
                    {
                      professionals.find((p) => p.id === selectedProfessional)
                        ?.name
                    }
                  </span>
                )}
              </CardTitle>
              <p className="text-sm text-gray-600">
                Visão geral dos agendamentos do mês
              </p>
            </CardHeader>
            <CardContent>{renderCalendarView()}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#20b2aa]/20 border border-[#20b2aa]/30 rounded"></div>
          <span>Livre</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#1a2b4c]/20 border border-[#1a2b4c]/40 rounded"></div>
          <span>Agendado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span>Concluído</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span>Cancelado</span>
        </div>
      </div>

      {/* Appointment Details Modal */}
      <Dialog
        open={!!selectedAppointment}
        onOpenChange={() => setSelectedAppointment(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1a2b4c]">
              Detalhes do Agendamento
            </DialogTitle>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#20b2aa]" />
                  <span className="text-sm">
                    Cliente: {selectedAppointment.clientName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#1a2b4c]" />
                  <span className="text-sm">
                    {selectedAppointment.startTime} -{' '}
                    {selectedAppointment.endTime}
                  </span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-[#1a2b4c]">
                    {selectedAppointment.service}
                  </p>
                  <p className="text-xs text-gray-600">
                    Profissional: {selectedAppointment.professional}
                  </p>
                  <p className="text-xs text-gray-600">
                    Valor: R$ {selectedAppointment.price}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      selectedAppointment.status === 'scheduled'
                        ? 'default'
                        : selectedAppointment.status === 'completed'
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {selectedAppointment.status === 'scheduled'
                      ? 'Agendado'
                      : selectedAppointment.status === 'completed'
                        ? 'Concluído'
                        : 'Cancelado'}
                  </Badge>
                </div>
              </div>

              {selectedAppointment.status === 'scheduled' && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAppointmentAction('reschedule')}
                    className="flex-1"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reagendar
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => handleAppointmentAction('complete')}
                    className="flex-1 bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Concluir
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleAppointmentAction('cancel')}
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#1a2b4c] flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurar Funcionamento
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm text-[#1a2b4c] mb-4">
                Dias de Funcionamento
              </h4>
              <div className="space-y-3">
                {days.map((day, index) => (
                  <div key={day} className="flex items-center justify-between">
                    <Label htmlFor={`day-${index}`} className="text-sm">
                      {day}
                    </Label>
                    <Switch
                      id={`day-${index}`}
                      checked={workingDays[workingDayKeys[index]]}
                      onCheckedChange={(checked) => {
                        setWorkingDays((prev) => ({
                          ...prev,
                          [workingDayKeys[index]]: checked,
                        }));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsSettingsOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white"
                onClick={() => setIsSettingsOpen(false)}
              >
                Salvar Configurações
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
