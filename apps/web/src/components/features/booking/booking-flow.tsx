import { Check, AlertTriangle } from 'lucide-react';
import { Button, Card } from '@repo/ui';
import {
  ServiceSelectionStep,
  ProfessionalSelectionStep,
  DateTimeSelectionStep,
  CheckoutStep,
  BookingSidebar,
  BusinessShowcase,
} from './components';
import { useBookingFlow } from './booking-flow.hook';
import type { TBookingFlowConfig } from './booking.types';
import Image from 'next/image';
import { Footer } from '@/components/layout';
import Link from 'next/link';

export const BookingFlow = ({
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
}: TBookingFlowConfig) => {
  const {
    currentStep,
    selectedServices,
    selectedProfessional,
    isAnyProfessional,
    selectedDate,
    selectedTime,
    validationError,
    currentStepIndex,
    totalPrice,
    totalDuration,
    steps,
    canProceedToNext,
    handleServicesChange,
    handleProfessionalChange,
    handleDateTimeChange,
    handleNextStep,
    handlePrevStep,
    handleFinishBooking,
    setValidationError,
  } = useBookingFlow({ onBack });

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
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="ServiceSnap"
                  width={200}
                  height={200}
                />
              </Link>
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
                          ? 'bg-[#20b2aa]-600'
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
      <div className="max-w-7xl mx-auto px-6 py-2 mb-24">
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
                      className="bg-[black] hover:bg-[black]/90 text-white px-8"
                    >
                      Continuar
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 sticky">
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

      <Footer />
    </div>
  );
};
