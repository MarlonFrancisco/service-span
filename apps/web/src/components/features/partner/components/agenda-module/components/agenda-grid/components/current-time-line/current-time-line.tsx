import { memo } from 'react';
import { useCurrentTimeLine } from './current-time-line.hook';

interface CurrentTimeLineProps {
  timeSlots: string[];
}

/**
 * Componente que renderiza uma linha vermelha indicando o horário atual na agenda
 * Atualiza automaticamente a cada minuto
 */
export const CurrentTimeLine = memo(({ timeSlots }: CurrentTimeLineProps) => {
  const { topPosition, isVisible, currentTime } = useCurrentTimeLine({
    timeSlots,
  });

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute left-0 right-0 z-20 flex items-center"
      style={{
        top: `${topPosition}px`,
      }}
      aria-label={`Horário atual: ${currentTime}`}
    >
      {/* Círculo indicador no início da linha */}
      <div className="absolute -left-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-red-400" />

      {/* Linha horizontal */}
      <div className="h-0.5 w-full bg-red-500 shadow-sm" />

      {/* Label com o horário */}
      <div className="absolute -right-1 flex items-center justify-center rounded-md bg-red-500 px-2 py-0.5 text-xs font-medium text-white shadow-sm">
        {currentTime}
      </div>
    </div>
  );
});

CurrentTimeLine.displayName = 'CurrentTimeLine';
