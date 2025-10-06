// Partner Dashboard Styles - ANCR-FA Architecture
import { cva } from 'class-variance-authority';

export const partnerDashboardVariants = cva(
  // Base styles
  'min-h-screen bg-gray-50 flex',
  {
    variants: {
      layout: {
        default: '',
        mobile: 'flex-col',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  },
);

export const mainContentVariants = cva(
  // Base styles
  'flex-1 flex flex-col',
  {
    variants: {
      layout: {
        default: '',
        mobile: 'w-full',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  },
);

export const topBarVariants = cva(
  // Base styles
  'bg-white border-b border-gray-200 px-6 py-4',
  {
    variants: {
      layout: {
        default: '',
        mobile: 'px-4 py-3',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  },
);

export const moduleContentVariants = cva(
  // Base styles
  'flex-1 p-6',
  {
    variants: {
      layout: {
        default: '',
        mobile: 'p-4',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  },
);

export const moduleTitleVariants = cva(
  // Base styles
  'text-[#1a2b4c] text-xl font-medium',
  {
    variants: {
      size: {
        sm: 'text-lg',
        default: 'text-xl',
        lg: 'text-2xl',
      },
      weight: {
        normal: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      size: 'default',
      weight: 'normal',
    },
  },
);
