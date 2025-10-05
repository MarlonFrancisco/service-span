import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@repo/ui';
import { SelectedService, Professional } from './BookingSidebar';

export interface TimeSlot {
  time: string;
  available: boolean;
  price?: number;
}

interface DateTimeSelectionStepProps {
  selectedServices: SelectedService[];
  selectedProfessional: Professional | null;
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
  totalDuration,
}: DateTimeSelectionStepProps) {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Mock data para disponibilidade
  const generateMockSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];
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

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}min`
      : `${hours}h`;
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

  // Desabilitar datas no passado
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl text-[#1a2b4c] mb-2">Escolha data e horário</h2>
        <p className="text-gray-600">
          Selecione quando deseja realizar{' '}
          {selectedServices.length > 1 ? 'os serviços' : 'o serviço'}
        </p>
      </div>

      {/* Informações do agendamento */}
      <Card className="p-4 bg-gray-50 border-gray-200">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[black]" />
            <span>
              Duração total: <strong>{formatDuration(totalDuration)}</strong>
            </span>
          </div>

          {(selectedProfessional || isAnyProfessional) && (
            <div className="flex items-center gap-2">
              <span>
                Com:{' '}
                <strong>
                  {isAnyProfessional
                    ? 'Qualquer profissional'
                    : selectedProfessional?.name}
                </strong>
              </span>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendário */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-[black]" />
            <h3 className="text-lg text-[#1a2b4c]">Selecione a data</h3>
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
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-[black]" />
            <h3 className="text-lg text-[#1a2b4c]">Selecione o horário</h3>
          </div>

          {!selectedDate && (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Selecione uma data primeiro</p>
            </div>
          )}

          {selectedDate && isLoadingSlots && (
            <div className="text-center py-8 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[black] mx-auto mb-3"></div>
              <p>Carregando horários...</p>
            </div>
          )}

          {selectedDate && !isLoadingSlots && (
            <div className="space-y-3">
              <div className="text-sm text-gray-600 mb-3">
                {formatDate(selectedDate)}
              </div>

              {availableSlots.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  <p>Nenhum horário disponível nesta data</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={
                        selectedTime === slot.time ? 'default' : 'outline'
                      }
                      disabled={!slot.available}
                      onClick={() => handleTimeSelect(slot.time)}
                      className={`p-3 h-auto flex flex-col ${
                        selectedTime === slot.time
                          ? 'bg-[black] hover:bg-[black]/90 text-white'
                          : slot.available
                            ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
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
                  ))}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Confirmação da seleção */}
      {selectedDate && selectedTime && (
        <Card className="p-4 bg-[black]/10 border-[black]/20">
          <h4 className="text-[#1a2b4c] mb-2">Agendamento selecionado:</h4>
          <div className="space-y-1 text-sm">
            <p>
              <strong>Data:</strong> {formatDate(selectedDate)}
            </p>
            <p>
              <strong>Horário:</strong> {selectedTime}
            </p>
            <p>
              <strong>Duração:</strong> {formatDuration(totalDuration)}
            </p>
            {availableSlots.find((slot) => slot.time === selectedTime)
              ?.price && (
              <p>
                <strong>Valor total:</strong>{' '}
                {formatPrice(
                  availableSlots.find((slot) => slot.time === selectedTime)!
                    .price!,
                )}
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
