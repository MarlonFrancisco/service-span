import { useAgendaStore } from '@/store/admin/agenda';
import { Alert, AlertDescription } from '@repo/ui';
import { Lock } from 'lucide-react';

export function BlockModeAlert() {
  const isBlockMode = useAgendaStore((state) => state.isBlockMode);

  if (!isBlockMode) {
    return null;
  }

  return (
    <Alert className="border-orange-200 bg-orange-50">
      <Lock className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        <strong>Modo de bloqueio ativado.</strong> Clique nos horários vazios ou
        arraste para bloquear ou desbloquear.
      </AlertDescription>
    </Alert>
  );
}
