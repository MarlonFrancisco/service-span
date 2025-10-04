import { Calendar, Clock, MapPin, User, CreditCard } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

interface BookingSummaryProps {
  selectedServices: { [key: string]: number };
  selectedDate: Date | undefined;
  selectedTime: string | null;
  businessName: string;
  businessAddress: string;
  onFinishBooking: () => void;
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Corte Masculino",
    description: "Corte moderno com acabamento",
    duration: 45,
    price: 80
  },
  {
    id: "2", 
    name: "Barba",
    description: "Aparar e modelar barba",
    duration: 30,
    price: 50
  },
  {
    id: "3",
    name: "Lavagem + Corte",
    description: "Lavagem completa com corte",
    duration: 60,
    price: 120
  },
  {
    id: "4",
    name: "Tratamento Capilar",
    description: "Hidratação e nutrição dos fios",
    duration: 90,
    price: 180
  }
];

export function BookingSummary({
  selectedServices,
  selectedDate,
  selectedTime,
  businessName,
  businessAddress,
  onFinishBooking
}: BookingSummaryProps) {
  const getSelectedServicesList = () => {
    return Object.entries(selectedServices)
      .filter(([_, quantity]) => quantity > 0)
      .map(([serviceId, quantity]) => {
        const service = mockServices.find(s => s.id === serviceId);
        return service ? { ...service, quantity } : null;
      })
      .filter(Boolean);
  };

  const selectedServicesList = getSelectedServicesList();
  const totalDuration = selectedServicesList.reduce((total, service) => 
    total + (service!.duration * service!.quantity), 0
  );
  const totalPrice = selectedServicesList.reduce((total, service) => 
    total + (service!.price * service!.quantity), 0
  );

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    }
    return `${mins}min`;
  };

  const canFinishBooking = selectedServicesList.length > 0 && selectedDate && selectedTime;

  return (
    <Card className="p-6 h-fit sticky top-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo da Reserva</h3>
          
          {/* Empresa */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{businessName}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <span className="text-sm text-gray-600">{businessAddress}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Serviços Selecionados */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Serviços</h4>
          {selectedServicesList.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhum serviço selecionado</p>
          ) : (
            <div className="space-y-3">
              {selectedServicesList.map((service) => (
                <div key={service!.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{service!.name}</span>
                      {service!.quantity > 1 && (
                        <Badge variant="secondary" className="text-xs">
                          x{service!.quantity}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDuration(service!.duration * service!.quantity)}</span>
                    </div>
                  </div>
                  <span className="text-sm">R$ {service!.price * service!.quantity}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedServicesList.length > 0 && (
          <>
            <Separator />
            
            {/* Data e Hora */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Agendamento</h4>
              {selectedDate && selectedTime ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      {selectedDate.toLocaleDateString('pt-BR', { 
                        day: 'numeric', 
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{selectedTime}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Data e horário não selecionados</p>
              )}
            </div>

            <Separator />

            {/* Resumo dos Valores */}
            <div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Duração Total:</span>
                  <span>{formatDuration(totalDuration)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-semibold text-gray-900">R$ {totalPrice}</span>
                </div>
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Botão de Finalizar */}
        <Button
          className={`w-full py-3 ${
            canFinishBooking
              ? "bg-black hover:bg-gray-800 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!canFinishBooking}
          onClick={onFinishBooking}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          {canFinishBooking ? "Finalizar Reserva" : "Complete os dados"}
        </Button>

        {canFinishBooking && (
          <p className="text-xs text-gray-500 text-center">
            Você será redirecionado para o pagamento
          </p>
        )}
      </div>
    </Card>
  );
}