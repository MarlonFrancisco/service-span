import { useAgendaStore } from '@/store/admin/agenda';
import { Button } from '@repo/ui';
import { Plus } from 'lucide-react';
import { AddAppointmentResponsive } from '../add-appointment-responsive/add-appointment-responsive';
import { AgendaDayView } from '../agenda-day-view';
import { AgendaGrid } from '../agenda-grid';
import { AgendaToolbar } from '../agenda-toolbar/agenda-toolbar';
import { AppointmentDetailsResponsive } from '../appointment-details-responsive/appointment-details-responsive';
import { BlockModeAlert } from '../block-mode-alert/block-mode-alert';
import { useAgendaDefaultView } from './agenda-default-view.hook';

export function AgendaDefaultView() {
  const { handleOpenAddAppointment } = useAgendaDefaultView();
  const viewMode = useAgendaStore((state) => state.viewMode);

  const sharedOverlays = (
    <>
      <AppointmentDetailsResponsive />

      <AddAppointmentResponsive />
    </>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <AgendaToolbar />

      <BlockModeAlert />

      {viewMode === 'grid' ? <AgendaGrid /> : <AgendaDayView />}

      <Button
        onClick={handleOpenAddAppointment}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-black text-white shadow-lg hover:bg-gray-800 md:hidden"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {sharedOverlays}
    </div>
  );
}
