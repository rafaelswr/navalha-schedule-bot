
import { useState } from 'react';
import { format, isSameDay, addMonths, subMonths } from 'date-fns';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Barber } from "@/types/barber";

interface Appointment {
  cliente: string;
  servico: string;
  hora: string;
  valor: string;
}

interface AppointmentDay {
  date: Date;
  appointments: Appointment[];
}

interface BarberCalendarProps {
  barber: Barber;
  appointments: AppointmentDay[];
}

export const BarberCalendar = ({ barber, appointments }: BarberCalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());

  const handlePreviousMonth = () => {
    setCalendarMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCalendarMonth(prev => addMonths(prev, 1));
  };

  const daysWithAppointments = appointments.map(item => item.date);

  const appointmentsForSelectedDate = appointments.find(item => 
    isSameDay(item.date, date)
  )?.appointments || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <Card className="md:col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle>Calendário</CardTitle>
            <div className="flex space-x-1">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 p-0"
                onClick={handlePreviousMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 p-0"
                onClick={handleNextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>
            {format(calendarMonth, "MMMM yyyy")} - {barber.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            month={calendarMonth}
            className="p-3 pointer-events-auto"
            modifiers={{
              hasAppointment: daysWithAppointments
            }}
            modifiersClassNames={{
              hasAppointment: "rdp-day_hasAppointment"
            }}
          />
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Agendamentos: {format(date, "dd/MM/yyyy")}</CardTitle>
              <CardDescription>
                {appointmentsForSelectedDate.length > 0 
                  ? `${appointmentsForSelectedDate.length} serviços agendados para ${barber.name}` 
                  : `Sem agendamentos para ${barber.name} neste dia`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {appointmentsForSelectedDate.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hora</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointmentsForSelectedDate.map((appointment, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{appointment.hora}</TableCell>
                    <TableCell>{appointment.cliente}</TableCell>
                    <TableCell>{appointment.servico}</TableCell>
                    <TableCell className="text-right">{appointment.valor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CalendarIcon className="h-12 w-12 text-gray-300 mb-2" />
              <p className="text-gray-500">Não há agendamentos para mostrar neste dia</p>
              <p className="text-gray-400 text-sm">Selecione outra data no calendário</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
