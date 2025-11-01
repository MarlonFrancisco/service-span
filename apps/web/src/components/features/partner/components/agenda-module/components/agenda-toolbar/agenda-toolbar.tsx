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
  Maximize2,
  Plus,
  Unlock,
  User,
} from 'lucide-react';
import { useAgendaToolbar } from './agenda-toolbar.hook';

export function AgendaToolbar() {
  const isMobile = useIsMobile();
  const {
    monthYear,
    currentWeek,
    isBlockMode,
    selectedProfessional,
    professionals,
    handlePreviousWeek,
    handleNextWeek,
    handleToday,
    handleToggleBlockMode,
    handleEnterFocusMode,
    handleOpenAddAppointment,
    handleProfessionalChange,
  } = useAgendaToolbar();

  if (isMobile) {
    return (
      <div className="md:hidden space-y-3">
        <Card className="border-gray-200 py-0">
          <CardContent className="p-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePreviousWeek}
                    className="h-8 w-8 p-0 hover:bg-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToday}
                    disabled={currentWeek === 0}
                    className="h-8 px-2 text-xs hover:bg-white disabled:opacity-50"
                  >
                    Hoje
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNextWeek}
                    className="h-8 w-8 p-0 hover:bg-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5">
                  <CalendarDays className="h-4 w-4 text-gray-600" />
                  <span className="text-xs text-gray-900 capitalize">
                    {monthYear}
                  </span>
                </div>
              </div>

              <Select
                value={selectedProfessional}
                onValueChange={handleProfessionalChange}
              >
                <SelectTrigger className="h-9 w-full bg-white border-gray-200">
                  <User className="h-4 w-4 mr-2 text-gray-600" />
                  <SelectValue placeholder="Profissional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Profissionais</SelectItem>
                  {professionals.map((profissional) => (
                    <SelectItem key={profissional.id} value={profissional.id}>
                      {profissional.user.firstName} {profissional.user.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEnterFocusMode}
                  className="h-9 border-gray-300"
                >
                  <Maximize2 className="h-4 w-4 mr-1.5" />
                  Foco
                </Button>
                <Button
                  variant={isBlockMode ? 'default' : 'outline'}
                  size="sm"
                  onClick={handleToggleBlockMode}
                  className={`h-9 ${isBlockMode ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'border-gray-300'}`}
                >
                  {isBlockMode ? (
                    <Lock className="h-4 w-4 mr-1.5" />
                  ) : (
                    <Unlock className="h-4 w-4 mr-1.5" />
                  )}
                  {isBlockMode ? 'Ativo' : 'Bloquear'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm md:px-6 md:py-4">
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEnterFocusMode}
            className="border-gray-300 hover:bg-gray-50"
          >
            <Maximize2 className="h-4 w-4 mr-2" />
            Modo Focado
          </Button>
          <div className="hidden md:flex h-6 w-px bg-gray-300" />
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePreviousWeek}
            className="h-8 w-8 p-0 hover:bg-white hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToday}
            disabled={currentWeek === 0}
            className="h-8 px-3 hover:bg-white hover:text-gray-900 disabled:opacity-50"
          >
            Hoje
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextWeek}
            className="h-8 w-8 p-0 hover:bg-white hover:text-gray-900"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
          <CalendarDays className="h-4 w-4 text-gray-600" />
          <span className="text-sm text-gray-900 capitalize">{monthYear}</span>
        </div>

        <Select
          value={selectedProfessional}
          onValueChange={handleProfessionalChange}
        >
          <SelectTrigger className="w-full sm:w-[200px] bg-white border-gray-200">
            <User className="h-4 w-4 mr-2 text-gray-600" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Profissionais</SelectItem>
            {professionals.map((professional) => (
              <SelectItem key={professional.id} value={professional.id}>
                {professional.user.firstName} {professional.user.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={isBlockMode ? 'default' : 'outline'}
          size="sm"
          onClick={handleToggleBlockMode}
          className={
            isBlockMode
              ? 'bg-orange-600 hover:bg-orange-700 text-white'
              : 'border-gray-300 hover:bg-gray-50'
          }
        >
          {isBlockMode ? (
            <Lock className="h-4 w-4 mr-2" />
          ) : (
            <Unlock className="h-4 w-4 mr-2" />
          )}
          {isBlockMode ? 'Bloqueio Ativo' : 'Bloquear Horários'}
        </Button>

        <div className="hidden lg:block h-6 w-px bg-gray-300" />

        <Button
          onClick={handleOpenAddAppointment}
          className="bg-black hover:bg-gray-800 text-white"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>
    </div>
  );
}
