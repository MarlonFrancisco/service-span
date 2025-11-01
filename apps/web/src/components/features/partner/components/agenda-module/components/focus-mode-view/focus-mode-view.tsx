import {
  Button,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useIsMobile,
} from '@repo/ui';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Lock,
  Minimize2,
  Plus,
  Unlock,
  User,
} from 'lucide-react';
import { toast } from 'sonner';
import { AddAppointmentResponsive } from '../add-appointment-responsive/add-appointment-responsive';
import { AgendaGrid } from '../agenda-grid';
import { AppointmentDetailsResponsive } from '../appointment-details-responsive/appointment-details-responsive';
import { BlockModeAlert } from '../block-mode-alert/block-mode-alert';
import { useFocusModeView } from './focus-mode-view.hook';

export function FocusModeView() {
  const isMobile = useIsMobile();
  const {
    currentWeek,
    isBlockMode,
    selectedProfessional,
    professionals,
    selectedDayIndex,
    monthYear,
    setCurrentWeek,
    setIsBlockMode,
    setIsFocusMode,
    setSelectedProfessional,
    setSelectedDayIndex,
    handleOpenAddAppointment,
  } = useFocusModeView();

  const overlays = (
    <>
      <AppointmentDetailsResponsive />

      <AddAppointmentResponsive />
    </>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-50">
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-3">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsFocusMode(false);
                  setIsBlockMode(false);
                }}
                className="h-10 px-3 text-gray-600 hover:text-gray-900"
              >
                <Minimize2 className="mr-2 h-4 w-4" />
                Sair do Foco
              </Button>

              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                <CalendarDays className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-900 capitalize">
                  {monthYear}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (isBlockMode) {
                        setSelectedDayIndex(Math.max(0, selectedDayIndex - 1));
                      } else {
                        setCurrentWeek(currentWeek - 1);
                      }
                    }}
                    className="h-9 w-9 p-0 hover:bg-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (isBlockMode) {
                        setSelectedDayIndex(0);
                      } else {
                        setCurrentWeek(0);
                      }
                    }}
                    disabled={
                      isBlockMode ? selectedDayIndex === 0 : currentWeek === 0
                    }
                    className="h-9 px-3 text-sm hover:bg-white disabled:opacity-50"
                  >
                    Hoje
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (isBlockMode) {
                        setSelectedDayIndex(Math.min(6, selectedDayIndex + 1));
                      } else {
                        setCurrentWeek(currentWeek + 1);
                      }
                    }}
                    className="h-9 w-9 p-0 hover:bg-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <Select
                  value={selectedProfessional}
                  onValueChange={setSelectedProfessional}
                >
                  <SelectTrigger className="h-9 flex-1 border-gray-300 bg-white">
                    <User className="mr-2 h-4 w-4 text-gray-600" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {professionals.map((prof) => (
                      <SelectItem key={prof.id} value={prof.id}>
                        {prof.user.firstName} {prof.user.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={isBlockMode ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    const nextValue = !isBlockMode;
                    setIsBlockMode(nextValue);
                    toast.info(
                      nextValue
                        ? 'Modo de bloqueio ativado'
                        : 'Modo de bloqueio desativado',
                    );
                  }}
                  className={`h-9 flex-1 ${isBlockMode ? 'bg-orange-600 text-white hover:bg-orange-700' : 'border-gray-300'}`}
                >
                  {isBlockMode ? (
                    <Lock className="mr-2 h-4 w-4" />
                  ) : (
                    <Unlock className="mr-2 h-4 w-4" />
                  )}
                  {isBlockMode ? 'Bloqueio Ativo' : 'Bloquear'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <AgendaGrid />

        <Button
          onClick={handleOpenAddAppointment}
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-black text-white shadow-lg hover:bg-gray-800 md:hidden"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>

        {overlays}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <div className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex w-full items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFocusMode(false)}
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <Minimize2 className="mr-2 h-4 w-4" />
              Sair do Modo Focado
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5">
              <CalendarDays className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-900 capitalize">
                {monthYear}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={selectedProfessional}
              onValueChange={setSelectedProfessional}
            >
              <SelectTrigger className="w-[200px] border-gray-200 bg-white">
                <User className="mr-2 h-4 w-4 text-gray-600" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Profissionais</SelectItem>
                {professionals.map((prof) => (
                  <SelectItem key={prof.id} value={prof.id}>
                    {prof.user.firstName} {prof.user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentWeek(currentWeek - 1)}
                className="h-8 w-8 p-0 hover:bg-white hover:text-gray-900"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentWeek(0)}
                disabled={currentWeek === 0}
                className="h-8 px-3 hover:bg-white hover:text-gray-900 disabled:opacity-50"
              >
                Hoje
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentWeek(currentWeek + 1)}
                className="h-8 w-8 p-0 hover:bg-white hover:text-gray-900"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant={isBlockMode ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                const nextValue = !isBlockMode;
                setIsBlockMode(nextValue);
                toast.info(
                  nextValue
                    ? 'Modo de bloqueio ativado'
                    : 'Modo de bloqueio desativado',
                );
              }}
              className={
                isBlockMode
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'border-gray-300 hover:bg-gray-50'
              }
            >
              {isBlockMode ? (
                <Lock className="mr-2 h-4 w-4" />
              ) : (
                <Unlock className="mr-2 h-4 w-4" />
              )}
              {isBlockMode ? 'Bloqueio Ativo' : 'Bloquear Horários'}
            </Button>

            <Button
              onClick={handleOpenAddAppointment}
              className="bg-black text-white hover:bg-gray-800"
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Agendamento
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="mb-4">
          <BlockModeAlert />
        </div>

        <Card className="border-gray-200 py-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <AgendaGrid />
            </div>
          </CardContent>
        </Card>
      </div>

      {overlays}
    </div>
  );
}
