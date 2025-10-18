import { Button, cn } from '@repo/ui/index';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface IDatePickerHorizontalProps {
  selected: Date | undefined;
  daysToShow?: number;
  onSelect: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
}

export function DatePickerHorizontal({
  selected,
  daysToShow = 14,
  onSelect,
  disabled,
}: IDatePickerHorizontalProps) {
  const [startIndex, setStartIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate array of dates starting from today
  const dates = Array.from({ length: daysToShow }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const visibleDates = dates.slice(startIndex, startIndex + 7);

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(Math.max(0, startIndex - 1));
    }
  };

  const handleNext = () => {
    if (startIndex + 7 < dates.length) {
      setStartIndex(Math.min(dates.length - 7, startIndex + 1));
    }
  };

  const isDateSelected = (date: Date) => {
    if (!selected) return false;
    return (
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    );
  };

  const isDateDisabled = (date: Date) => {
    return disabled ? disabled(date) : false;
  };

  const formatDayName = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date);
  };

  const formatDate = (date: Date) => {
    return date.getDate();
  };

  const formatMonth = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(date);
  };

  // Auto-scroll to selected date
  useEffect(() => {
    if (selected && scrollContainerRef.current) {
      const selectedIndex = dates.findIndex((date) => isDateSelected(date));
      if (selectedIndex !== -1 && selectedIndex >= startIndex + 7) {
        setStartIndex(Math.max(0, selectedIndex - 3));
      }
    }
  }, [selected]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          disabled={startIndex === 0}
          className="h-8 w-8 p-0 flex-shrink-0"
          aria-label="Semana anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div ref={scrollContainerRef} className="flex-1 overflow-hidden">
          <div className="flex gap-2">
            {visibleDates.map((date, index) => {
              const isSelected = isDateSelected(date);
              const isDisabled = isDateDisabled(date);
              const isToday =
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear();

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => !isDisabled && onSelect(date)}
                  disabled={isDisabled}
                  className={cn(
                    'flex-1 min-w-[60px] flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all',
                    isSelected &&
                      'border-[#20b2aa] bg-[#20b2aa] text-white shadow-md',
                    !isSelected &&
                      !isDisabled &&
                      'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
                    isDisabled &&
                      'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed opacity-50',
                  )}
                  aria-label={`Selecionar ${formatDayName(date)}, ${formatDate(date)} de ${formatMonth(date)}`}
                  aria-pressed={isSelected}
                >
                  <span
                    className={cn(
                      'text-xs uppercase',
                      isSelected ? 'text-white' : 'text-gray-500',
                    )}
                  >
                    {formatDayName(date)}
                  </span>
                  <span
                    className={cn(
                      'font-medium',
                      isSelected ? 'text-white' : 'text-gray-900',
                    )}
                  >
                    {formatDate(date)}
                  </span>
                  <span
                    className={cn(
                      'text-xs',
                      isSelected ? 'text-white/90' : 'text-gray-500',
                    )}
                  >
                    {formatMonth(date)}
                  </span>
                  {isToday && !isSelected && (
                    <div className="w-1 h-1 rounded-full bg-[#20b2aa] mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleNext}
          disabled={startIndex + 7 >= dates.length}
          className="h-8 w-8 p-0 flex-shrink-0"
          aria-label="Próxima semana"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
