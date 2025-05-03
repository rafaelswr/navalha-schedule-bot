
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppointmentForm } from "@/components/AppointmentForm";
import { ChatBot } from "@/components/ChatBot";

const Agendamento = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section 
        className="relative bg-navalha-black py-16 text-white"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Agendamento</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
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
