import type { HTMLAttributes } from 'react';

export type THeaderConfig = HTMLAttributes<HTMLElement>;

export type TUseHeaderConfig = {
  onMenuToggle?: (isOpen: boolean) => void;
};

export type TNavigationItem = {
  href: string;
  label: string;
};

export type TSocialLink = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type TContactAddress = {
  city: string;
  street: string;
  postalCode: string;
  country: string;
};
