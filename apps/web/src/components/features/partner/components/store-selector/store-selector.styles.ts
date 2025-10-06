// StoreSelector Styles - ANCR-FA Architecture
import { cva } from 'class-variance-authority';

export const storeSelectorVariants = cva(
  // Base styles
  'relative',
  {
    variants: {
      size: {
        sm: '',
        default: '',
        lg: '',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export const storeSelectorButtonVariants = cva(
  // Base styles
  'flex items-center gap-2 min-w-[200px] justify-between border-[#1a2b4c]/20 hover:border-[#20b2aa]',
  {
    variants: {
      variant: {
        default: 'bg-white',
        outline: 'border border-gray-300',
      },
      size: {
        sm: 'h-8 px-2 text-sm',
        default: 'h-10 px-3',
        lg: 'h-12 px-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
    },
  },
);

export const storeSelectorDropdownVariants = cva(
  // Base styles
  'absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20',
  {
    variants: {
      size: {
        sm: 'w-48',
        default: 'w-64',
        lg: 'w-80',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export const storeSelectorItemVariants = cva(
  // Base styles
  'p-3 cursor-pointer rounded-md transition-colors',
  {
    variants: {
      variant: {
        active: 'bg-[#20b2aa]/10 text-[#1a2b4c]',
        inactive: 'hover:bg-gray-50',
      },
    },
    defaultVariants: {
      variant: 'inactive',
    },
  },
);

export const storeSelectorIconVariants = cva(
  // Base styles
  'h-4 w-4',
  {
    variants: {
      color: {
        primary: 'text-[#20b2aa]',
        muted: 'text-gray-400',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  },
);

export const storeSelectorTextVariants = cva(
  // Base styles
  'text-left',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        default: '',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

export const storeSelectorActiveIndicatorVariants = cva(
  // Base styles
  'w-2 h-2 bg-[#20b2aa] rounded-full',
  {
    variants: {
      size: {
        sm: 'w-1.5 h-1.5',
        default: 'w-2 h-2',
        lg: 'w-3 h-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);
