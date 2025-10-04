import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock } from "lucide-react";

interface DateTimeSelectionProps {
  totalDuration: number;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
}

export function DateTimeSelection({ 
  totalDuration, 
  selectedDate, 
  selectedTime, 
  onDateChange, 
  onTimeChange 
}: DateTimeSelectionProps) {
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const availableSlots = selectedDate ? timeSlots.filter((_, index) => index % 2 === 0 || Math.random() > 0.3) : [];

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    }
    return `${mins}min`;
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Selecione Data e Horário</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Duração estimada: {formatDuration(totalDuration)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendário */}
        <Card className="p-4">
          <h4 className="font-semibold text-gray-900 mb-4">Escolha a Data</h4>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
            className="rounded-md border-0"
          />
        </Card>

        {/* Horários */}
        <Card className="p-4">
          <h4 className="font-semibold text-gray-900 mb-4">
            Horários Disponíveis
            {selectedDate && (
              <span className="text-sm text-gray-500 ml-2">
                {selectedDate.toLocaleDateString('pt-BR', { 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </span>
            )}
          </h4>
          
          {!selectedDate ? (
            <p className="text-gray-500 text-center py-8">
              Selecione uma data para ver os horários disponíveis
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {availableSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={`p-3 ${
                    selectedTime === time
                      ? "bg-black hover:bg-gray-800 text-white"
                      : "border-gray-200 hover:border-black hover:text-black"
                  }`}
                  onClick={() => onTimeChange(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          )}
          
          {selectedDate && availableSlots.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              Nenhum horário disponível para esta data
            </p>
          )}
        </Card>
      </div>

      {selectedDate && selectedTime && (
        <Card className="p-4 bg-black/5 border-black">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Agendamento Selecionado</h4>
              <p className="text-gray-600">
                {selectedDate.toLocaleDateString('pt-BR', { 
                  weekday: 'long',
                  day: 'numeric', 
                  month: 'long',
                  year: 'numeric'
                })} às {selectedTime}
              </p>
            </div>
            <Badge className="bg-black text-white">
              {formatDuration(totalDuration)}
            </Badge>
          </div>
        </Card>
      )}
    </div>
  );
}