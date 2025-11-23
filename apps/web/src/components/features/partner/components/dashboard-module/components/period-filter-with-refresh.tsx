'use client';
import { Button, ToggleGroup, ToggleGroupItem } from '@repo/ui';
import { RefreshCw } from 'lucide-react';

export type PeriodFilterValue = 'week' | 'month' | 'quarter';

interface PeriodFilterWithRefreshProps {
  value: PeriodFilterValue;
  onValueChange: (value: PeriodFilterValue) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  periods?: PeriodFilterValue[];
  periodLabels?: Record<PeriodFilterValue, string>;
}

const defaultPeriodLabels: Record<PeriodFilterValue, string> = {
  week: 'Semanal',
  month: 'Mensal',
  quarter: 'Trimestral',
};

export function PeriodFilterWithRefresh({
  value,
  onValueChange,
  onRefresh,
  isRefreshing = false,
  periods = ['week', 'month', 'quarter'],
  periodLabels = defaultPeriodLabels,
}: PeriodFilterWithRefreshProps) {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      {/* Period Filter */}
      <div className="flex items-center gap-0.5 sm:gap-1 bg-gray-100 rounded-lg p-1 flex-1 sm:flex-initial">
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={(newValue) => {
            if (newValue) onValueChange(newValue as PeriodFilterValue);
          }}
        >
          {periods.map((period) => (
            <ToggleGroupItem
              key={period}
              value={period}
              className="px-2 sm:px-5 py-1.5 sm:py-2 text-xs rounded-md transition-all touch-manipulation min-h-[36px] data-[state=on]:bg-white data-[state=on]:text-gray-900 data-[state=on]:shadow-sm data-[state=off]:text-gray-600 data-[state=off]:hover:text-gray-900 data-[state=off]:active:bg-gray-200"
            >
              {periodLabels[period]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Refresh Button (optional) */}
      {onRefresh && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="shrink-0 min-h-[36px] min-w-[36px]"
          aria-label="Atualizar dados"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
          />
        </Button>
      )}
    </div>
  );
}
