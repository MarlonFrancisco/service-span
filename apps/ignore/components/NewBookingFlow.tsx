import { useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ServiceSelectionStep } from './booking/ServiceSelectionStep';
import { ProfessionalSelectionStep } from './booking/ProfessionalSelectionStep';
import { DateTimeSelectionStep } from './booking/DateTimeSelectionStep';
import { CheckoutStep } from './booking/CheckoutStep';
import { BookingSidebar } from './booking/BookingSidebar';
import { BusinessShowcase } from './BusinessShowcase';

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

interface NewBookingFlowProps {
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

export function NewBookingFlow({
  businessName,
  businessAddress,
  businessPhone,
  businessImages,
  businessImageUrl,
  businessRating,
  businessReviewCount,
  businessCategory,
  businessDescription,
  onBack,
}: NewBookingFlowProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>('services');
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    [],
  );
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);
  const [isAnyProfessional, setIsAnyProfessional] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const steps = [
    { id: 'services', title: 'Serviços', number: 1 },
    { id: 'professional', title: 'Profissional', number: 2 },
    { id: 'datetime', title: 'Data & Hora', number: 3 },
    { id: 'checkout', title: 'Confirmação', number: 4 },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  const handleServicesChange = (services: SelectedService[]) => {
    setSelectedServices(services);
    setValidationError(null);
    // Reset professional selection when services change
    setSelectedProfessional(null);
    setIsAnyProfessional(false);
  };

  const handleProfessionalChange = (
    professional: Professional | null,
    isAny: boolean,
  ) => {
    setSelectedProfessional(professional);
    setIsAnyProfessional(isAny);
    setValidationError(null);
  };

  const handleDateTimeChange = (
    date: Date | undefined,
    time: string | null,
  ) => {
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
        return false; // Last step
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (!canProceedToNext()) return;

    const stepIndex = steps.findIndex((step) => step.id === currentStep);
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].id as BookingStep);
    }
  };

  const handlePrevStep = () => {
    const stepIndex = steps.findIndex((step) => step.id === currentStep);
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id as BookingStep);
    }
  };

  const handleFinishBooking = () => {
    // Implementar lógica de finalização
    alert('Agendamento realizado com sucesso!');
    onBack();
  };

  const totalPrice = selectedServices.reduce(
    (total, service) => total + service.price * service.quantity,
    0,
  );
  const totalDuration = selectedServices.reduce(
    (total, service) => total + service.duration * service.quantity,
    0,
  );

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
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header with Logo */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-sm">
                <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                ServiceSnap
              </span>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 ${
                      step.id === currentStep
                        ? 'text-black'
                        : index < currentStepIndex
                          ? 'text-green-600'
                          : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm transition-colors ${
                        step.id === currentStep
                          ? 'border-black bg-black text-white'
                          : index < currentStepIndex
                            ? 'border-green-600 bg-green-600 text-white'
                            : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {index < currentStepIndex ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span className="text-sm hidden md:block">
                      {step.title}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 h-px mx-3 ${
                        index < currentStepIndex
                          ? 'bg-green-600'
                          : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Business Showcase */}
      <BusinessShowcase
        businessName={businessName}
        businessAddress={businessAddress}
        businessPhone={businessPhone}
        images={businessImages}
        imageUrl={businessImageUrl}
        rating={businessRating}
        reviewCount={businessReviewCount}
        category={businessCategory}
        description={businessDescription}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Column */}
          <div className="col-span-12 lg:col-span-8">
            {/* Validation Error */}
            {validationError && (
              <Card className="p-4 mb-6 border-red-200 bg-red-50">
                <div className="flex items-center gap-3 text-red-800">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <p className="text-sm">{validationError}</p>
                </div>
              </Card>
            )}

            <Card className="p-6">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                <div>
                  {currentStep !== 'services' && (
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Voltar
                    </Button>
                  )}
                </div>

                <div>
                  {currentStep !== 'checkout' && (
                    <Button
                      onClick={handleNextStep}
                      disabled={!canProceedToNext() || !!validationError}
                      className="bg-[#20b2aa] hover:bg-[#20b2aa]/90 text-white px-8"
                    >
                      Continuar
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <BookingSidebar
              businessName={businessName}
              businessAddress={businessAddress}
              businessPhone={businessPhone}
              selectedServices={selectedServices}
              selectedProfessional={selectedProfessional}
              isAnyProfessional={isAnyProfessional}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              totalPrice={totalPrice}
              totalDuration={totalDuration}
              currentStep={currentStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
