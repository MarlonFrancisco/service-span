import * as React from 'react';
import { Input } from './input';
import { cn } from '@repo/ui/lib/utils';

export interface PostalCodeInputProps
  extends Omit<React.ComponentProps<'input'>, 'onChange' | 'value'> {
  value?: string;
  onChange?: (value: string) => void;
  mask?: string;
  label?: string;
}

/**
 * Apply mask to postal code value
 * @param value - Raw input value
 * @param mask - Mask pattern (# for digit, A for letter, others are literals)
 * @returns Masked value
 */
function applyPostalCodeMask(value: string, mask: string): string {
  if (!mask) return value;

  const cleanValue = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  let result = '';
  let valueIndex = 0;

  for (const maskChar of mask) {
    if (valueIndex >= cleanValue.length) break;

    if (maskChar === '#') {
      // Expect digit
      if (/\d/.test(cleanValue[valueIndex]!)) {
        result += cleanValue[valueIndex];
        valueIndex++;
      } else {
        // Skip non-digit characters
        valueIndex++;
      }
    } else if (maskChar === 'A') {
      // Expect letter
      if (/[A-Z]/i.test(cleanValue[valueIndex]!)) {
        result += cleanValue[valueIndex];
        valueIndex++;
      } else {
        // Skip non-letter characters
        valueIndex++;
      }
    } else {
      // Literal character (like - or space)
      result += maskChar;
      // Don't increment valueIndex - the mask char is added automatically
    }
  }

  return result;
}

function PostalCodeInput({
  value = '',
  onChange,
  mask = '#####',
  label = 'Postal Code',
  placeholder,
  className,
  ...props
}: PostalCodeInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const maskedValue = applyPostalCodeMask(rawValue, mask);
    onChange?.(maskedValue);
  };

  // Generate placeholder from mask if not provided
  const defaultPlaceholder = mask
    .replace(/#/g, '0')
    .replace(/A/g, 'A');

  return (
    <Input
      type="text"
      inputMode="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder || defaultPlaceholder}
      className={cn(className)}
      aria-label={label}
      {...props}
    />
  );
}

export { PostalCodeInput, applyPostalCodeMask };

