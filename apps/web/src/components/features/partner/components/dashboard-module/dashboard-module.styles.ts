// DashboardOverview Styles - ANCR-FA Architecture
import { cva } from 'class-variance-authority';

export const dashboardOverviewVariants = cva(
  // Base styles
  'space-y-6',
  {
    variants: {
      layout: {
        default: '',
        compact: 'space-y-4',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  },
);

export const metricsGridVariants = cva(
  // Base styles
  'grid gap-6',
  {
    variants: {
      columns: {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      },
    },
    defaultVariants: {
      columns: 3,
    },
  },
);

export const metricCardVariants = cva(
  // Base styles
  'p-6 rounded-lg border bg-white',
  {
    variants: {
      variant: {
        default: 'border-gray-200',
        featured: 'border-[#20b2aa] bg-[#20b2aa]/5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const metricIconVariants = cva(
  // Base styles
  'h-8 w-8',
  {
    variants: {
      color: {
        primary: 'text-[#20b2aa]',
        orange: 'text-orange-500',
        blue: 'text-blue-500',
        green: 'text-green-500',
        purple: 'text-purple-500',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  },
);

export const metricValueVariants = cva(
  // Base styles
  'text-2xl font-bold text-[#1a2b4c]',
  {
    variants: {
      size: {
        sm: 'text-xl',
        default: 'text-2xl',
        lg: 'text-3xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export const metricLabelVariants = cva(
  // Base styles
  'text-sm text-gray-600',
  {
    variants: {
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
      },
    },
    defaultVariants: {
      weight: 'normal',
    },
  },
);

export const recentActivityVariants = cva(
  // Base styles
  'space-y-4',
  {
    variants: {
      layout: {
        default: '',
        compact: 'space-y-2',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  },
);

export const activityItemVariants = cva(
  // Base styles
  'flex items-center gap-3 p-3 rounded-lg border bg-white',
  {
    variants: {
      variant: {
        default: 'border-gray-200',
        new: 'border-blue-200 bg-blue-50',
        completed: 'border-green-200 bg-green-50',
        cancelled: 'border-red-200 bg-red-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const activityIconVariants = cva(
  // Base styles
  'h-4 w-4',
  {
    variants: {
      type: {
        booking: 'text-blue-500',
        completion: 'text-green-500',
        cancellation: 'text-red-500',
      },
    },
    defaultVariants: {
      type: 'booking',
    },
  },
);

export const activityBadgeVariants = cva(
  // Base styles
  'px-2 py-1 text-xs font-medium rounded-full',
  {
    variants: {
      status: {
        new: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
      },
    },
    defaultVariants: {
      status: 'new',
    },
  },
);
