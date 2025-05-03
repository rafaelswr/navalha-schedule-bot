
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
          <div className="max-w-3xl mx-auto">
            <AppointmentForm />
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Informações <span className="text-navalha-burgundy">Importantes</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Política de Cancelamento</h3>
              <p className="text-gray-600">
                Pedimos a gentileza de cancelar com pelo menos 2 horas de antecedência, caso não possas comparecer ao agendamento. Isso permite-nos disponibilizar o horário para outro cliente.
              </p>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Chegada</h3>
              <p className="text-gray-600">
                Aconselhamos chegares 5-10 minutos antes da hora marcada para garantir que tens tempo suficiente para o check-in e relaxar antes do teu serviço.
              </p>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Confirmação</h3>
              <p className="text-gray-600">
                Após marcares o teu agendamento, receberás uma confirmação por e-mail. Poderemos também entrar em contacto por telefone para confirmar a reserva.
              </p>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Métodos de Pagamento</h3>
              <p className="text-gray-600">
                Aceitamos pagamentos em dinheiro, cartão de débito e crédito. O pagamento é feito após a conclusão do serviço.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Agendamento;
