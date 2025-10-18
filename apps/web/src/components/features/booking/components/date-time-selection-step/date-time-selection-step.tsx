import { Button, Calendar as CalendarComponent, Card } from '@repo/ui';
import { Calendar, Clock } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import {
  IProfessional,
  ISelectedService,
  ITimeSlot,
} from '../../booking.types';
import { DatePickerHorizontal } from './date-picker-horizontal';
import { SkeletonTimeSlots } from './skeleton-time-slots';

interface IDateTimeSelectionStepProps {
  selectedServices: ISelectedService[];
  selectedProfessional: IProfessional | null;
  isAnyProfessional: boolean;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  onDateTimeChange: (date: Date | undefined, time: string | null) => void;
  totalDuration: number;
}

export function DateTimeSelectionStep({
  selectedServices,
  selectedProfessional,
  isAnyProfessional,
  selectedDate,
  selectedTime,
  onDateTimeChange,
}: IDateTimeSelectionStepProps) {
  const [availableSlots, setAvailableSlots] = useState<ITimeSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Mock data para disponibilidade
  const generateMockSlots = (date: Date): ITimeSlot[] => {
    const slots: ITimeSlot[] = [];
    const dayOfWeek = date.getDay(); // 0 = domingo, 6 = sábado

    // Horários básicos da semana
    const weekdayHours = [
      '09:00',
      '10:00',
      '11:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
    ];
    const weekendHours = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00'];

    const hours =
      dayOfWeek === 0 || dayOfWeek === 6 ? weekendHours : weekdayHours;

    hours.forEach((time) => {
      // Simular disponibilidade aleatória
      const isAvailable = Math.random() > 0.3; // 70% de chance de estar disponível

      slots.push({
        time,
        available: isAvailable,
        price: selectedServices.reduce(
          (total, service) => total + service.price,
          0,
        ),
      });
    });

    return slots;
  };

  useEffect(() => {
    if (selectedDate) {
      setIsLoadingSlots(true);

      // Simular carregamento da API
      setTimeout(() => {
        const slots = generateMockSlots(selectedDate);
        setAvailableSlots(slots);
        setIsLoadingSlots(false);
      }, 500);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, selectedProfessional, isAnyProfessional]);

  const handleDateSelect = (date: Date | undefined) => {
    onDateTimeChange(date, null); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    onDateTimeChange(selectedDate, time);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  // Desabilitar datas no passado e domingos (exemplo)
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg sm:text-2xl text-[#1a2b4c] mb-1">
          Escolha data e horário
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Selecione quando deseja realizar{' '}
          {selectedServices.length > 1 ? 'os serviços' : 'o serviço'}
        </p>
      </div>

      {/* Mobile Date Picker Horizontal */}
      <div className="md:hidden space-y-4">
        <Card className="p-5 bg-white shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-gray-600" />
            <h3 className="text-[#1a2b4c]">Selecione a data</h3>
          </div>

          <DatePickerHorizontal
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={isDateDisabled}
          />
        </Card>

        {/* Mobile Time Slots */}
        <Card className="p-5 border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-gray-600" />
            <h3 className="text-[#1a2b4c]">Selecione o horário</h3>
          </div>

          {!selectedDate && (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">
                Selecione uma data primeiro
              </p>
            </div>
          )}

          {selectedDate && isLoadingSlots && <SkeletonTimeSlots />}

          {selectedDate && !isLoadingSlots && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="text-sm text-gray-600 mb-3">
                {formatDate(selectedDate)}
              </div>

              {availableSlots.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Nenhum horário disponível nesta data
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <AnimatePresence>
                    {availableSlots.map((slot, index) => (
                      <motion.div
                        key={slot.time}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Button
                          variant={
                            selectedTime === slot.time ? 'default' : 'outline'
                          }
                          disabled={!slot.available}
                          onClick={() => handleTimeSelect(slot.time)}
                          className={`p-3 h-auto flex flex-col w-full transition-all ${
                            selectedTime === slot.time
                              ? 'bg-black hover:bg-gray-800 text-white'
                              : slot.available
                                ? 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                : 'border-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                          aria-label={`Selecionar horário ${slot.time}`}
                        >
                          <span className="font-medium">{slot.time}</span>
                          {slot.available && slot.price && (
                            <span className="text-xs opacity-80">
                              {formatPrice(slot.price)}
                            </span>
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
        </Card>
      </div>

      {/* Desktop Date and Time Grid */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendário */}
        <Card className="p-5 border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-gray-600" />
            <h3 className="text-[#1a2b4c]">Selecione a data</h3>
          </div>

          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={isDateDisabled}
            className="rounded-md border-0 w-full"
          />
        </Card>

        {/* Horários */}
        <Card className="p-5 border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-gray-600" />
            <h3 className="text-[#1a2b4c]">Selecione o horário</h3>
          </div>

          {!selectedDate && (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">
                Selecione uma data primeiro
              </p>
            </div>
          )}

          {selectedDate && isLoadingSlots && <SkeletonTimeSlots />}

          {selectedDate && !isLoadingSlots && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="text-sm text-gray-600 mb-3">
                {formatDate(selectedDate)}
              </div>

              {availableSlots.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Nenhum horário disponível nesta data
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <AnimatePresence>
                    {availableSlots.map((slot, index) => (
                      <motion.div
                        key={slot.time}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Button
                          variant={
                            selectedTime === slot.time ? 'default' : 'outline'
                          }
                          disabled={!slot.available}
                          onClick={() => handleTimeSelect(slot.time)}
                          className={`p-3 h-auto flex flex-col w-full transition-all ${
                            selectedTime === slot.time
                              ? 'bg-black hover:bg-gray-800 text-white'
                              : slot.available
                                ? 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                : 'border-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <span className="font-medium">{slot.time}</span>
                          {slot.available && slot.price && (
                            <span className="text-xs opacity-80">
                              {formatPrice(slot.price)}
                            </span>
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
}
