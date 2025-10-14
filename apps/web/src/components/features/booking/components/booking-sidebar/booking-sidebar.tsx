import { Badge, Card, Separator } from '@repo/ui';
import { Calendar, Clock, MapPin, Phone, User } from 'lucide-react';
import { TProfessional, TSelectedService } from '../../booking.types';

export interface SelectedService {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: string;
  quantity: number;
}

export interface Professional {
  id: string;
  name: string;
  specialties: string[];
  availableServices: string[];
}

export type BookingStep = 'services' | 'professional' | 'datetime' | 'checkout';

interface BookingSidebarProps {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  selectedServices: TSelectedService[];
  selectedProfessional: TProfessional | null;
  isAnyProfessional: boolean;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  totalPrice: number;
  totalDuration: number;
  currentStep: BookingStep;
}

export function BookingSidebar({
  businessName,
  businessAddress,
  businessPhone,
  selectedServices,
  selectedProfessional,
  isAnyProfessional,
  selectedDate,
  selectedTime,
  totalPrice,
  totalDuration,
  currentStep,
}: BookingSidebarProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
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

  const formatFullDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {/* Informações do Estabelecimento */}
      <Card className="p-4 sticky top-24">
        <div className="space-y-4">
          {/* Header do estabelecimento */}
          <div>
            <h3 className="text-lg text-[#1a2b4c] mb-1">{businessName}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4" />
              <span>{businessAddress}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{businessPhone}</span>
            </div>
          </div>

          <Separator />

          {/* Resumo do Agendamento */}
          <div>
            <h4 className="text-[#1a2b4c] mb-3">Resumo da Reserva</h4>

            {/* Serviços */}
            {selectedServices.length > 0 && (
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Serviços selecionados:</span>
                </div>
                <div className="space-y-2">
                  {selectedServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm text-gray-900">
                            {service.name}
                          </p>
                          {service.quantity > 1 && (
                            <span className="bg-[black] text-white px-1.5 py-0.5 rounded-full text-xs">
                              {service.quantity}x
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {service.category}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatDuration(
                              service.duration * service.quantity,
                            )}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-[#1a2b4c] ml-2">
                        {formatPrice(service.price * service.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {selectedServices.length > 1 && (
                  <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                    <span className="text-sm">Duração total:</span>
                    <span className="text-sm text-[#1a2b4c]">
                      {formatDuration(totalDuration)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Profissional */}
            {(selectedProfessional || isAnyProfessional) && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Profissional:</span>
                </div>
                <p className="text-sm text-gray-900 ml-6">
                  {isAnyProfessional
                    ? 'Qualquer profissional'
                    : selectedProfessional?.name}
                </p>
                {selectedProfessional && (
                  <p className="text-xs text-gray-500 ml-6">
                    {selectedProfessional.specialties.join(' • ')}
                  </p>
                )}
              </div>
            )}

            {/* Data e Hora */}
            {selectedDate && selectedTime && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Agendado para:</span>
                </div>
                <div className="ml-6">
                  <p className="text-sm text-gray-900">
                    {formatFullDate(selectedDate)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {selectedTime}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Total */}
            {selectedServices.length > 0 && (
              <>
                <Separator />
                <div className="pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#1a2b4c]">Total:</span>
                    <span className="text-lg text-[#1a2b4c]">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  {currentStep !== 'checkout' && (
                    <p className="text-xs text-gray-500 mt-1">
                      Pagamento no local
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Status do progresso */}
          {selectedServices.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Selecione um serviço para começar</p>
            </div>
          )}

          {selectedServices.length > 0 &&
            !selectedProfessional &&
            !isAnyProfessional &&
            currentStep !== 'services' && (
              <div className="text-center py-4 text-amber-600 bg-amber-50 rounded-lg">
                <User className="h-6 w-6 mx-auto mb-1" />
                <p className="text-sm">Escolha um profissional</p>
              </div>
            )}

          {(selectedProfessional || isAnyProfessional) &&
            (!selectedDate || !selectedTime) &&
            currentStep !== 'services' &&
            currentStep !== 'professional' && (
              <div className="text-center py-4 text-blue-600 bg-blue-50 rounded-lg">
                <Clock className="h-6 w-6 mx-auto mb-1" />
                <p className="text-sm">Selecione data e horário</p>
              </div>
            )}
        </div>
      </Card>
    </div>
  );
}
