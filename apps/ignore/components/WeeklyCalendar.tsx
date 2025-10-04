import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface TimeSlot {
  id: string;
  time: string;
  status: 'free' | 'booked' | 'blocked';
  clientName?: string;
  service?: string;
}

interface DaySchedule {
  date: string;
  dayName: string;
  slots: TimeSlot[];
}

export function WeeklyCalendar() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartSlot, setDragStartSlot] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const dragRef = useRef<boolean>(false);

  // Generate mock schedule data
  const generateWeekData = (weekOffset: number): DaySchedule[] => {
    const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const times = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
    ];

    return days.map((dayName, dayIndex) => {
      const date = new Date();
      date.setDate(date.getDate() + weekOffset * 7 + dayIndex);
      
      const slots: TimeSlot[] = times.map((time, timeIndex) => {
        const slotId = `${dayIndex}-${timeIndex}`;
        
        // Mock some appointments and blocked slots
        let status: 'free' | 'booked' | 'blocked' = 'free';
        let clientName: string | undefined;
        let service: string | undefined;

        if (dayIndex === 1 && timeIndex === 4) { // Tuesday 11:00
          status = 'booked';
          clientName = 'Ana Silva';
          service = 'Corte + Escova';
        } else if (dayIndex === 1 && timeIndex === 5) { // Tuesday 11:30
          status = 'booked';
          clientName = 'Ana Silva';
          service = 'Corte + Escova';
        } else if (dayIndex === 3 && timeIndex === 8) { // Thursday 13:00
          status = 'blocked';
        } else if (dayIndex === 0 && timeIndex === 6) { // Monday 12:00
          status = 'booked';
          clientName = 'Maria Santos';
          service = 'Manicure';
        }

        return {
          id: slotId,
          time,
          status,
          clientName,
          service
        };
      });

      return {
        date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        dayName,
        slots
      };
    });
  };

  const [weekData, setWeekData] = useState(() => generateWeekData(currentWeek));

  const getSlotColor = (status: string) => {
    switch (status) {
      case 'free':
        return 'bg-[#20b2aa]/20 hover:bg-[#20b2aa]/30 border-[#20b2aa]/40';
      case 'booked':
        return 'bg-[#1a2b4c]/20 border-[#1a2b4c]/40 text-[#1a2b4c]';
      case 'blocked':
        return 'bg-gray-300 border-gray-400 text-gray-600';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  const handleMouseDown = useCallback((slotId: string, status: string) => {
    if (status === 'booked') return; // Can't modify booked slots
    
    setIsDragging(true);
    setDragStartSlot(slotId);
    dragRef.current = true;
    
    // Start selection
    setSelectedSlots(new Set([slotId]));
  }, []);

  const handleMouseEnter = useCallback((slotId: string, status: string) => {
    if (!dragRef.current || status === 'booked') return;
    
    // Add to selection during drag
    setSelectedSlots(prev => new Set([...prev, slotId]));
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!dragRef.current) return;
    
    // Apply blocking to selected slots
    setWeekData(prevData => 
      prevData.map(day => ({
        ...day,
        slots: day.slots.map(slot => 
          selectedSlots.has(slot.id) && slot.status === 'free'
            ? { ...slot, status: 'blocked' as const }
            : slot
        )
      }))
    );

    // Reset drag state
    setIsDragging(false);
    setDragStartSlot(null);
    setSelectedSlots(new Set());
    dragRef.current = false;
  }, [selectedSlots]);

  const handleSlotClick = (slotId: string, status: string) => {
    if (isDragging || status === 'booked') return;
    
    // Toggle block/free status on single click
    setWeekData(prevData => 
      prevData.map(day => ({
        ...day,
        slots: day.slots.map(slot => 
          slot.id === slotId 
            ? { 
                ...slot, 
                status: slot.status === 'blocked' ? 'free' : 'blocked'
              }
            : slot
        )
      }))
    );
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = direction === 'prev' ? currentWeek - 1 : currentWeek + 1;
    setCurrentWeek(newWeek);
    setWeekData(generateWeekData(newWeek));
  };

  return (
    <div className="w-full" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      {/* Week navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigateWeek('prev')}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Semana Anterior
        </Button>
        
        <div className="text-center">
          <h3 className="text-[#1a2b4c]">
            {currentWeek === 0 ? 'Esta Semana' : 
             currentWeek > 0 ? `${currentWeek} semana${currentWeek > 1 ? 's' : ''} à frente` :
             `${Math.abs(currentWeek)} semana${Math.abs(currentWeek) > 1 ? 's' : ''} atrás`}
          </h3>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigateWeek('next')}
          className="flex items-center gap-2"
        >
          Próxima Semana
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header with day names */}
        <div className="bg-gray-50 p-3 border-b border-gray-200">
          <div className="text-xs text-gray-500">Horário</div>
        </div>
        {weekData.map((day) => (
          <div key={day.dayName} className="bg-gray-50 p-3 border-b border-gray-200 text-center">
            <div className="text-sm text-[#1a2b4c]">{day.dayName}</div>
            <div className="text-xs text-gray-500">{day.date}</div>
          </div>
        ))}

        {/* Time slots */}
        {weekData[0]?.slots.map((_, timeIndex) => (
          <div key={timeIndex} className="contents">
            {/* Time label */}
            <div className="p-2 bg-gray-50 border-r border-gray-200 text-xs text-gray-600 flex items-center">
              {weekData[0].slots[timeIndex].time}
            </div>
            
            {/* Slots for each day */}
            {weekData.map((day) => {
              const slot = day.slots[timeIndex];
              const isSelected = selectedSlots.has(slot.id);
              const isBooked = slot.status === 'booked';
              
              return (
                <div
                  key={slot.id}
                  className={`
                    relative p-2 min-h-[60px] border-r border-b border-gray-200 cursor-pointer select-none
                    ${getSlotColor(slot.status)}
                    ${isSelected ? 'ring-2 ring-[#1a2b4c] ring-opacity-50' : ''}
                    ${isBooked ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  onMouseDown={() => handleMouseDown(slot.id, slot.status)}
                  onMouseEnter={() => handleMouseEnter(slot.id, slot.status)}
                  onClick={() => handleSlotClick(slot.id, slot.status)}
                >
                  {slot.status === 'booked' && (
                    <div className="text-xs">
                      <div className="truncate">{slot.clientName}</div>
                      <div className="text-gray-600 truncate">{slot.service}</div>
                    </div>
                  )}
                  {slot.status === 'blocked' && (
                    <div className="text-xs text-center text-gray-600">
                      Bloqueado
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <strong>Como usar:</strong> Clique em um horário livre para bloquear/desbloquear, ou clique e arraste para bloquear múltiplos horários de uma vez.
      </div>
    </div>
  );
}