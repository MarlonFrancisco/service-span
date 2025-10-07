'use client';

import { useCallback, useMemo, useState } from 'react';
import type {
  TBookingStep,
  TProfessional,
  TSelectedService,
} from './booking.types';

export type TUseBookingFlowConfig = {
  onBack: () => void;
};

export type TUseBookingFlowReturn = {
  currentStep: TBookingStep;
  selectedServices: TSelectedService[];
  selectedProfessional: TProfessional | null;
  isAnyProfessional: boolean;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  validationError: string | null;
  currentStepIndex: number;
  totalPrice: number;
  totalDuration: number;
  steps: Array<{ id: string; title: string; number: number }>;
  canProceedToNext: () => boolean;
  handleServicesChange: (services: TSelectedService[]) => void;
  handleProfessionalChange: (
    professional: TProfessional | null,
    isAny: boolean,
  ) => void;
  handleDateTimeChange: (date: Date | undefined, time: string | null) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleFinishBooking: () => void;
  setValidationError: (error: string | null) => void;
};

export const useBookingFlow = (): TUseBookingFlowReturn => {
  const [currentStep, setCurrentStep] = useState<TBookingStep>('services');
  const [selectedServices, setSelectedServices] = useState<TSelectedService[]>(
    [],
  );
  const [selectedProfessional, setSelectedProfessional] =
    useState<TProfessional | null>(null);
  const [isAnyProfessional, setIsAnyProfessional] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const steps = useMemo(
    () => [
      { id: 'services', title: 'Serviços', number: 1 },
      { id: 'professional', title: 'Profissional', number: 2 },
      { id: 'datetime', title: 'Data & Hora', number: 3 },
      { id: 'checkout', title: 'Confirmação', number: 4 },
    ],
    [],
  );

  const currentStepIndex = useMemo(
    () => steps.findIndex((step) => step.id === currentStep),
    [currentStep, steps],
  );

  const totalPrice = useMemo(
    () =>
      selectedServices.reduce(
        (total, service) => total + service.price * service.quantity,
        0,
      ),
    [selectedServices],
  );

  const totalDuration = useMemo(
    () =>
      selectedServices.reduce(
        (total, service) => total + service.duration * service.quantity,
        0,
      ),
    [selectedServices],
  );

  const handleServicesChange = useCallback((services: TSelectedService[]) => {
    setSelectedServices(services);
    setValidationError(null);
    setSelectedProfessional(null);
    setIsAnyProfessional(false);
  }, []);

  const handleProfessionalChange = useCallback(
    (professional: TProfessional | null, isAny: boolean) => {
      setSelectedProfessional(professional);
      setIsAnyProfessional(isAny);
      setValidationError(null);
    },
    [],
  );

  const handleDateTimeChange = useCallback(
    (date: Date | undefined, time: string | null) => {
      setSelectedDate(date);
      setSelectedTime(time);
    },
    [],
  );

  const canProceedToNext = useCallback(() => {
    switch (currentStep) {
      case 'services':
        return selectedServices.length > 0;
      case 'professional':
        return selectedProfessional !== null || isAnyProfessional;
      case 'datetime':
        return selectedDate !== undefined && selectedTime !== null;
      case 'checkout':
        return false;
      default:
        return false;
    }
  }, [
    currentStep,
    selectedServices,
    selectedProfessional,
    isAnyProfessional,
    selectedDate,
    selectedTime,
  ]);

  const handleNextStep = useCallback(() => {
    if (!canProceedToNext()) return;

    const stepIndex = steps.findIndex((step) => step.id === currentStep);
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].id as TBookingStep);
    }
  }, [canProceedToNext, currentStep, steps]);

  const handlePrevStep = useCallback(() => {
    const stepIndex = steps.findIndex((step) => step.id === currentStep);
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id as TBookingStep);
    }
  }, [currentStep, steps]);

  const handleFinishBooking = useCallback(() => {
    alert('Agendamento realizado com sucesso!');
  }, []);

  return {
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
  };
};
