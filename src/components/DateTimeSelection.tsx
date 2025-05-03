
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "./ui/card";

type DateTimeSelectionProps = {
  selectedDate: Date | undefined;
  selectedTime: string | undefined;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
};

// Mock data for occupied slots
const OCCUPIED_SLOTS: { [key: string]: string[] } = {
  "2025-05-03": ["10:30", "11:00", "15:00", "15:30"],
  "2025-05-06": ["14:00", "14:30", "16:00", "16:30"],
  "2025-05-07": ["12:00", "12:30", "17:00", "17:30"],
};

// Available time slots
const timeSlots = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
];

export const DateTimeSelection = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: DateTimeSelectionProps) => {
  // Function to determine which days of the week are disabled
  const isDateDisabled = (date: Date) => {
    const day = date.getDay();
    // 0 is Sunday, 1 is Monday - closed days
    return day === 0 || day === 1;
  };

  // Function to get available time slots for selected date
  const getAvailableTimeSlots = (date: Date | undefined) => {
    if (!date) return timeSlots;
    
    const dateStr = format(date, "yyyy-MM-dd");
    const occupiedForDate = OCCUPIED_SLOTS[dateStr] || [];
    
    return timeSlots.filter(time => !occupiedForDate.includes(time));
  };

  const availableTimeSlots = getAvailableTimeSlots(selectedDate);

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Escolhe a data e hora</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Data</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                {selectedDate ? (
                  format(selectedDate, "EEEE, dd/MM/yyyy", { locale: ptBR })
                ) : (
                  <span>Escolhe uma data</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onDateChange}
                disabled={(date) => 
                  isDateDisabled(date) || 
                  date < new Date()
                }
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Hora</label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {selectedDate ? (
              availableTimeSlots.length > 0 ? (
                availableTimeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={cn(
                      "text-center py-2 h-auto",
                      selectedTime === time && "bg-navalha-gold text-black hover:bg-navalha-gold/90"
                    )}
                    onClick={() => onTimeChange(time)}
                  >
                    {time}
                  </Button>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500 py-4">
                  Sem horários disponíveis nesta data
                </p>
              )
            ) : (
              <p className="text-center col-span-full text-gray-500 py-4">
                Por favor, selecione uma data primeiro
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
