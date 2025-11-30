import { useLocaleStore } from '@/store/locale';
import {
  CURRENCIES,
  getCountriesByRegion,
  type TCountryCode,
  type TCurrencyCode,
} from '@repo/shared/constants';
import { useCallback, useMemo } from 'react';
import type { TUseLocaleDialogConfig } from './locale-dialog.types';

export const useLocaleDialog = ({ onOpenChange }: TUseLocaleDialogConfig) => {
  const {
    country,
    currency,
    autoTranslate,
    setCountry,
    setCurrency,
    setAutoTranslate,
  } = useLocaleStore();

  const regions = useMemo(() => getCountriesByRegion(), []);

  const recommendedCountries = useMemo(
    () => ['BR', 'US', 'PT'] as TCountryCode[],
    [],
  );

  const currencyCodes = useMemo(
    () => Object.keys(CURRENCIES) as TCurrencyCode[],
    [],
  );

  const handleCountrySelect = useCallback(
    (code: TCountryCode) => {
      setCountry(code);
    },
    [setCountry],
  );

  const handleCurrencySelect = useCallback(
    (code: TCurrencyCode) => {
      setCurrency(code);
    },
    [setCurrency],
  );

  const handleAutoTranslateToggle = useCallback(
    (checked: boolean) => {
      setAutoTranslate(checked);
    },
    [setAutoTranslate],
  );

  const handleSave = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return {
    country,
    currency,
    autoTranslate,
    regions,
    recommendedCountries,
    currencyCodes,
    handleCountrySelect,
    handleCurrencySelect,
    handleAutoTranslateToggle,
    handleSave,
  };
};
