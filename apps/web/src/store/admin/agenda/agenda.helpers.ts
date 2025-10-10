export const generateTimeSlots = (workingHours: {
  start: string;
  end: string;
  lunchStart: string;
  lunchEnd: string;
}): string[] => {
  const slots: string[] = [];
  const [startHour = 0, startMin = 0] = workingHours.start
    .split(':')
    .map(Number);
  const [endHour = 0, endMin = 0] = workingHours.end.split(':').map(Number);
  const [lunchStartHour = 0, lunchStartMin = 0] = workingHours.lunchStart
    .split(':')
    .map(Number);
  const [lunchEndHour = 0, lunchEndMin = 0] = workingHours.lunchEnd
    .split(':')
    .map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  const lunchStartMinutes = lunchStartHour * 60 + lunchStartMin;
  const lunchEndMinutes = lunchEndHour * 60 + lunchEndMin;

  for (let minutes = startMinutes; minutes <= endMinutes; minutes += 30) {
    if (minutes >= lunchStartMinutes && minutes < lunchEndMinutes) {
      continue;
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    slots.push(
      `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`,
    );
  }

  return slots;
};
