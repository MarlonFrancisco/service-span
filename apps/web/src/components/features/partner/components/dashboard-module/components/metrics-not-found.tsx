'use client';

import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@repo/ui';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface MetricsNotFoundProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: LucideIcon;
}

export function MetricsNotFound({
  title = 'Nenhuma métrica disponível',
  description = 'Ainda não há dados de métricas para exibir. Comece a registrar para ver suas estatísticas aqui.',
  actionLabel = 'Voltar',
  onAction,
  icon: Icon,
}: MetricsNotFoundProps) {
  return (
    <div className="min-h-[calc(100vh-156px)] flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            {Icon ? <Icon className="h-6 w-6" /> : <div />}
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
        {onAction && (
          <EmptyContent>
            <Button
              className="flex items-center gap-2"
              onClick={onAction}
            >
              {actionLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </EmptyContent>
        )}
      </Empty>
    </div>
  );
}
