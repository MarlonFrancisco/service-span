import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ServiceSelection } from './ServiceSelection';
import { DateTimeSelection } from './DateTimeSelection';
import { BookingSummary } from './BookingSummary';

interface BookingFlowProps {
  businessName: string;
  businessAddress: string;
  onBack: () => void;
}

export function BookingFlow({
  businessName,
  businessAddress,
  onBack,
}: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState<'services' | 'datetime'>(
    'services',
  );
  const [selectedServices, setSelectedServices] = useState<{
    [key: string]: number;
  }>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleServiceChange = (serviceId: string, quantity: number) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: quantity,
    }));
  };

  const hasSelectedServices = Object.values(selectedServices).some(
    (qty) => qty > 0,
  );

  const handleNextStep = () => {
    if (currentStep === 'services' && hasSelectedServices) {
      setCurrentStep('datetime');
    }
  };

  const handleFinishBooking = () => {
    // Aqui seria implementada a lógica de finalização
    alert('Reserva finalizada com sucesso!');
    onBack();
  };

  const totalDuration = Object.entries(selectedServices).reduce(
    (total, [serviceId, quantity]) => {
      const durations = { '1': 45, '2': 30, '3': 60, '4': 90 }; // Mock durations
      return (
        total + (durations[serviceId as keyof typeof durations] || 0) * quantity
      );
    },
    0,
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-gray-900 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>

              <div>
                <h1 className="text-xl text-[#1a2b4c]">Agendar Serviço</h1>
                <p className="text-sm text-gray-600">{businessName}</p>
              </div>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 ${
                  currentStep === 'services'
                    ? 'text-[#20b2aa]'
                    : hasSelectedServices
                      ? 'text-green-600'
                      : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                    currentStep === 'services'
                      ? 'border-[#20b2aa] bg-[#20b2aa] text-white'
                      : hasSelectedServices
                        ? 'border-green-600 bg-green-600 text-white'
                        : 'border-gray-300'
                  }`}
                >
                  {hasSelectedServices && currentStep !== 'services' ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    '1'
                  )}
                </div>
                <span className="text-sm">Serviços</span>
              </div>

              <div
                className={`w-8 h-px ${hasSelectedServices ? 'bg-gray-300' : 'bg-gray-200'}`}
              />

              <div
                className={`flex items-center gap-2 ${
                  currentStep === 'datetime'
                    ? 'text-[#20b2aa]'
                    : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                    currentStep === 'datetime'
                      ? 'border-[#20b2aa] bg-[#20b2aa] text-white'
                      : 'border-gray-300'
                  }`}
                >
                  2
                </div>
                <span className="text-sm">Data & Hora</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="col-span-8">
            {currentStep === 'services' && (
              <Card className="p-6">
                <ServiceSelection
                  services={[]} // Will be populated from mock data in component
                  selectedServices={selectedServices}
                  onServiceChange={handleServiceChange}
                />

                {hasSelectedServices && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Button
                      className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white px-8"
                      onClick={handleNextStep}
                    >
                      Continuar para Data & Hora
                    </Button>
                  </div>
                )}
              </Card>
            )}

            {currentStep === 'datetime' && (
              <Card className="p-6">
                <DateTimeSelection
                  totalDuration={totalDuration}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onDateChange={setSelectedDate}
                  onTimeChange={setSelectedTime}
                />

                <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('services')}
                    className="border-gray-300"
                  >
                    Voltar para Serviços
                  </Button>

                  {selectedDate && selectedTime && (
                    <Button
                      className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white px-8"
                      onClick={handleFinishBooking}
                    >
                      Finalizar Agendamento
                    </Button>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Summary Column */}
          <div className="col-span-4">
            <BookingSummary
              selectedServices={selectedServices}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              businessName={businessName}
              businessAddress={businessAddress}
              onFinishBooking={handleFinishBooking}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
