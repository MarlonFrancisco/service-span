import type { useAgendaGrid } from '../../agenda-grid.hook';

/**
 * Configuração para Desktop View
 */
export type TDesktopViewConfig = {
  gridHook: ReturnType<typeof useAgendaGrid>;
};
