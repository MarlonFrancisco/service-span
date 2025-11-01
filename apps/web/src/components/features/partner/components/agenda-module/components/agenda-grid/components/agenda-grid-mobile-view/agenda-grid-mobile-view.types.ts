import type { useAgendaGrid } from '../../agenda-grid.hook';

/**
 * Configuração para Mobile View
 */
export type TMobileViewConfig = {
  gridHook: ReturnType<typeof useAgendaGrid>;
};
