import { Card, CardContent } from '@repo/ui';
import { Lock } from 'lucide-react';
import { memo } from 'react';
import { GRID_CONSTANTS } from '../../agenda-grid.constants';
import { isBlockedTime } from '../../agenda-grid.helpers';
import { useAgendaGridDesktopView } from './agenda-grid-desktop-view.hook';
import type { TDesktopViewConfig } from './agenda-grid-desktop-view.types';

/**
 * Componente Desktop View da Agenda
 * Otimizado com React.memo e useMemo para melhor performance
 */
export const AgendaGridDesktopView = memo(
  ({ gridHook }: TDesktopViewConfig) => {
    const {
      timeSlots,
      filteredProfessionals,
      getAppointmentForSlot,
      isSlotOccupied,
      handleSlotClick,
      getSlotClassName,
      getSlotsSpan,
    } = gridHook;

    const { desktopDayData } = useAgendaGridDesktopView(gridHook);

    const slotHeight = GRID_CONSTANTS.SLOT_HEIGHT;
    const shouldShowFullDetails = filteredProfessionals.length === 1;

    const NonWorkingOverlay = () => (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gray-100/60">
        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600">
          Dia não útil
        </div>
      </div>
    );

    return (
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="grid grid-cols-8 min-w-[900px]">
            {/* Time Column */}
            <div className="border-r border-gray-200 bg-gray-50">
              <div
                className="sticky top-0 z-10 flex items-center justify-center border-b border-gray-200 bg-gray-50"
                style={{ height: slotHeight }}
                aria-label="Coluna de horários"
              >
                <span aria-hidden className="text-gray-400">
                  &#128337;
                </span>
              </div>
              {timeSlots.map((time, index) => (
                <div
                  key={time}
                  className={`flex items-center justify-end px-3 text-xs text-gray-500 ${index < timeSlots.length - 1 ? 'border-b border-gray-200' : ''}`}
                  style={{ height: slotHeight }}
                  aria-label={`Horário ${time}`}
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Day Columns */}
            {desktopDayData.map((dayData) => {
              if (!dayData) return null;

              const { label, dayIndex, date, isToday, isWorkingDay } = dayData;

              return (
                <div
                  key={`${label}-${dayIndex}`}
                  className={`border-r border-gray-200 ${!isWorkingDay ? 'bg-gray-50 opacity-60' : ''}`}
                >
                  {/* Day Header */}
                  <div
                    className={`sticky top-0 z-10 flex h-12 flex-col items-center justify-center border-b border-gray-200 px-2 ${isToday ? 'bg-black text-white' : 'bg-gray-50'}`}
                    style={{ height: slotHeight }}
                    role="columnheader"
                    aria-label={`${label}, ${date.getDate()} ${isToday ? '(Hoje)' : ''}`}
                  >
                    <span
                      className={`text-xs ${isToday ? 'text-white' : 'text-gray-500'}`}
                    >
                      {label.substring(0, 3)}
                    </span>
                    <span
                      className={`${isToday ? 'text-white' : 'text-gray-900'} mt-0.5 text-sm`}
                    >
                      {date.getDate()}
                    </span>
                  </div>

                  {/* Time Slots */}
                  <div className="relative overflow-hidden">
                    {!isWorkingDay ? <NonWorkingOverlay /> : null}

                    {filteredProfessionals.map((professional, profIndex) => (
                      <div
                        key={professional.id}
                        className={
                          profIndex > 0
                            ? 'pointer-events-none absolute inset-0 opacity-30'
                            : undefined
                        }
                      >
                        {timeSlots.map((time, timeIndex) => {
                          if (isSlotOccupied(professional.id, dayIndex, time)) {
                            return null;
                          }

                          const appointment = getAppointmentForSlot(
                            professional.id,
                            dayIndex,
                            time,
                          );

                          const blockedTime = isBlockedTime(
                            professional.blockedTimes,
                            date.toISOString().split('T')[0] ?? '',
                            time,
                          );
                          const isBlocked = !!blockedTime;

                          const slotsSpan = appointment
                            ? getSlotsSpan(appointment)
                            : 1;
                          const isLastSlot = timeIndex === timeSlots.length - 1;

                          const classNameForSlot = getSlotClassName({
                            appointment,
                            isBlocked,
                            isWorkingDay,
                          });

                          return (
                            <div
                              key={`${professional.id}-${time}`}
                              onClick={() => {
                                if (!isWorkingDay) {
                                  return;
                                }
                                handleSlotClick(
                                  professional,
                                  dayIndex,
                                  time,
                                  blockedTime,
                                );
                              }}
                              onKeyDown={(e) => {
                                if (!isWorkingDay) return;
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleSlotClick(
                                    professional,
                                    dayIndex,
                                    time,
                                    blockedTime,
                                  );
                                }
                              }}
                              role={
                                !appointment && isWorkingDay
                                  ? 'button'
                                  : undefined
                              }
                              tabIndex={
                                !appointment && isWorkingDay ? 0 : undefined
                              }
                              aria-label={
                                appointment
                                  ? `Agendamento ${appointment.user.firstName} às ${time}`
                                  : isBlocked
                                    ? `Horário bloqueado ${time} - ${professional.user.firstName}`
                                    : `Agendar às ${time} com ${professional.user.firstName}`
                              }
                              aria-pressed={isBlocked}
                              className={`${!isLastSlot ? 'border-b border-gray-200' : ''} ${classNameForSlot}`}
                              style={{ height: slotHeight * slotsSpan }}
                            >
                              {isBlocked ? (
                                <div className="flex h-full items-center justify-center">
                                  <Lock
                                    className="h-3.5 w-3.5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </div>
                              ) : appointment ? (
                                <div className="flex h-full flex-col justify-center overflow-hidden">
                                  <span className="truncate text-xs font-medium">
                                    {appointment.user.firstName}{' '}
                                    {appointment.user.lastName}
                                  </span>
                                  {shouldShowFullDetails ? (
                                    <>
                                      <span className="truncate text-xs text-gray-600">
                                        {appointment.service.name}
                                      </span>
                                      {slotsSpan > 1 ? (
                                        <span className="mt-0.5 text-[11px] text-gray-500">
                                          {appointment.startTime} -{' '}
                                          {appointment.endTime}
                                        </span>
                                      ) : null}
                                    </>
                                  ) : null}
                                </div>
                              ) : (
                                <span className="text-xs font-medium text-gray-600 flex items-center justify-center h-full">
                                  {time}
                                </span>
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
    );
  },
);

AgendaGridDesktopView.displayName = 'AgendaGridDesktopView';
