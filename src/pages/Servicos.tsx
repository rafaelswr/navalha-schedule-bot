
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { ChatBot } from "@/components/ChatBot";

const Servicos = () => {
  const services = [
    {
      title: "Corte de Cabelo",
      description: "Corte moderno executado com perícia e precisão, inclui lavagem e styling.",
      price: "15€",
      duration: "30 min",
      imagePath: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Corte + Barba",
      description: "Combinação perfeita de corte de cabelo e aparagem de barba com toalha quente.",
      price: "25€",
      duration: "60 min",
      featured: true,
      imagePath: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Barba",
      description: "Tratamento completo de barba com toalha quente, óleos essenciais e aparagem.",
      price: "12€",
      duration: "30 min",
      imagePath: "https://images.unsplash.com/photo-1593702288056-7056d12307fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Tratamento Facial",
      description: "Limpeza facial profunda para revitalizar a pele e melhorar a aparência.",
      price: "20€",
      duration: "45 min",
      imagePath: "https://images.unsplash.com/photo-1583400651496-8bfc7e39b4a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Coloração",
      description: "Coloração profissional para cabelo ou barba, cobrindo cabelos brancos ou mudando o tom.",
      price: "25€",
      duration: "45 min",
      imagePath: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Pacote Premium",
      description: "Experiência completa incluindo corte, barba, tratamento facial e massagem capilar.",
      price: "40€",
      duration: "90 min",
      featured: true,
      imagePath: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section 
        className="relative bg-navalha-black py-16 text-white"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Nossos Serviços</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descobre a nossa gama completa de serviços de barbearia executados por profissionais experientes.
          </p>
        </div>
      </section>
      
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Serviços <span className="text-navalha-burgundy">Premium</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos uma variedade de serviços para atender às tuas necessidades, desde cortes simples até tratamentos completos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Produtos de <span className="text-navalha-burgundy">Alta Qualidade</span>
              </h2>
              <p className="text-gray-600 mb-4">
                No Clube da Navalha, usamos apenas produtos profissionais da mais alta qualidade para garantir os melhores resultados para os nossos clientes.
              </p>
              <p className="text-gray-600 mb-4">
                Temos à venda uma seleção exclusiva de produtos para que possas continuar a cuidar do teu cabelo e barba em casa com a mesma qualidade.
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-center">
                  <span className="mr-2 text-navalha-gold">✓</span> Pomadas e ceras para cabelo
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-navalha-gold">✓</span> Óleos e bálsamos para barba
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-navalha-gold">✓</span> Champôs e condicionadores especializados
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-navalha-gold">✓</span> Ferramentas de barbear e manutenção
                </li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Produtos de barbearia" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Servicos;
