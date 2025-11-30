import { cn } from '@repo/ui';
import { Check } from 'lucide-react';
import type { TCurrencyOptionConfig } from './currency-option.types';

export const CurrencyOption = ({
  code,
  name,
  symbol,
  isSelected,
  onClick,
}: TCurrencyOptionConfig) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl border text-left transition-all',
        isSelected
          ? 'border-neutral-950 bg-neutral-50'
          : 'border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50',
      )}
    >
      <span className="text-lg font-semibold text-neutral-700 w-8">
        {symbol}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{code}</p>
        <p className="text-xs text-neutral-500 truncate">{name}</p>
      </div>
      {isSelected && <Check className="h-4 w-4 text-neutral-950 shrink-0" />}
    </button>
  );
};
