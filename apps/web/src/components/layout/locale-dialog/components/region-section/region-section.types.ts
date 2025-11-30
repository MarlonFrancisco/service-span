import type { TCountryCode } from '@repo/shared/constants';

export type TRegionSectionConfig = {
  title: string;
  countries: TCountryCode[];
  selectedCountry: TCountryCode;
  onSelect: (code: TCountryCode) => void;
};
