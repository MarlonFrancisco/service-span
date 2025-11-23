'use client';

import { useSubscriptionQuery } from '@/hooks/use-query/use-subscription-query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@repo/ui';
import { AlertTriangle, RefreshCw, Shield } from 'lucide-react';

interface CancelReactivateDialogProps {
  isOpen: boolean;
  isFetching: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CancelReactivateDialog({
  isOpen,
  isFetching,
  onConfirm,
  onCancel,
}: CancelReactivateDialogProps) {
  const { currentPlan } = useSubscriptionQuery();

  if (!currentPlan) return null;

  const formattedNextBillingDate = currentPlan.nextBillingDate
    ? new Date(currentPlan.nextBillingDate).toLocaleDateString('pt-BR')
    : 'data indefinida';

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`p-3 rounded-full ${
                currentPlan.cancelAtPeriodEnd ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              {currentPlan.cancelAtPeriodEnd ? (
                <RefreshCw className="h-6 w-6 text-green-600" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-600" />
              )}
            </div>
            <AlertDialogTitle className="text-xl">
              {currentPlan.cancelAtPeriodEnd
                ? 'Reativar Plano'
                : 'Cancelar Plano'}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-3 pt-2">
            {currentPlan.cancelAtPeriodEnd ? (
              <>
                <p className="text-gray-700">
                  Deseja reativar seu plano{' '}
                  <strong>{currentPlan.planName}</strong>?
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-green-900">
                        Renovação automática será reativada
                      </p>
                      <p className="text-sm text-green-700">
                        Seu plano será renovado automaticamente em{' '}
                        <strong>{formattedNextBillingDate}</strong> e você
                        continuará tendo acesso a todos os recursos premium.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  A cobrança automática será retomada na próxima data de
                  renovação.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-700">
                  Tem certeza que deseja cancelar seu plano{' '}
                  <strong>{currentPlan.planName}</strong>?
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-blue-900">
                        Seu acesso permanecerá ativo
                      </p>
                      <p className="text-sm text-blue-700">
                        Você continuará tendo acesso à plataforma até o final do
                        ciclo atual em{' '}
                        <strong>{formattedNextBillingDate}</strong>.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Após o cancelamento, você não será mais cobrado e perderá o
                  acesso a plataforma.
                </p>
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isFetching} onClick={onCancel}>
            {currentPlan.cancelAtPeriodEnd ? 'Voltar' : 'Manter Plano'}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isFetching}
            className={
              currentPlan.cancelAtPeriodEnd
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            }
          >
            {isFetching
              ? currentPlan.cancelAtPeriodEnd
                ? 'Reativando...'
                : 'Cancelando...'
              : currentPlan.cancelAtPeriodEnd
                ? 'Sim, Reativar Plano'
                : 'Sim, Cancelar Plano'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
