import { Button } from '@repo/ui';
import { Heart, Share } from 'lucide-react';
import type { TBusinessHeaderConfig } from '../../business-showcase.types';

export const BusinessHeader = ({
  businessName,
  onShare,
  onSave,
}: TBusinessHeaderConfig) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl text-[#1a2b4c] mb-2">{businessName}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 rounded-lg border-gray-300 hover:bg-gray-50"
          onClick={onShare}
        >
          <Share className="h-4 w-4" />
          Compartilhar
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 rounded-lg border-gray-300 hover:bg-gray-50"
          onClick={onSave}
        >
          <Heart className="h-4 w-4" />
          Salvar
        </Button>
      </div>
    </div>
  );
};
