'use client';
import { useAgenda } from '@/store/admin/agenda';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Switch,
} from '@repo/ui';
import { toast } from 'sonner';

export function SettingsDialog() {
  const {
    isSettingsOpen,
    workingDays,
    workingHours,
    setIsSettingsOpen,
    setWorkingDays,
    setWorkingHours,
  } = useAgenda();

  const handleSave = () => {
    toast.success('Configurações salvas com sucesso!');
    setIsSettingsOpen(false);
  };

  const dayNames: Record<string, string> = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo',
  };

  return (
    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configurações da Agenda</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label className="text-sm text-gray-900 mb-3 block">
              Dias de Funcionamento
            </Label>
            <div className="space-y-2">
              {Object.entries(workingDays).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <Label className="text-sm text-gray-700">
                    {dayNames[key]}
                  </Label>
                  <Switch
                    checked={value as boolean}
                    onCheckedChange={(checked) =>
                      setWorkingDays({ [key]: checked })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-900 mb-3 block">
              Horário de Funcionamento
            </Label>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">Abertura</Label>
                  <Input
                    type="time"
                    value={workingHours.start}
                    onChange={(e) => setWorkingHours({ start: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">Fechamento</Label>
                  <Input
                    type="time"
                    value={workingHours.end}
                    onChange={(e) => setWorkingHours({ end: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">Início Almoço</Label>
                  <Input
                    type="time"
                    value={workingHours.lunchStart}
                    onChange={(e) =>
                      setWorkingHours({ lunchStart: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">Fim Almoço</Label>
                  <Input
                    type="time"
                    value={workingHours.lunchEnd}
                    onChange={(e) =>
                      setWorkingHours({ lunchEnd: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setIsSettingsOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-black hover:bg-gray-800 text-white"
            >
              Salvar Alterações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
