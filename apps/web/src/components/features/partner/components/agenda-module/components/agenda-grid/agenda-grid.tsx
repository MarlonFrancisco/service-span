import { useIsMobile } from '@repo/ui';
import { useAgendaGrid } from './agenda-grid.hook';
import { AgendaGridDesktopView } from './components/agenda-grid-desktop-view';
import { AgendaGridMobileView } from './components/agenda-grid-mobile-view';

export const AgendaGrid = () => {
  const isMobile = useIsMobile();
  const gridHook = useAgendaGrid();

  if (isMobile) {
    return <AgendaGridMobileView gridHook={gridHook} />;
  }

  return <AgendaGridDesktopView gridHook={gridHook} />;
};
