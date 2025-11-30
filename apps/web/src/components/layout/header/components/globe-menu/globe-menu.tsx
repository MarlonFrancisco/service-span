'use client';

import { LocaleDialog } from '@/components/layout/locale-dialog';
import { Button, cn } from '@repo/ui/index';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import type { TGlobeMenuConfig } from './globe-menu.types';

export const GlobeMenu = ({ variant = 'light' }: TGlobeMenuConfig) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(true)}
        aria-label="Configurações de idioma e moeda"
        size="icon-lg"
        className={cn(
          variant === 'dark'
            ? 'text-white! hover:bg-white/10'
            : 'text-neutral-950 hover:bg-neutral-950/10',
        )}
      >
        <Globe className="h-5 w-5" />
      </Button>

      <LocaleDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};
