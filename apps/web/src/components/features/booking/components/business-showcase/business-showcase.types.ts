import type { HTMLAttributes } from 'react';

export type TBusinessShowcaseConfig = HTMLAttributes<HTMLDivElement> & {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
  description?: string;
  images?: string[];
  imageUrl?: string;
};

export type TUseBusinessShowcaseConfig = {
  images?: string[];
  imageUrl?: string;
  onImageClick?: (index: number) => void;
};

export type TBusinessInfo = {
  name: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  category: string;
  description: string;
};

export type TImageGridConfig = {
  images: string[];
  businessName: string;
  onImageClick: (index: number) => void;
  onShowAll: () => void;
};

export type TBusinessHeaderConfig = {
  businessName: string;
  onShare?: () => void;
  onSave?: () => void;
};

export type TBusinessDetailsConfig = {
  category: string;
  address: string;
  rating: number;
  reviewCount: number;
};
