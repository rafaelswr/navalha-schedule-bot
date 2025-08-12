
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, Check, X } from "lucide-react";

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MultiStepProgress } from "@/components/MultiStepProgress";
import { BarberSelection } from "@/components/BarberSelection";
import { ServiceSelection } from "@/components/ServiceSelection";
import { DateTimeSelection } from "@/components/DateTimeSelection";

// Form schema for the final step
const ContactFormSchema = z.object({
  name: z.string().min(3, {
    message: "O nome deve ter pelo menos 3 caracteres.",
  }),
  email: z.string().email({
    message: "Endereço de email inválido.",
  }),
  phone: z.string().min(9, {
    message: "Número de telefone inválido.",
  }),
});

// Steps for the appointment process
const STEPS = ["Barbeiro", "Serviço", "Data e Hora"];

export const AppointmentForm = () => {
  // State for multi-step form
  const [step, setStep] = useState(0);
  
  // State for selections
  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  
  // Form for contact information
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Handler for moving to the next step
  const handleNext = () => {
    if (step === 0 && !selectedBarberId) {
      toast.error("Por favor, selecione um barbeiro");
      return;
    }
    
    if (step === 1 && !selectedServiceId) {
      toast.error("Por favor, selecione um serviço");
      return;
    }
    
    if (step === 2 && (!selectedDate || !selectedTime)) {
      toast.error("Por favor, selecione data e hora");
      return;
    }

    setStep(current => current + 1);
  };

  // Handler for moving back to the previous step
  const handleBack = () => {
    setStep(current => Math.max(0, current - 1));
  };

  // Handler for the final form submission
  const onSubmit = (data: z.infer<typeof ContactFormSchema>) => {
    // Combine all data from all steps
    const appointmentData = {
      ...data,
      barberId: selectedBarberId,
      service: selectedServiceId,
      date: selectedDate,
      time: selectedTime,
    };
    
    console.log("Appointment data:", appointmentData);
    
    // Show success message
    toast.success("Agendamento recebido!", {
      description: `Marcação para ${selectedDate ? new Date(selectedDate).toLocaleDateString('pt-PT') : ''} às ${selectedTime} foi enviada.`,
      duration: 5000,
    });
    
    // Reset form and state
    form.reset();
    setStep(0);
    setSelectedBarberId(null);
    setSelectedServiceId(null);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  };

  // Handler for canceling the appointment process
  const handleCancel = () => {
    if (window.confirm("Tens a certeza que desejas cancelar o agendamento?")) {
      form.reset();
      setStep(0);
      setSelectedBarberId(null);
      setSelectedServiceId(null);
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      toast.info("Agendamento cancelado");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="bg-background text-foreground px-6 py-4 border-b">
        <h2 className="text-2xl font-serif">Marcar Agendamento</h2>
        <p className="text-muted-foreground text-sm">
          Reserva o teu horário para um corte ou tratamento de barba
        </p>
      </div>
      
      <CardContent className="pt-6 pb-8 px-6">
        {/* Progress indicator */}
        <MultiStepProgress currentStep={step} steps={STEPS} />
        
        {/* Step content */}
        <div className="mt-6">
          {/* Step 1: Barber selection */}
          {step === 0 && (
            <BarberSelection 
              selectedBarberId={selectedBarberId}
              onSelect={setSelectedBarberId}
            />
          )}
          
          {/* Step 2: Service selection */}
          {step === 1 && (
            <ServiceSelection
              selectedServiceId={selectedServiceId}
              onSelect={setSelectedServiceId}
            />
          )}
          
          {/* Step 3: Date and time selection */}
          {step === 2 && (
            <DateTimeSelection
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
            />
          )}
          
          {/* Step 4: Contact information */}
          {step === 3 && (
            <>
              <h3 className="text-lg font-medium mb-4">Informações de contacto</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div className="text-sm text-red-600 mt-4">
                    * A inserção de dados errados pode levar ao cancelamento da marcação sem aviso prévio
                  </div>

                  <div className="flex flex-col md:flex-row gap-3 pt-4">
                    <Button 
                      type="submit"
                    >
                      <Check className="mr-2 h-4 w-4" /> Confirmar
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleBack}
                      variant="outline"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleCancel}
                      variant="destructive"
                    >
                      <X className="mr-2 h-4 w-4" /> Cancelar
                    </Button>
                  </div>
                </form>
              </Form>
            </>
          )}
        </div>
        
        {/* Navigation buttons */}
        {step < 3 && (
          <div className="flex justify-between mt-8">
            <Button 
              onClick={handleBack} 
              disabled={step === 0}
              className="bg-amber-400 hover:bg-amber-500 text-black"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
            
            <div className="flex gap-3">
              <Button 
                onClick={handleCancel}
                variant="destructive"
              >
                <X className="mr-2 h-4 w-4" /> Cancelar
              </Button>
              
              <Button 
                onClick={handleNext}
                className="bg-navalha-gold hover:bg-navalha-burgundy text-black hover:text-white"
              >
                Próximo
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
