import { cn } from '@repo/ui/lib/utils';
import * as React from 'react';
import { getFlagEmoji } from './country-select';
import { Input } from './input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

export interface PhoneCodeOption {
  countryCode: string;
  phoneCode: string;
  name: string;
}

export interface PhoneInputProps
  extends Omit<React.ComponentProps<'input'>, 'onChange' | 'value'> {
  value?: string;
  onChange?: (value: string) => void;
  countryCode?: string;
  onCountryChange?: (countryCode: string) => void;
  phoneCodeOptions?: PhoneCodeOption[];
  showCountrySelect?: boolean;
  phonePlaceholder?: string;
}

function PhoneInput({
  value = '',
  onChange,
  countryCode = 'BR',
  onCountryChange,
  phoneCodeOptions = [],
  showCountrySelect = true,
  phonePlaceholder = '(00) 00000-0000',
  className,
  disabled,
  ...props
}: PhoneInputProps) {
  const selectedOption = phoneCodeOptions.find(
    (opt) => opt.countryCode === countryCode,
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Allow only digits, spaces, parentheses, and dashes
    const cleanValue = rawValue.replace(/[^\d\s()-]/g, '');
    onChange?.(cleanValue);
  };

  return (
    <div className={cn('flex gap-2', className)}>
      {showCountrySelect && phoneCodeOptions.length > 0 && (
        <Select
          value={countryCode}
          onValueChange={onCountryChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-[100px] shrink-0">
            <SelectValue>
              {selectedOption && (
                <span className="flex items-center gap-1.5">
                  <span className="text-base">
                    {getFlagEmoji(selectedOption.countryCode)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {selectedOption.phoneCode}
                  </span>
                </span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {phoneCodeOptions.map((option) => (
              <SelectItem key={option.countryCode} value={option.countryCode}>
                <span className="flex items-center gap-2">
                  <span className="text-base">
                    {getFlagEmoji(option.countryCode)}
                  </span>
                  <span className="text-xs">{option.phoneCode}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                    {option.name}
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Input
        type="tel"
        inputMode="tel"
        value={value}
        onChange={handlePhoneChange}
        placeholder={phonePlaceholder}
        disabled={disabled}
        className="flex-1"
        {...props}
      />
    </div>
  );
}

export { PhoneInput };
