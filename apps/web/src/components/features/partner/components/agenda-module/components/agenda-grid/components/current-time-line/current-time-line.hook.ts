import { useEffect, useState } from 'react';
import { GRID_CONSTANTS } from '../../agenda-grid.constants';

interface UseCurrentTimeLineProps {
  timeSlots: string[];
}

interface CurrentTimeLinePosition {
  topPosition: number;
  isVisible: boolean;
  currentTime: string;
}

/**
 * Hook para calcular a posição da linha de horário atual
 * Atualiza a cada minuto
 */
export function useCurrentTimeLine({
  timeSlots,
}: UseCurrentTimeLineProps): CurrentTimeLinePosition {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Atualizar o horário atual a cada minuto
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60 segundos

    return () => clearInterval(interval);
  }, []);

  const calculatePosition = (): CurrentTimeLinePosition => {
    const now = currentTime;
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    // Verificar se o horário atual está dentro dos timeSlots
    if (timeSlots.length === 0) {
      return {
        topPosition: 0,
        isVisible: false,
        currentTime: currentTimeString,
      };
    }

    const firstSlot = timeSlots[0];
    const lastSlot = timeSlots[timeSlots.length - 1];

    if (!firstSlot || !lastSlot) {
      return {
        topPosition: 0,
        isVisible: false,
        currentTime: currentTimeString,
      };
    }

    // Converter slots para minutos desde meia-noite
    const timeToMinutes = (time: string): number => {
      const [h, m] = time.split(':').map(Number);
      return (h ?? 0) * 60 + (m ?? 0);
    };

    const currentMinutes = hours * 60 + minutes;
    const firstSlotMinutes = timeToMinutes(firstSlot);
    const lastSlotMinutes = timeToMinutes(lastSlot);

    // Verificar se está dentro do horário de funcionamento
    if (
      currentMinutes < firstSlotMinutes ||
      currentMinutes > lastSlotMinutes
    ) {
      return {
        topPosition: 0,
        isVisible: false,
        currentTime: currentTimeString,
      };
    }

    // Calcular posição baseada nos slots
    // Encontrar o índice do slot atual ou o próximo slot
    let slotIndex = 0;
    let minutesFromSlotStart = 0;

    for (let i = 0; i < timeSlots.length; i++) {
      const slot = timeSlots[i];
      if (!slot) continue;

      const slotMinutes = timeToMinutes(slot);

      if (currentMinutes >= slotMinutes) {
        slotIndex = i;
        minutesFromSlotStart = currentMinutes - slotMinutes;
      } else {
        break;
      }
    }

    // Calcular a posição em pixels
    // Assumindo que cada slot tem 30 minutos (padrão comum)
    const slotDurationMinutes = 30;
    const progressInSlot = minutesFromSlotStart / slotDurationMinutes;

    // Posição = (índice do slot * altura do slot) + (progresso dentro do slot * altura do slot)
    // Adicionar a altura do header (SLOT_HEIGHT)
    const headerHeight = GRID_CONSTANTS.SLOT_HEIGHT;
    const topPosition =
      headerHeight + slotIndex * GRID_CONSTANTS.SLOT_HEIGHT + progressInSlot * GRID_CONSTANTS.SLOT_HEIGHT;

    return {
      topPosition,
      isVisible: true,
      currentTime: currentTimeString,
    };
  };

  return calculatePosition();
}
