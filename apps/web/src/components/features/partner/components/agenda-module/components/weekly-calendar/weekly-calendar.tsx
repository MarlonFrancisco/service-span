'use client';
import { useAgenda } from '@/store/admin/agenda';
import { Card, CardContent } from '@repo/ui';
import { Clock, Lock } from 'lucide-react';
import { useCalendarHelpers } from './weekly-calendar.hook';

export function WeeklyCalendar() {
  const {
    professionals,
    selectedProfessional,
    blockedSlots,
    workingDays,
    timeSlots,
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

  return (
    <Card className="border-gray-200 py-0">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-8">
              {/* Time Column */}
              <div className="border-r border-gray-200 bg-gray-50">
                <div className="h-12 border-b border-gray-200 flex items-center justify-center sticky top-0 bg-gray-50 z-10">
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
                {timeSlots.map((time, index) => (
                  <div
                    key={time}
                    className={`h-14 px-2 flex items-center justify-end text-xs text-gray-500 ${index < timeSlots.length - 1 ? 'border-b border-gray-200' : ''}`}
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
                    className={`border-r border-gray-200 ${!isWorkingDay ? 'bg-gray-50/50' : ''}`}
                  >
                    {/* Day Header */}
                    <div
                      className={`h-12 border-b border-gray-200 px-2 sticky top-0 z-10 ${isToday ? 'bg-black text-white' : 'bg-gray-50'}`}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <div
                          className={`text-xs ${isToday ? 'text-white' : 'text-gray-500'}`}
                        >
                          {day.substring(0, 3)}
                        </div>
                        <div
                          className={`text-sm ${isToday ? 'text-white' : 'text-gray-900'}`}
                        >
                          {currentDate.getDate()}
                        </div>
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="relative overflow-hidden">
                      {!isWorkingDay && (
                        <div className="absolute inset-0 bg-gray-100/30 flex items-center justify-center z-10 pointer-events-none">
                          <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-xs text-gray-600">
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
                            const heightPx = 56 * slotsSpan;
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
                                    <Lock className="h-3 w-3 text-gray-400" />
                                  </div>
                                )}
                                {appointment && (
                                  <div className="h-full flex flex-col justify-center overflow-hidden">
                                    <div className="text-xs truncate">
                                      {appointment.clientName}
                                    </div>
                                    {filteredProfessionals.length === 1 && (
                                      <div className="text-xs truncate text-gray-600">
                                        {appointment.service}
                                      </div>
                                    )}
                                    {slotsSpan > 1 &&
                                      filteredProfessionals.length === 1 && (
                                        <div className="text-xs text-gray-500 mt-0.5">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
