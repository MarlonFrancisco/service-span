import { Menu } from 'lucide-react';
import type { TMenuButtonConfig } from './menu-button.types';

export const MenuButton = ({
  isOpen,
  variant = 'light',
  ...props
}: TMenuButtonConfig) => {
  const isDark = variant === 'dark';

  if (isOpen && isDark) {
    return (
      <button
        type="button"
        aria-expanded={isOpen}
        className="group -m-2.5 rounded-full p-2.5 transition hover:bg-white/10"
        aria-label="Toggle navigation"
        id="header-menu-close-button"
        {...props}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6 fill-white group-hover:fill-neutral-200"
        >
          <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
          <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      className="group -m-2.5 rounded-full p-2.5 transition hover:bg-neutral-950/10"
      aria-label="Toggle navigation"
      id="header-menu-open-button"
      {...props}
    >
      <Menu className="h-6 w-6" />
    </button>
  );
};
