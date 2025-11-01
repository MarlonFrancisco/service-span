import { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { TStoreFormSchema } from '../store-form.schema';

export const BUSINESS_DAYS_TRANSLATED = {
  monday: 'Segunda',
  tuesday: 'Terça',
  wednesday: 'Quarta',
  thursday: 'Quinta',
  friday: 'Sexta',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

// Manter ordem fixa dos dias da semana
const BUSINESS_DAYS_ORDER = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

export function useBusinessHoursTab() {
  const form = useFormContext<TStoreFormSchema>();

  const businessDays = form.watch('businessDays');

  const orderedBusinessDays = useMemo(() => {
    return BUSINESS_DAYS_ORDER.reduce(
      (acc, day) => ({
        ...acc,
        [day]: businessDays[day],
      }),
      {} as Record<keyof TStoreFormSchema['businessDays'], boolean>,
    );
  }, [businessDays]);

  const handleDayToggle = useCallback(
    (day: keyof TStoreFormSchema['businessDays']) => {
      const current = form.getValues('businessDays');
      current[day] = !current[day];
      form.setValue('businessDays', current, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [form],
  );

  return {
    businessDays: orderedBusinessDays,
    handleDayToggle,
  };
}
