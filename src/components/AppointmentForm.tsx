
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBarbers } from "@/hooks/use-barbers";

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "O nome deve ter pelo menos 3 caracteres.",
  }),
  email: z.string().email({
    message: "Endereço de email inválido.",
  }),
  phone: z.string().min(9, {
    message: "Número de telefone inválido.",
  }),
  service: z.string({
    required_error: "Por favor seleciona um serviço.",
  }),
  barber: z.string({
    required_error: "Por favor seleciona um barbeiro.",
  }),
  date: z.date({
    required_error: "Por favor seleciona uma data.",
  }),
  time: z.string({
    required_error: "Por favor seleciona um horário.",
  }),
});

const timeSlots = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
];

// Mock dos horários ocupados
const OCCUPIED_SLOTS: { [key: string]: string[] } = {
  "2025-05-03": ["10:30", "11:00", "15:00", "15:30"],
  "2025-05-06": ["14:00", "14:30", "16:00", "16:30"],
  "2025-05-07": ["12:00", "12:30", "17:00", "17:30"],
};

export const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { barbers, isLoading } = useBarbers();
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Função para determinar quais horários estão disponíveis
  const getAvailableTimeSlots = (date: Date | undefined) => {
    if (!date) return timeSlots;
    
    const dateStr = format(date, "yyyy-MM-dd");
    const occupiedForDate = OCCUPIED_SLOTS[dateStr] || [];
    
    return timeSlots.filter(time => !occupiedForDate.includes(time));
  };

  const availableTimeSlots = getAvailableTimeSlots(selectedDate);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success("Agendamento recebido!", {
      description: `Marcação para ${format(data.date, "dd/MM/yyyy")} às ${data.time} foi enviada.`,
      duration: 5000,
    });
    
    console.log("Dados do agendamento:", data);
    form.reset();
    setSelectedDate(undefined);
  }

  // Função para verificar dias da semana permitidos
  const isDateDisabled = (date: Date) => {
    const day = date.getDay();
    // 0 é domingo, 1 é segunda - dias fechados
    return day === 0 || day === 1;
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="bg-navalha-black text-white">
        <CardTitle>Marcar Agendamento</CardTitle>
        <CardDescription className="text-gray-300">
          Reserva o teu horário para um corte ou tratamento de barba
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="O teu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="O teu e-mail" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="Telefone para contacto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serviço</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleciona o serviço desejado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="corte">Corte de Cabelo</SelectItem>
                        <SelectItem value="barba">Barba</SelectItem>
                        <SelectItem value="combo">Corte + Barba</SelectItem>
                        <SelectItem value="premium">Tratamento Premium</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="barber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Barbeiro</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleciona o barbeiro" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoading ? (
                          <SelectItem value="loading" disabled>Carregando...</SelectItem>
                        ) : (
                          barbers.filter(barber => barber.status === "active").map(barber => (
                            <SelectItem key={barber.id} value={barber.id}>
                              {barber.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "EEEE, dd/MM/yyyy", { locale: ptBR })
                            ) : (
                              <span>Escolhe uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setSelectedDate(date);
                          }}
                          disabled={(date) => 
                            isDateDisabled(date) || 
                            date < new Date()
                          }
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleciona um horário" />
                          <Clock className="h-4 w-4 opacity-50" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableTimeSlots.length > 0 ? (
                          availableTimeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>
                            Sem horários disponíveis
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-navalha-gold hover:bg-navalha-burgundy text-black hover:text-white"
            >
              Confirmar Marcação
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
