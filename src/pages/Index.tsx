
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ServiceCard } from "@/components/ServiceCard";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { useServicesStore } from "@/store/servicesStore";
import { useCompanyStore } from "@/store/companyStore";

const Index = () => {
  const { services } = useServicesStore();
  const { info } = useCompanyStore();
  
  // Get top 3 services, prioritizing featured ones
  const topServices = [...services]
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, 3);

  // Update the beard service image if it's broken
  const updatedServices = topServices.map(service => {
    if (service.title === "Barba") {
      return {
        ...service,
        imagePath: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
      };
    }
    return service;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      
      {/* Serviços em Destaque */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-bold mb-4">
              Os Nossos <span className="text-black">Serviços</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos uma gama de serviços de barbearia de alta qualidade, executados por profissionais experientes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {updatedServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              className="bg-navalha-black hover:bg-navalha-burgundy text-white"
              asChild
            >
              <Link to="/servicos">Ver Todos os Serviços</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Carrossel de Produtos */}
      <FeaturedProducts />
      
      {/* Por que escolher-nos */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Por Que <span className="text-navalha-burgundy">Escolher-nos</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              No {info.name}, oferecemos mais do que cortes de cabelo. Proporcionamos uma experiência completa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="w-16 h-16 bg-navalha-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="text-black h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl mb-3">Profissionais Experientes</h3>
              <p className="text-gray-600">
                Nossa equipa é composta por barbeiros com anos de experiência e formação especializada.
              </p>
            </div>
            
            <div className="p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="w-16 h-16 bg-navalha-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="text-black h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl mb-3">Ambiente Acolhedor</h3>
              <p className="text-gray-600">
                Um espaço confortável e elegante onde podes relaxar enquanto cuidas da tua aparência.
              </p>
            </div>
            
            <div className="p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="w-16 h-16 bg-navalha-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="text-black h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl mb-3">Produtos Premium</h3>
              <p className="text-gray-600">
                Utilizamos apenas os melhores produtos para garantir resultados excepcionais.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Agendamento */}
      <section className="py-16 bg-navalha-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para o teu <span className="text-navalha-gold">Novo Visual</span>?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Agenda já o teu corte e desfruta de uma experiência de barbearia premium que te deixará a sentir melhor e com um visual impecável.
          </p>
          <Button 
            className="bg-navalha-gold hover:bg-navalha-burgundy text-black hover:text-white text-lg px-8 py-6"
            asChild
          >
            <Link to="/agendamento">Agendar Agora</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
