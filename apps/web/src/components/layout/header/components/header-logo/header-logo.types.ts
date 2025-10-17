import { HTMLAttributes } from 'react';

export type THeaderLogoConfig = {
  variant?: 'light' | 'dark';
  width?: number;
  height?: number;
} & HTMLAttributes<HTMLAnchorElement>;
