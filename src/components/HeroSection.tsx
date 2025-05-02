
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="relative bg-navalha-black text-white">
      <div 
        className="absolute inset-0 z-0 bg-center bg-cover opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')",
        }}
      />
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            <span className="text-navalha-gold">Estilo</span> e Tradição<br />no Corte Perfeito
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Experimente o melhor serviço de barbearia em Lisboa. Cortes de cabelo e barba com precisão e estilo para o homem moderno.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-navalha-gold hover:bg-navalha-burgundy text-black hover:text-white text-lg px-8 py-6"
              asChild
            >
              <Link to="/agendamento">Marcar Agora</Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-navalha-black text-lg px-8 py-6"
              asChild
            >
              <Link to="/servicos">Nossos Serviços</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
