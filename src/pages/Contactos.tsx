
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChatBot } from "@/components/ChatBot";
import { toast } from "sonner";
import { useState } from "react";

const Contactos = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso!", {
      description: "Entraremos em contacto o mais brevemente possível.",
    });
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section 
        className="relative bg-navalha-black py-16 text-white"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Contactos</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Estamos aqui para te ajudar. Entra em contacto connosco para qualquer dúvida ou informação adicional.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Fala <span className="text-navalha-burgundy">Connosco</span>
              </h2>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Morada</h3>
                  <p className="text-gray-600">Rua da Barbearia, 123, Lisboa, Portugal</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">Telefone</h3>
                  <p className="text-gray-600">+351 912 345 678</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">E-mail</h3>
                  <p className="text-gray-600">info@clubedanavalha.pt</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">Horário</h3>
                  <p className="text-gray-600">
                    Terça a Sábado: 10h - 19h<br />
                    Domingo e Segunda: Fechado
                  </p>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-4">Encontra-nos</h2>
              <div className="rounded-lg overflow-hidden h-80 bg-gray-200 w-full">
                <iframe
                  title="Mapa de localização"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24984.698276505305!2d-9.15680664149265!3d38.71404358002728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19331a61e4f33b%3A0x9dd67cf946a3d3a7!2sLisboa!5e0!3m2!1spt-PT!2spt!4v1682616427527!5m2!1spt-PT!2spt"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Envia-nos uma <span className="text-navalha-burgundy">Mensagem</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-medium mb-2">
                    Nome
                  </label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="O teu nome"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-medium mb-2">
                    E-mail
                  </label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="O teu e-mail"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block font-medium mb-2">
                    Mensagem
                  </label>
                  <Textarea 
                    id="message"
                    name="message"
                    placeholder="A tua mensagem"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="resize-none"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="bg-navalha-gold hover:bg-navalha-burgundy text-black hover:text-white w-full"
                >
                  Enviar Mensagem
                </Button>
              </form>
              
              <div className="mt-10 p-6 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Perguntas Frequentes</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">É necessário marcar?</h4>
                    <p className="text-gray-600">
                      Recomendamos agendamento prévio para garantir disponibilidade, mas aceitamos clientes sem marcação quando possível.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Como posso pagar?</h4>
                    <p className="text-gray-600">
                      Aceitamos dinheiro, Multibanco e cartões de crédito/débito.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Oferecem certificados de oferta?</h4>
                    <p className="text-gray-600">
                      Sim, temos certificados de oferta disponíveis para todos os nossos serviços.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Contactos;
