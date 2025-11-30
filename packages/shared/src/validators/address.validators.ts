/**
 * Address validation utilities by country
 */

import { COUNTRIES, ICountry, type TCountryCode } from '../constants/countries';

/**
 * Validates a postal code based on the country format
 * @param postalCode - The postal code to validate
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns boolean indicating if the postal code is valid
 */
export const isValidPostalCode = (
  postalCode: string,
  countryCode: TCountryCode,
): boolean => {
  const country = COUNTRIES[countryCode];
  if (!country) return false;

  const regex = new RegExp(country.postalCodeFormat, 'i');
  return regex.test(postalCode.trim());
};

/**
 * Get the postal code label for a country (e.g., "CEP", "ZIP Code", "Postcode")
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns The localized label for postal code
 */
export const getPostalCodeLabel = (countryCode: TCountryCode): string => {
  const country = COUNTRIES[countryCode];
  return country?.postalCodeLabel || 'Postal Code';
};

/**
 * Get the postal code mask for a country
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns The mask format string (# represents a digit)
 */
export const getPostalCodeMask = (countryCode: TCountryCode): string => {
  const country = COUNTRIES[countryCode];
  return country?.postalCodeMask || '#####';
};

/**
 * Get the state/province label for a country
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns The localized label for state/province
 */
export const getStateLabel = (countryCode: TCountryCode): string => {
  const country = COUNTRIES[countryCode];
  return country?.stateLabel || 'State';
};

/**
 * Get the list of states/provinces for a country
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Array of state objects with code and name, or empty array
 */
export const getStates = (
  countryCode: TCountryCode,
): { code: string; name: string }[] => {
  const country = COUNTRIES[countryCode] as ICountry;
  return country?.states || [];
};

/**
 * Check if a country has a predefined list of states
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns boolean
 */
export const hasStates = (countryCode: TCountryCode): boolean => {
  const country = COUNTRIES[countryCode] as ICountry;

  return !!country?.states && country?.states.length > 0;
};

/**
 * Create a Zod-compatible regex pattern for postal code validation
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns RegExp for postal code validation
 */
export const getPostalCodeRegex = (countryCode: TCountryCode): RegExp => {
  const country = COUNTRIES[countryCode];
  if (!country) return /^.+$/;
  return new RegExp(country.postalCodeFormat, 'i');
};

/**
 * Get postal code placeholder based on country
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Placeholder string
 */
export const getPostalCodePlaceholder = (countryCode: TCountryCode): string => {
  const placeholders: Record<string, string> = {
    BR: '00000-000',
    US: '00000',
    MX: '00000',
    AR: '0000',
    CL: '0000000',
    CO: '000000',
    PE: '00000',
    PT: '0000-000',
    ES: '00000',
    FR: '00000',
    DE: '00000',
    IT: '00000',
    NL: '0000 AA',
    GB: 'AA00 0AA',
    IE: 'A00 A0A0',
    BE: '0000',
    AT: '0000',
  };

  return placeholders[countryCode] || '00000';
};
