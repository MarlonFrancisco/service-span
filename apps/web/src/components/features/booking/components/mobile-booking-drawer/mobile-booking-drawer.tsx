import {
  Badge,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Separator,
} from '@repo/ui';
import { Calendar, ChevronUp, Clock, MapPin, User } from 'lucide-react';
import { TProfessional, TSelectedService } from '../../booking.types';

interface MobileBookingDrawerProps {
  businessName: string;
  businessAddress: string;
  selectedServices: TSelectedService[];
  selectedProfessional: TProfessional | null;
  isAnyProfessional: boolean;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  totalPrice: number;
  totalDuration: number;
}

export function MobileBookingDrawer({
  businessName,
  businessAddress,
  selectedServices,
  selectedProfessional,
  isAnyProfessional,
  selectedDate,
  selectedTime,
  totalPrice,
  totalDuration,
}: MobileBookingDrawerProps) {
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

  if (selectedServices.length === 0) {
    return null;
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          className="w-full text-xs text-center text-gray-600 hover:text-gray-900 py-2 border-t border-gray-100 pt-3 flex items-center justify-center gap-1 transition-colors"
          aria-label="Ver detalhes do agendamento"
        >
          Ver detalhes do agendamento
          <ChevronUp className="h-3 w-3" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b border-gray-100">
          <DrawerTitle>Resumo do Agendamento</DrawerTitle>
          <DrawerDescription>
            Confira os detalhes do seu agendamento antes de confirmar.
          </DrawerDescription>
        </DrawerHeader>
        <div className="max-h-[70vh] overflow-y-auto p-4 space-y-4">
          {/* Business Info */}
          <div className="space-y-2">
            <h3 className="text-gray-900">{businessName}</h3>
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{businessAddress}</span>
            </div>
          </div>

          <Separator />

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-sm text-gray-600">Serviços selecionados:</h4>
            {selectedServices.map((service) => (
              <div
                key={service.id}
                className="flex justify-between items-start gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-gray-900">{service.name}</span>
                    {service.quantity > 1 && (
                      <Badge className="bg-black hover:bg-gray-800 text-white text-xs">
                        {service.quantity}x
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {service.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatDuration(service.duration * service.quantity)}
                    </span>
                  </div>
                </div>
                <span className="text-gray-900 font-medium whitespace-nowrap">
                  {formatPrice(service.price * service.quantity)}
                </span>
              </div>
            ))}

            {selectedServices.length > 1 && (
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center text-sm">
                <span className="text-gray-600">Duração total:</span>
                <span className="text-gray-900 font-medium">
                  {formatDuration(totalDuration)}
                </span>
              </div>
            )}
          </div>

          {/* Professional */}
          {(selectedProfessional || isAnyProfessional) && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>Profissional:</span>
                </div>
                <p className="text-gray-900 ml-6">
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
            </>
          )}

          {/* Date & Time */}
          {selectedDate && selectedTime && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Agendado para:</span>
                </div>
                <div className="ml-6">
                  <p className="text-gray-900">
                    {formatFullDate(selectedDate)}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-700">{selectedTime}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Total */}
          <Separator />
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-900">Total:</span>
              <span className="text-xl text-gray-900">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <p className="text-xs text-gray-500">Pagamento no local</p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
