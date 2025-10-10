import type { IAppointment, IProfessional } from '@/store/admin/agenda';
import { useAgenda } from '@/store/admin/agenda';
import { toast } from 'sonner';

export const useCalendarHelpers = () => {
  const {
    appointments,
    currentWeek,
    isBlockMode,
    setSelectedAppointment,
    setIsAddAppointmentOpen,
    setAppointmentForm,
    toggleBlockedSlot,
    professionals,
  } = useAgenda();

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

  const getWeekDates = () => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() + currentWeek * 7);
    const monday = new Date(weekStart);
    const dayOfWeek = monday.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    monday.setDate(monday.getDate() + diff);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(date.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates();

  const getAppointmentForSlot = (
    professional: string,
    dayOffset: number,
    time: string,
  ) => {
    const targetDate = new Date(
      Date.now() + (currentWeek * 7 + dayOffset) * 24 * 60 * 60 * 1000,
    )
      .toISOString()
      .split('T')[0];

    return (
      appointments.find(
        (apt) =>
          apt.professional === professional &&
          apt.date === targetDate &&
          apt.startTime === time,
      ) || null
    );
  };

  const isSlotOccupied = (
    professional: string,
    dayOffset: number,
    time: string,
  ): boolean => {
    const targetDate = new Date(
      Date.now() + (currentWeek * 7 + dayOffset) * 24 * 60 * 60 * 1000,
    )
      .toISOString()
      .split('T')[0];

    const [timeHour, timeMin] = time.split(':').map(Number);
    const timeMinutes = timeHour * 60 + timeMin;

    return appointments.some((apt) => {
      if (apt.professional !== professional || apt.date !== targetDate) {
        return false;
      }

      const [startHour, startMin] = apt.startTime.split(':').map(Number);
      const [endHour, endMin] = apt.endTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;

      return timeMinutes > startMinutes && timeMinutes < endMinutes;
    });
  };

  const getSlotColor = (
    appointment: IAppointment | null,
    isBlocked: boolean,
  ) => {
    if (isBlocked)
      return 'bg-gray-100 border-gray-300 text-gray-500 cursor-pointer hover:bg-gray-200';
    if (!appointment)
      return 'bg-white hover:bg-gray-50 border-gray-200 cursor-pointer';

    switch (appointment.status) {
      case 'scheduled':
        return 'bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100 cursor-pointer';
      case 'completed':
        return 'bg-green-50 border-green-200 text-green-800 cursor-default';
      case 'cancelled':
        return 'bg-red-50 border-red-200 text-red-800 cursor-default';
      case 'no-show':
        return 'bg-orange-50 border-orange-200 text-orange-800 cursor-default';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const calculateDuration = (startTime: string, endTime: string): number => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    return endMinutes - startMinutes;
  };

  const getSlotsSpan = (appointment: IAppointment): number => {
    const duration = calculateDuration(
      appointment.startTime,
      appointment.endTime,
    );
    return Math.ceil(duration / 30);
  };

  const handleSlotClick = (
    professional: IProfessional,
    dayOffset: number,
    time: string,
    appointment: IAppointment | null,
  ) => {
    if (isBlockMode && !appointment) {
      const slotKey = `${professional.id}-${dayOffset}-${time}`;
      toggleBlockedSlot(slotKey);
      toast.success('Horário bloqueado/desbloqueado');
      return;
    }

    if (appointment) {
      setSelectedAppointment(appointment);
    } else if (!isBlockMode) {
      const targetDate = new Date(
        Date.now() + (currentWeek * 7 + dayOffset) * 24 * 60 * 60 * 1000,
      );
      setAppointmentForm({
        professional: professional.id,
        date: targetDate.toISOString().split('T')[0],
        startTime: time,
      });
      setIsAddAppointmentOpen(true);
    }
  };

  return {
    weekDates,
    days,
    workingDayKeys,
    getAppointmentForSlot,
    isSlotOccupied,
    getSlotColor,
    getSlotsSpan,
    handleSlotClick,
  };
};
