import type { Schedule } from '../../modules/partner/stores/schedule/schedule.entity';
import type { BlockedTime } from '../../modules/partner/stores/store-member/blocked-time/blocked-time.entity';

export const calculateEndTime = (
  startTime: string,
  durationMinutes: number,
): string => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
};

export interface TimeSlot {
  time: string; // formato HH:MM
  available: boolean;
}

/**
 * Converte string de tempo HH:MM em minutos desde meia-noite
 */
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Converte minutos desde meia-noite em string HH:MM
 */
function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Gera todos os slots de tempo possíveis baseado no horário de funcionamento
 */
export function generateTimeSlots(
  openTime: string,
  closeTime: string,
  lunchStartTime?: string,
  lunchEndTime?: string,
  intervalMinutes: number = 30,
): string[] {
  const slots: string[] = [];
  const openMinutes = timeToMinutes(openTime);
  const closeMinutes = timeToMinutes(closeTime);
  const lunchStart = lunchStartTime ? timeToMinutes(lunchStartTime) : null;
  const lunchEnd = lunchEndTime ? timeToMinutes(lunchEndTime) : null;

  let currentMinutes = openMinutes;

  while (currentMinutes < closeMinutes) {
    // Pula horário de almoço
    if (lunchStart !== null && lunchEnd !== null) {
      if (currentMinutes >= lunchStart && currentMinutes < lunchEnd) {
        currentMinutes += intervalMinutes;
        continue;
      }
    }

    slots.push(minutesToTime(currentMinutes));
    currentMinutes += intervalMinutes;
  }

  return slots;
}

/**
 * Filtra horários disponíveis removendo bloqueados e já agendados
 */
export function filterAvailableTimeSlots(
  allSlots: string[],
  selectedDate: Date,
  blockedTimes: BlockedTime[],
  schedules: Schedule[],
): string[] {
  const selectedDayOfWeek = selectedDate.getDay();
  const selectedDateStr = selectedDate.toISOString().split('T')[0];

  return allSlots.filter((slot) => {
    // Verifica se está bloqueado para esta data específica
    const isBlockedForDate = blockedTimes.some(
      (blocked) =>
        !blocked.isRecurring &&
        blocked.date.toISOString().split('T')[0] === selectedDateStr &&
        blocked.time === slot,
    );

    if (isBlockedForDate) return false;

    // Verifica se está bloqueado recorrentemente para este dia da semana
    const isBlockedRecurring = blockedTimes.some(
      (blocked) =>
        blocked.isRecurring &&
        blocked.dayOfWeek === selectedDayOfWeek &&
        blocked.time === slot,
    );

    if (isBlockedRecurring) return false;

    // Verifica se já existe agendamento neste horário
    const hasSchedule = schedules.some((schedule) => {
      if (schedule.status === 'cancelled') return false;

      const scheduleDate = schedule.date.toISOString().split('T')[0];
      if (scheduleDate !== selectedDateStr) return false;

      const scheduleStartMinutes = timeToMinutes(schedule.startTime);
      const scheduleEndMinutes = timeToMinutes(schedule.endTime);
      const slotMinutes = timeToMinutes(slot);

      // Verifica se o slot está dentro do intervalo do agendamento
      return (
        slotMinutes >= scheduleStartMinutes && slotMinutes < scheduleEndMinutes
      );
    });

    return !hasSchedule;
  });
}

/**
 * Formata lista de horários para mensagem do WhatsApp
 */
export function formatTimeSlotsForMessage(slots: string[]): string {
  const header = 'Horários disponíveis:\n\n';
  const times = slots.map((slot, index) => `${index + 1}. ${slot}`).join('\n');
  const footer = '\n\nDigite o número do horário desejado.';

  return header + times + footer;
}

/**
 * Extrai o primeiro número de uma string
 * Exemplos: "1" -> 1, "número 1" -> 1, "quero o 3" -> 3
 */
export function extractNumberFromText(text: string): number | null {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}

/**
 * Obtém o horário selecionado pelo índice
 */
export function getTimeSlotByIndex(
  slots: string[],
  index: number,
): string | null {
  const arrayIndex = index - 1; // Usuário digita 1-based, array é 0-based
  if (arrayIndex >= 0 && arrayIndex < slots.length) {
    return slots[arrayIndex];
  }
  return null;
}
