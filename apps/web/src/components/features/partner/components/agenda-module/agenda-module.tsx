'use client';

import { useAgendaModule } from './agenda-module.hook';
import { AgendaDefaultView } from './components/agenda-default-view/agenda-default-view';
import { FocusModeView } from './components/focus-mode-view/focus-mode-view';

export function AgendaModule() {
  const { isFocusMode } = useAgendaModule();

  if (isFocusMode) {
    return <FocusModeView />;
  }

  return <AgendaDefaultView />;
}
