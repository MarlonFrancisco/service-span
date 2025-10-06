import { Button } from '@repo/ui';
import type { TPartnerButtonConfig } from './partner-button.types';

export const PartnerButton = ({
  variant = 'light',
  ...props
}: TPartnerButtonConfig) => {
  const textColor = variant === 'dark' ? 'text-white' : 'text-black';
  const hoverStyles =
    variant === 'dark'
      ? 'hover:bg-gray-100 hover:text-black'
      : 'hover:bg-gray-100';

  return (
    <div className="hidden md:block">
      <Button
        variant="ghost"
        className={`text-sm font-medium ${textColor} ${hoverStyles} rounded-xl px-4 py-2`}
        {...props}
      >
        Seja um parceiro
      </Button>
    </div>
  );
};

