
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, User, Mail, Phone, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormMessage 
} from "@/components/ui/form";
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
    <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden">
      <div className="bg-black p-5 text-center">
        <h2 className="text-white text-2xl font-serif">Marcar Agendamento</h2>
        <p className="text-gray-300 text-sm mt-1">
          Reserva o teu horário para um corte ou tratamento de barba
        </p>
      </div>
      
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          {...field}
                          placeholder="O teu nome completo"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="ml-3 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          {...field}
                          type="email"
                          placeholder="O teu e-mail"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="ml-3 text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          {...field}
                          placeholder="Telefone para contacto"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="ml-3 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <SelectTrigger className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                            <SelectValue placeholder="Seleciona o serviço desejado" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="corte">Corte de Cabelo</SelectItem>
                        <SelectItem value="barba">Barba</SelectItem>
                        <SelectItem value="combo">Corte + Barba</SelectItem>
                        <SelectItem value="premium">Tratamento Premium</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="ml-3 text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="barber"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <SelectTrigger className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                            <SelectValue placeholder="Seleciona o barbeiro" />
                          </SelectTrigger>
                        </div>
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
                    <FormMessage className="ml-3 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <button
                              type="button"
                              className={cn(
                                "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent",
                                !field.value && "text-gray-500"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "EEEE, dd/MM/yyyy", { locale: ptBR })
                              ) : (
                                <span>Escolhe uma data</span>
                              )}
                            </button>
                          </div>
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
                    <FormMessage className="ml-3 text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <SelectTrigger className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                          <SelectValue placeholder="Seleciona um horário" />
                        </SelectTrigger>
                      </div>
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
                  <FormMessage className="ml-3 text-xs" />
                </FormItem>
              )}
            />

            <button 
              type="submit" 
              className="w-full py-3 mt-4 bg-navalha-gold text-black font-bold rounded-full hover:bg-[#c19b27] transition-all shadow-md hover:shadow-lg"
            >
              Confirmar Marcação
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};
