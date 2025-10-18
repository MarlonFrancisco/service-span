import { Footer, Header } from '@/components/layout';
import { Button, Card } from '@repo/ui';
import { AlertTriangle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { STEPS } from './booking.constants';
import {
  IBookingFlowConfig,
  IProfessional,
  ISelectedService,
  TBookingStep,
} from './booking.types';
import { BookingSidebar } from './components/booking-sidebar';
import { BusinessShowcase } from './components/business-showcase';
import { CheckoutStep } from './components/checkout-step';
import { DateTimeSelectionStep } from './components/date-time-selection-step';
import { MobileBookingDrawer } from './components/mobile-booking-drawer';
import { ProfessionalSelectionStep } from './components/professional-selection-step';
import { ServiceSelectionStep } from './components/service-selection-step';
import { StepIndicator } from './components/step-indicator';

export function BookingFlow({
  businessName,
  businessAddress,
  businessPhone,
  businessImages,
  businessRating,
  businessReviewCount,
  businessCategory,
  businessDescription,
}: IBookingFlowConfig) {
  const [currentStep, setCurrentStep] = useState<TBookingStep>('services');
  const [selectedServices, setSelectedServices] = useState<ISelectedService[]>(
    [],
  );
  const [selectedProfessional, setSelectedProfessional] =
    useState<IProfessional | null>(null);
  const [isAnyProfessional, setIsAnyProfessional] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const steps = STEPS;

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  const handleServicesChange = (services: ISelectedService[]) => {
    setSelectedServices(services);
    setValidationError(null);
    // Reset professional selection when services change
    setSelectedProfessional(null);
    setIsAnyProfessional(false);
  };

  const handleProfessionalChange = (
    professional: IProfessional | null,
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

  // Get contextual button text based on current step
  const getNextButtonText = () => {
    switch (currentStep) {
      case 'services':
        return 'Escolher profissional';
      case 'professional':
        return 'Selecionar horário';
      case 'datetime':
        return 'Revisar e confirmar';
      default:
        return 'Continuar';
    }
  };

  const handleNextStep = () => {
    if (!canProceedToNext()) return;

    const stepIndex = steps.findIndex((step) => step.id === currentStep);
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1]!.id);
    }
  };

  const handlePrevStep = () => {
    const stepIndex = steps.findIndex((step) => step.id === currentStep);
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1]!.id);
    }
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
        return <CheckoutStep />;
      default:
        return null;
    }
  };

  return (
    <Header showSearchBar logoProps={{ className: 'hidden lg:block' }}>
      {/* Business Showcase */}
      <BusinessShowcase
        businessName={businessName}
        businessAddress={businessAddress}
        businessPhone={businessPhone}
        images={businessImages}
        rating={businessRating}
        reviewCount={businessReviewCount}
        category={businessCategory}
        description={businessDescription}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 pb-24 md:pb-8">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Main Content Column */}
          <div className="col-span-12 lg:col-span-8">
            {/* Validation Error */}
            {validationError && (
              <Card className="p-3 md:p-4 mb-4 md:mb-6 bg-red-50 shadow-sm">
                <div className="flex items-center gap-3 text-red-800">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm">{validationError}</p>
                </div>
              </Card>
            )}

            <div className="space-y-6">
              {/* Step Indicator - Desktop Only */}
              <div className="hidden md:block">
                <StepIndicator
                  steps={steps}
                  currentStep={currentStep}
                  currentStepIndex={currentStepIndex}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons - Desktop */}
              <div className="hidden md:flex mt-8 pt-6 justify-between items-center">
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
                      className="bg-black hover:bg-gray-800 text-white px-8"
                    >
                      {getNextButtonText()}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block col-span-12 lg:col-span-4">
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

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 z-20 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          {/* Summary Info */}
          <div className="flex-1 min-w-0">
            {selectedServices.length > 0 ? (
              <div>
                <div className="text-sm text-gray-600 truncate">
                  {selectedServices.length}{' '}
                  {selectedServices.length === 1 ? 'serviço' : 'serviços'}
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(totalPrice)}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                Nenhum serviço selecionado
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            {currentStep !== 'services' && (
              <Button
                variant="outline"
                onClick={handlePrevStep}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Voltar
              </Button>
            )}

            {currentStep !== 'checkout' && (
              <Button
                onClick={handleNextStep}
                disabled={!canProceedToNext() || !!validationError}
                className="bg-black hover:bg-gray-800 text-white"
              >
                {getNextButtonText()}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Summary Detail Toggle */}
        <MobileBookingDrawer
          businessName={businessName}
          businessAddress={businessAddress}
          selectedServices={selectedServices}
          selectedProfessional={selectedProfessional}
          isAnyProfessional={isAnyProfessional}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          totalPrice={totalPrice}
          totalDuration={totalDuration}
        />
      </div>

      <Footer />
    </Header>
  );
}
