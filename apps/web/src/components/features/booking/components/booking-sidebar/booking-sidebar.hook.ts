'use client';

import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useGetStore } from '../../booking.hook';
import { TBookingFormData } from '../../booking.schema';
import { TBookingStep } from '../../booking.types';

interface BookingSidebarData {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  selectedServices: TBookingFormData['selectedServices'];
  selectedProfessional: TBookingFormData['selectedProfessional'];
  isAnyProfessional: boolean;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  totalPrice: number;
  totalDuration: number;
  currentStep: TBookingStep;
}

interface BookingSidebarFormatters {
  formatPrice: (price: number) => string;
  formatDuration: (minutes: number) => string;
  formatFullDate: (date: Date) => string;
}

interface BookingSidebarState {
  showEmptyState: boolean;
  showProfessionalWarning: boolean;
  showDateTimeWarning: boolean;
}

export const useBookingSidebar = (
  totalPrice: number,
  totalDuration: number,
  currentStep: TBookingStep,
): {
  data: BookingSidebarData;
  formatters: BookingSidebarFormatters;
  state: BookingSidebarState;
} => {
  const store = useGetStore();
  const { watch } = useFormContext<TBookingFormData>();
  const selectedServices = watch('selectedServices');
  const selectedProfessional = watch('selectedProfessional');
  const isAnyProfessional = watch('isAnyProfessional');
  const selectedDate = watch('selectedDate');
  const selectedTime = watch('selectedTime');

  const data: BookingSidebarData = useMemo(
    () => ({
      businessName: store?.name || '',
      businessAddress: store
        ? `${store.address}, ${store.city} - ${store.state}`
        : '',
      businessPhone: store?.telephone || '',
      selectedServices,
      selectedProfessional,
      isAnyProfessional,
      selectedDate,
      selectedTime,
      totalPrice,
      totalDuration,
      currentStep,
    }),
    [
      store,
      selectedServices,
      selectedProfessional,
      isAnyProfessional,
      selectedDate,
      selectedTime,
      totalPrice,
      totalDuration,
      currentStep,
    ],
  );

  const formatters: BookingSidebarFormatters = useMemo(
    () => ({
      formatPrice: (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price);
      },

      formatDuration: (minutes: number) => {
        if (minutes < 60) {
          return `${minutes}min`;
        }
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0
          ? `${hours}h ${remainingMinutes}min`
          : `${hours}h`;
      },

      formatFullDate: (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(date);
      },
    }),
    [],
  );

  const state: BookingSidebarState = useMemo(
    () => ({
      showEmptyState: selectedServices.length === 0,
      showProfessionalWarning:
        selectedServices.length > 0 &&
        !selectedProfessional &&
        !isAnyProfessional &&
        currentStep !== 'services',
      showDateTimeWarning:
        (selectedProfessional || isAnyProfessional) &&
        (!selectedDate || !selectedTime) &&
        currentStep !== 'services' &&
        currentStep !== 'professional',
    }),
    [
      selectedServices.length,
      selectedProfessional,
      isAnyProfessional,
      selectedDate,
      selectedTime,
      currentStep,
    ],
  );

  return {
    data,
    formatters,
    state,
  };
};
