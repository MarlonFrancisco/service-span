'use client';

import {
  Button,
  cn,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@repo/ui';
import { FileQuestion, LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NotFoundProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  showAction?: boolean;
  className?: string;
}

export function NotFound({
  title = 'Página não encontrada',
  description = 'Desculpe, não conseguimos encontrar a página que você está procurando. Verifique o URL ou volte para a página inicial.',
  icon: Icon = FileQuestion,
  actionLabel = 'Voltar para início',
  onAction,
  showAction = true,
  className,
}: NotFoundProps) {
  const router = useRouter();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      router.push('/');
    }
  };

  return (
    <Empty
      className={cn(
        'min-h-[calc(100vh-156px)] flex items-center justify-center',
        className,
      )}
    >
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon className="h-6 w-6" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {showAction && (
        <EmptyContent>
          <Button onClick={handleAction}>{actionLabel}</Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
