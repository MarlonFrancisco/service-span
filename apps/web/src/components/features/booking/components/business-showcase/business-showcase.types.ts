import type { HTMLAttributes } from 'react';

export type TBusinessShowcaseConfig = HTMLAttributes<HTMLDivElement> & {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
  description?: string;
  images: string[];
};
