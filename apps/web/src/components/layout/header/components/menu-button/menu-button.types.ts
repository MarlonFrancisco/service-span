import type { ButtonHTMLAttributes } from 'react';

export type TMenuButtonConfig = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOpen: boolean;
  variant?: 'light' | 'dark';
};

