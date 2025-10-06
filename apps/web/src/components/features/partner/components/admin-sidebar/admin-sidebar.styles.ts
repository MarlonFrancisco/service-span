// AdminSidebar Styles - ANCR-FA Architecture
import { cva } from 'class-variance-authority';

export const adminSidebarVariants = cva(
  // Base styles
  'w-64 bg-white border-r border-gray-200 flex flex-col',
  {
    variants: {
      layout: {
        default: '',
        mobile: 'w-full h-full',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  },
);

export const sidebarHeaderVariants = cva(
  // Base styles
  'p-6 border-b border-gray-200',
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

export const sidebarNavVariants = cva(
  // Base styles
  'flex-1 p-4',
  {
    variants: {
      layout: {
        default: '',
        mobile: 'p-3',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  },
);

export const sidebarFooterVariants = cva(
  // Base styles
  'p-4 border-t border-gray-200',
  {
    variants: {
      layout: {
        default: '',
        mobile: 'p-3',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  },
);

export const menuItemVariants = cva(
  // Base styles
  'w-full text-left p-3 rounded-lg transition-colors flex items-start gap-3',
  {
    variants: {
      variant: {
        active: 'bg-[#1a2b4c] text-white',
        inactive: 'text-gray-700 hover:bg-gray-50',
      },
    },
    defaultVariants: {
      variant: 'inactive',
    },
  },
);

export const menuIconVariants = cva(
  // Base styles
  'h-5 w-5 mt-0.5',
  {
    variants: {
      variant: {
        active: 'text-white',
        inactive: 'text-[#1a2b4c]',
      },
    },
    defaultVariants: {
      variant: 'inactive',
    },
  },
);

export const menuLabelVariants = cva(
  // Base styles
  'text-sm',
  {
    variants: {
      variant: {
        active: 'text-white',
        inactive: 'text-gray-900',
      },
    },
    defaultVariants: {
      variant: 'inactive',
    },
  },
);

export const menuDescriptionVariants = cva(
  // Base styles
  'text-xs',
  {
    variants: {
      variant: {
        active: 'text-gray-200',
        inactive: 'text-gray-500',
      },
    },
    defaultVariants: {
      variant: 'inactive',
    },
  },
);
