import type { HTMLAttributes } from 'react';

export type THeaderConfig = HTMLAttributes<HTMLElement>;

export type TUseHeaderConfig = {
  onMenuToggle?: (isOpen: boolean) => void;
};

export type TNavigationItem = {
  href: string;
  label: string;
};
