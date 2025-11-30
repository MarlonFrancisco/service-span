/**
 * Phone validation utilities by country
 */

import { COUNTRIES, type TCountryCode } from '../constants/countries';

/**
 * Get the phone code for a country (e.g., "+55", "+1")
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns The phone country code with + prefix
 */
export const getPhoneCode = (countryCode: TCountryCode): string => {
  const country = COUNTRIES[countryCode];
  return country?.phoneCode || '+1';
};

/**
 * Get the phone format mask for a country
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns The mask format string (# represents a digit)
 */
export const getPhoneFormat = (countryCode: TCountryCode): string => {
  const country = COUNTRIES[countryCode];
  return country?.phoneFormat || '(###) ###-####';
};

/**
 * Get phone placeholder based on country format
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Placeholder string
 */
export const getPhonePlaceholder = (countryCode: TCountryCode): string => {
  const format = getPhoneFormat(countryCode);
  return format.replace(/#/g, '0');
};

/**
 * Normalize phone number to E.164 format
 * Removes all non-digit characters and adds country code if missing
 * @param phone - The phone number to normalize
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Normalized phone number in E.164 format
 */
export const normalizePhone = (
  phone: string,
  countryCode: TCountryCode,
): string => {
  if (!phone) return '';

  // Remove all non-digit characters except +
  const digitsOnly = phone.replace(/[^\d+]/g, '');

  // If it already starts with +, return as is (already has country code)
  if (digitsOnly.startsWith('+')) {
    return digitsOnly;
  }

  // Add country code
  const phoneCode = getPhoneCode(countryCode).replace('+', '');
  return `+${phoneCode}${digitsOnly}`;
};

/**
 * Format phone number according to country format
 * @param phone - The phone number (digits only or E.164)
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Formatted phone number
 */
export const formatPhone = (
  phone: string,
  countryCode: TCountryCode,
): string => {
  if (!phone) return '';

  const format = getPhoneFormat(countryCode);
  const phoneCode = getPhoneCode(countryCode);

  // Remove country code and non-digits
  let digits = phone
    .replace(/[^\d]/g, '')
    .replace(new RegExp(`^${phoneCode.replace('+', '')}`), '');

  // Apply format mask
  let result = '';
  let digitIndex = 0;

  for (const char of format) {
    if (digitIndex >= digits.length) break;

    if (char === '#') {
      result += digits[digitIndex];
      digitIndex++;
    } else {
      result += char;
    }
  }

  return result;
};

/**
 * Validate phone number length based on country
 * @param phone - The phone number (digits only)
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns boolean indicating if phone length is valid
 */
export const isValidPhoneLength = (
  phone: string,
  countryCode: TCountryCode,
): boolean => {
  const format = getPhoneFormat(countryCode);
  const expectedLength = (format.match(/#/g) || []).length;
  const digits = phone.replace(/[^\d]/g, '');

  // Allow some flexibility (±1 digit) for different carriers
  return (
    digits.length >= expectedLength - 1 && digits.length <= expectedLength + 1
  );
};

/**
 * Get all supported country phone codes for dropdown
 * @returns Array of objects with country code, phone code, and flag info
 */
export const getPhoneCodeOptions = () => {
  return Object.entries(COUNTRIES).map(([code, country]) => ({
    countryCode: code as TCountryCode,
    phoneCode: country.phoneCode,
    name: country.nativeName,
    flag: code.toLowerCase(),
  }));
};
