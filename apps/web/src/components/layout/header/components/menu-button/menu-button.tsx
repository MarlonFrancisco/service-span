import { Button, cn } from '@repo/ui/index';
import { Menu } from 'lucide-react';
import type { TMenuButtonConfig } from './menu-button.types';

export const MenuButton = ({
  isOpen,
  variant = 'light',
  ...props
}: TMenuButtonConfig) => {
  return (
    <Button
      variant="ghost"
      aria-expanded={isOpen}
      className={cn(
        variant === 'dark'
          ? 'text-white! hover:bg-white/10'
          : 'text-neutral-950 hover:bg-neutral-950/10',
      )}
      aria-label="Toggle navigation"
      id="header-menu-open-button"
      {...props}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
};
