'use client';
import { ToggleGroup, ToggleGroupItem } from '@repo/ui';

interface IBillingToggleProps {
  value: 'month' | 'year';
  onChange: (value: 'month' | 'year') => void;
}

export const BillingToggle = ({ value, onChange }: IBillingToggleProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(newValue) => {
          if (newValue) onChange(newValue as 'month' | 'year');
        }}
        variant="outline"
        className="bg-gray-50 p-1 rounded-lg"
      >
        <ToggleGroupItem
          value="month"
          aria-label="Planos mensais"
          className="px-8 py-2.5 data-[state=on]:bg-black data-[state=on]:text-white"
        >
          Mensal
        </ToggleGroupItem>
        <ToggleGroupItem
          value="year"
          aria-label="Planos anuais"
          className="px-8 py-2.5 data-[state=on]:bg-black data-[state=on]:text-white"
        >
          Anual
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
