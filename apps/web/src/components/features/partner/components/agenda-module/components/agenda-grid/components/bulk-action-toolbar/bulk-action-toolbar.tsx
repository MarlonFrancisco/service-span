import { Button } from '@repo/ui';
import { Lock, X } from 'lucide-react';
import type { TBulkActionToolbarConfig } from './bulk-action-toolbar.types';

/**
 * ANCR-FA Component: Bulk Action Toolbar
 * Floating toolbar that appears when slots are selected in block mode
 *
 * @param config - Configuration with selectedCount, onBlock, and onClear handlers
 */
export const BulkActionToolbar = ({
  selectedCount,
  onBlock,
  onClear,
}: TBulkActionToolbarConfig) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <span className="text-sm font-semibold text-blue-700">
              {selectedCount}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {selectedCount === 1 ? 'slot selecionado' : 'slots selecionados'}
          </span>
        </div>

        <div className="h-6 w-px bg-gray-300" />

        <div className="flex gap-2">
          <Button
            onClick={onBlock}
            size="sm"
            className="gap-2"
            variant="default"
            aria-label={`Bloquear ${selectedCount} ${selectedCount === 1 ? 'slot' : 'slots'}`}
          >
            <Lock className="h-4 w-4" />
            Bloquear {selectedCount === 1 ? 'slot' : 'slots'}
          </Button>

          <Button
            onClick={onClear}
            size="sm"
            variant="outline"
            aria-label="Limpar seleção"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
