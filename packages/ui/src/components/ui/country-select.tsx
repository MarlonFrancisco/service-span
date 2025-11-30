import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { cn } from '@repo/ui/lib/utils';

export interface CountryOption {
  code: string;
  name: string;
  nativeName: string;
  phoneCode: string;
  flag?: string;
}

export interface CountrySelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  countries: CountryOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showPhoneCode?: boolean;
  showFlag?: boolean;
}

function CountrySelect({
  value,
  onValueChange,
  countries,
  placeholder = 'Select country',
  disabled = false,
  className,
  showPhoneCode = false,
  showFlag = true,
}: CountrySelectProps) {
  const selectedCountry = countries.find((c) => c.code === value);

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn('w-full', className)}>
        <SelectValue placeholder={placeholder}>
          {selectedCountry && (
            <span className="flex items-center gap-2">
              {showFlag && (
                <span className="text-base">
                  {getFlagEmoji(selectedCountry.code)}
                </span>
              )}
              <span>{selectedCountry.nativeName}</span>
              {showPhoneCode && (
                <span className="text-muted-foreground">
                  ({selectedCountry.phoneCode})
                </span>
              )}
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            <span className="flex items-center gap-2">
              {showFlag && (
                <span className="text-base">{getFlagEmoji(country.code)}</span>
              )}
              <span>{country.nativeName}</span>
              {showPhoneCode && (
                <span className="text-muted-foreground ml-auto">
                  {country.phoneCode}
                </span>
              )}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/**
 * Convert country code to flag emoji
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Flag emoji string
 */
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export { CountrySelect, getFlagEmoji };

