
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
import { useProductsStore } from "@/store/productsStore";

export const FeaturedProducts = () => {
  const { products } = useProductsStore();
  const [currentPage, setCurrentPage] = useState(0);
  
  // Get featured products, or top 4 if not enough featured
  const featuredProducts = products
    .filter(product => product.featured)
    .concat(products.filter(product => !product.featured))
    .slice(0, 4);

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
