
import { useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronLeft, ChevronRight, UserRound, Bell, ArrowRight } from "lucide-react";
import { Barber } from "@/types/barber";
import { AppointmentDay, BarberAppointment } from "@/data/barberAppointments";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface BarberDailyAgendaProps {
  barber: Barber;
  appointments: AppointmentDay[];
  className?: string;
}

export const BarberDailyAgenda = ({ barber, appointments, className }: BarberDailyAgendaProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());

  const handlePreviousMonth = () => {
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const daysWithAppointments = appointments.map(item => item.date);

  const appointmentsForSelectedDate = appointments.find(item => 
    isSameDay(item.date, date)
  )?.appointments || [];

  const handleSendReminder = (client: string) => {
    toast.success(`Lembrete enviado para ${client}`);
  };

  const handleScheduleFollowup = (client: string) => {
    toast.success(`Follow-up agendado para ${client}`);
  };

  const handleViewClient = (client: string) => {
    toast.info(`Visualizando perfil de ${client}`);
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className || ''}`}>
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
            className="p-0 pointer-events-auto"
            modifiers={{
              hasAppointment: daysWithAppointments
            }}
            modifiersClassNames={{
              hasAppointment: "bg-primary/20 font-bold text-primary"
            }}
          />
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-xs gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Dia cheio</span>
            </div>
            <div className="flex items-center text-xs gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Meio período</span>
            </div>
            <div className="flex items-center text-xs gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Folga</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Agendamentos: {format(date, "dd/MM/yyyy")}</CardTitle>
              <CardDescription>
                {appointmentsForSelectedDate.length > 0 
                  ? `${appointmentsForSelectedDate.length} serviços agendados` 
                  : `Sem agendamentos para este dia`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {appointmentsForSelectedDate.length > 0 ? (
            <div className="space-y-4">
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
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {appointment.servico}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{appointment.valor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="pt-2 pb-4">
                <h4 className="text-sm font-semibold mb-2">Ações Rápidas</h4>
                {appointmentsForSelectedDate.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between border-b py-2 last:border-b-0 text-sm">
                    <div className="flex items-center">
                      <div className="font-medium text-primary">{appointment.hora}</div>
                      <div className="ml-2">{appointment.cliente}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewClient(appointment.cliente)}
                        className="h-8 px-2"
                      >
                        <UserRound className="h-3.5 w-3.5 mr-1" />
                        Ver Cliente
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleSendReminder(appointment.cliente)}
                        className="h-8 px-2"
                      >
                        <Bell className="h-3.5 w-3.5 mr-1" />
                        Lembrete
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleScheduleFollowup(appointment.cliente)}
                        className="h-8 px-2"
                      >
                        <ArrowRight className="h-3.5 w-3.5 mr-1" />
                        Follow-up
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
