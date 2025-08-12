
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppointmentForm } from "@/components/AppointmentForm";
import { ChatBot } from "@/components/ChatBot";

const Agendamento = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section 
        className="relative bg-background py-16 text-foreground"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Agendamento</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Reserva o teu horário connosco e desfruta de uma experiência de barbearia premium.
          </p>
        </div>
      </section>
      
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <AppointmentForm />
        </div>
      </section>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Agendamento;
