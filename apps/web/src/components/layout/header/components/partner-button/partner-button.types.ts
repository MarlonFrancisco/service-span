import type { ButtonHTMLAttributes } from 'react';

export type TPartnerButtonConfig = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'light' | 'dark';
};

