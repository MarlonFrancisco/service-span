import { useState } from "react";
import { ArrowLeft, Check, Clock, User, Calendar, CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ServiceSelectionStep } from "./booking/ServiceSelectionStep";
import { ProfessionalSelectionStep } from "./booking/ProfessionalSelectionStep";
import { DateTimeSelectionStep } from "./booking/DateTimeSelectionStep";
import { CheckoutStep } from "./booking/CheckoutStep";
import { BusinessShowcase } from "./BusinessShowcase";

export type BookingStep = 'services' | 'professional' | 'datetime' | 'checkout';

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

export interface TimeSlot {
  time: string;
  available: boolean;
  price?: number;
}

interface ModernBookingFlowProps {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessImages?: string[];
  businessImageUrl?: string;
  businessRating?: number;
  businessReviewCount?: number;
  businessCategory?: string;
  businessDescription?: string;
  onBack: () => void;
}

export function ModernBookingFlow({ 
  businessName, 
  businessAddress, 
  businessPhone,
  businessImages,
  businessImageUrl,
  businessRating,
  businessReviewCount,
  businessCategory,
  businessDescription,
  onBack 
}: ModernBookingFlowProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>('services');
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [isAnyProfessional, setIsAnyProfessional] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const steps = [
    { 
      id: 'services', 
      title: 'Selecionar Serviços', 
      subtitle: 'Escolha os serviços desejados',
      icon: Clock,
      number: 1 
    },
    { 
      id: 'professional', 
      title: 'Escolher Profissional', 
      subtitle: 'Selecione seu profissional preferido',
      icon: User,
      number: 2 
    },
    { 
      id: 'datetime', 
      title: 'Data e Horário', 
      subtitle: 'Defina quando você quer ser atendido',
      icon: Calendar,
      number: 3 
    },
    { 
      id: 'checkout', 
      title: 'Finalizar', 
      subtitle: 'Confirme seus dados e finalize',
      icon: CreditCard,
      number: 4 
    }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const currentStepData = steps[currentStepIndex];

  const handleServicesChange = (services: SelectedService[]) => {
    setSelectedServices(services);
    setValidationError(null);
    setSelectedProfessional(null);
    setIsAnyProfessional(false);
  };

  const handleProfessionalChange = (professional: Professional | null, isAny: boolean) => {
    setSelectedProfessional(professional);
    setIsAnyProfessional(isAny);
    setValidationError(null);
  };

  const handleDateTimeChange = (date: Date | undefined, time: string | null) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 'services':
        return selectedServices.length > 0;
      case 'professional':
        return selectedProfessional !== null || isAnyProfessional;
      case 'datetime':
        return selectedDate && selectedTime;
      case 'checkout':
        return false;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (!canProceedToNext()) return;

    const stepIndex = steps.findIndex(step => step.id === currentStep);
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].id as BookingStep);
    }
  };

  const handlePrevStep = () => {
    const stepIndex = steps.findIndex(step => step.id === currentStep);
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id as BookingStep);
    }
  };

  const handleFinishBooking = () => {
    alert('Agendamento realizado com sucesso!');
    onBack();
  };

  const totalPrice = selectedServices.reduce((total, service) => total + (service.price * service.quantity), 0);
  const totalDuration = selectedServices.reduce((total, service) => total + (service.duration * service.quantity), 0);

  const isStepCompleted = (stepId: string) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    return stepIndex < currentStepIndex;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'services':
        return (
          <ServiceSelectionStep
            selectedServices={selectedServices}
            onServicesChange={handleServicesChange}
          />
        );
      case 'professional':
        return (
          <ProfessionalSelectionStep
            selectedServices={selectedServices}
            selectedProfessional={selectedProfessional}
            isAnyProfessional={isAnyProfessional}
            onProfessionalChange={handleProfessionalChange}
            onValidationError={setValidationError}
          />
        );
      case 'datetime':
        return (
          <DateTimeSelectionStep
            selectedServices={selectedServices}
            selectedProfessional={selectedProfessional}
            isAnyProfessional={isAnyProfessional}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateTimeChange={handleDateTimeChange}
            totalDuration={totalDuration}
          />
        );
      case 'checkout':
        return (
          <CheckoutStep
            selectedServices={selectedServices}
            selectedProfessional={selectedProfessional}
            isAnyProfessional={isAnyProfessional}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            businessName={businessName}
            businessPhone={businessPhone}
            onFinishBooking={handleFinishBooking}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center">
                <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center mr-3">
                  <div className="w-5 h-5 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Agendamento</h1>
                  <p className="text-sm text-gray-600">{businessName}</p>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="hidden md:flex items-center gap-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all ${
                    step.id === currentStep 
                      ? 'bg-black text-white' 
                      : isStepCompleted(step.id)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium ${
                      step.id === currentStep
                        ? 'border-white bg-white text-black'
                        : isStepCompleted(step.id)
                        ? 'border-green-600 bg-green-600 text-white'
                        : 'border-gray-300'
                    }`}>
                      {isStepCompleted(step.id) ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="w-8 h-px bg-gray-200 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Step Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-xl">
                  <currentStepData.icon className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{currentStepData.title}</h2>
                  <p className="text-gray-600">{currentStepData.subtitle}</p>
                </div>
              </div>
              
              {/* Mobile Progress */}
              <div className="md:hidden mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Etapa {currentStepIndex + 1} de {steps.length}</span>
                  <span>{Math.round(((currentStepIndex + 1) / steps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-black h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Validation Error */}
            {validationError && (
              <Card className="p-4 mb-6 bg-red-50 border-red-200">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-sm text-red-800">{validationError}</p>
                </div>
              </Card>
            )}

            {/* Step Content */}
            <div className="space-y-6">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className="px-6"
              >
                Voltar
              </Button>

              {currentStep !== 'checkout' ? (
                <Button
                  onClick={handleNextStep}
                  disabled={!canProceedToNext()}
                  className="px-8 bg-black hover:bg-gray-800 text-white"
                >
                  Continuar
                </Button>
              ) : (
                <Button
                  onClick={handleFinishBooking}
                  className="px-8 bg-black hover:bg-gray-800 text-white"
                >
                  Finalizar Agendamento
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              {/* Business Showcase */}
              <Card className="overflow-hidden">
                <BusinessShowcase
                  businessName={businessName}
                  businessAddress={businessAddress}
                  businessPhone={businessPhone}
                  businessImages={businessImages}
                  businessImageUrl={businessImageUrl}
                  businessRating={businessRating}
                  businessReviewCount={businessReviewCount}
                  businessCategory={businessCategory}
                  businessDescription={businessDescription}
                />
              </Card>

              {/* Booking Summary */}
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Resumo do Agendamento</h3>
                
                {/* Services */}
                {selectedServices.length > 0 && (
                  <div className="space-y-3 mb-6">
                    <h4 className="text-sm font-medium text-gray-700">Serviços</h4>
                    {selectedServices.map((service) => (
                      <div key={`${service.id}-${service.quantity}`} className="flex justify-between text-sm">
                        <div>
                          <span className="text-gray-900">{service.name}</span>
                          {service.quantity > 1 && (
                            <span className="text-gray-500 ml-1">x{service.quantity}</span>
                          )}
                        </div>
                        <span className="font-medium">R$ {(service.price * service.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Professional */}
                {(selectedProfessional || isAnyProfessional) && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Profissional</h4>
                    <p className="text-sm text-gray-900">
                      {isAnyProfessional ? 'Qualquer profissional disponível' : selectedProfessional?.name}
                    </p>
                  </div>
                )}

                {/* Date and Time */}
                {selectedDate && selectedTime && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Data e Horário</h4>
                    <p className="text-sm text-gray-900">
                      {selectedDate.toLocaleDateString('pt-BR', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} às {selectedTime}
                    </p>
                  </div>
                )}

                {/* Total */}
                {selectedServices.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-semibold text-gray-900">R$ {totalPrice.toFixed(2)}</span>
                    </div>
                    {totalDuration > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        Duração total: {Math.floor(totalDuration / 60)}h {totalDuration % 60}min
                      </p>
                    )}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}