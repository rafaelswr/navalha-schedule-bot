
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const FeaturedProducts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const featuredProducts = [
    {
      id: "1",
      name: "Pomada Modeladora",
      description: "Pomada de fixação média para um look natural e elegante.",
      price: "15€",
      imagePath: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Styling",
      featured: true
    },
    {
      id: "5",
      name: "Kit de Barbear Tradicional",
      description: "Kit completo com navalha, pincel e sabonete para uma experiência de barbear tradicional.",
      price: "45€",
      imagePath: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Barba",
      featured: true
    },
    {
      id: "3",
      name: "Champô Anticaspa",
      description: "Champô especializado para combater a caspa e manter o couro cabeludo saudável.",
      price: "14€",
      imagePath: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Cabelo"
    },
    {
      id: "2",
      name: "Óleo para Barba",
      description: "Óleo nutritivo que suaviza e dá brilho à barba, evitando a descamação.",
      price: "12€",
      imagePath: "https://images.unsplash.com/photo-1564594985201-7149e707ef4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Barba"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Produtos <span className="text-navalha-burgundy">Mais Vendidos</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra a nossa seleção exclusiva de produtos para cuidados de barba e cabelo, escolhidos pelos nossos especialistas.
          </p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onSelect={(api) => {
              if (api) {
                // Get the current index from the API and use it to update state
                const selectedIndex = api.selectedScrollSnap();
                setCurrentPage(selectedIndex);
              }
            }}
          >
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
                  <ProductCard {...product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious 
              className="left-0 bg-navalha-gold hover:bg-navalha-burgundy text-black hover:text-white border-none" 
              variant="default" 
              size="default"
            >
              <ChevronLeft className="h-5 w-5" />
            </CarouselPrevious>
            
            <CarouselNext 
              className="right-0 bg-navalha-gold hover:bg-navalha-burgundy text-black hover:text-white border-none" 
              variant="default" 
              size="default"
            >
              <ChevronRight className="h-5 w-5" />
            </CarouselNext>
          </Carousel>
        </div>
        
        <div className="text-center mt-10">
          <Button 
            className="bg-navalha-burgundy hover:bg-navalha-black text-white"
            asChild
          >
            <Link to="/loja">Ver Todos os Produtos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
