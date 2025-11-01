import {
  AlertCircle,
  Ban,
  CheckCircle,
  Clock,
} from 'lucide-react';

/**
 * Configuração de status de agendamentos
 */
export const STATUS_CONFIG = {
  scheduled: {
    label: 'Agendado',
    className: 'border-blue-200 bg-blue-50/50 text-blue-700',
    icon: Clock,
  },
  completed: {
    label: 'Concluído',
    className: 'border-green-200 bg-green-50/50 text-green-700',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelado',
    className: 'border-red-200 bg-red-50/50 text-red-700',
    icon: Ban,
  },
  'no-show': {
    label: 'Não Compareceu',
    className: 'border-orange-200 bg-orange-50/50 text-orange-700',
    icon: AlertCircle,
  },
} as const;

/**
 * Constantes de configuração do grid
 */
export const GRID_CONSTANTS = {
  SLOT_HEIGHT: 64,
} as const;

/**
 * Breakpoints responsivos
 */
export const BREAKPOINTS = {
  MOBILE: 768, // md breakpoint (Tailwind padrão)
} as const;

/**
 * Alturas de container
 */
export const CONTAINER_HEIGHTS = {
  MOBILE_BLOCK_MODE: 'calc(100vh - 200px)',
  MOBILE_NORMAL_MODE: 'calc(100vh - 200px)',
  DESKTOP: 'auto',
} as const;
