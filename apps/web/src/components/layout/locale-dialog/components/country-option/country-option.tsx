import { cn, getFlagEmoji } from '@repo/ui';
import { Check } from 'lucide-react';
import { getLocaleName } from '../../utils/locale-dialog.helpers';
import type { TCountryOptionConfig } from './country-option.types';

export const CountryOption = ({
  code,
  name,
  locale,
  isSelected,
  onClick,
}: TCountryOptionConfig) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-start gap-3 p-3 rounded-xl border text-left transition-all',
        isSelected
          ? 'border-neutral-950 bg-neutral-50'
          : 'border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50',
      )}
    >
      <span className="text-xl">{getFlagEmoji(code)}</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{name}</p>
        <p className="text-xs text-neutral-500 truncate">
          {getLocaleName(locale)}
        </p>
      </div>
      {isSelected && (
        <Check className="h-4 w-4 text-neutral-950 shrink-0 mt-0.5" />
      )}
    </button>
  );
};
