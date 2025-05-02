
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Loja = () => {
  const [category, setCategory] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const products = [
    {
      id: "1",
      name: "Pomada Modeladora",
      description: "Pomada de fixação média para um look natural e elegante. Ideal para todos os tipos de cabelo.",
      price: "15€",
      imagePath: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Styling",
      featured: true
    },
    {
      id: "2",
      name: "Óleo para Barba",
      description: "Óleo nutritivo que suaviza e dá brilho à barba, evitando a descamação e hidratando a pele.",
      price: "12€",
      imagePath: "https://images.unsplash.com/photo-1564594985201-7149e707ef4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Barba"
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
      id: "4",
      name: "Pente de Madeira",
      description: "Pente feito à mão com madeira de alta qualidade para um penteado perfeito sem eletricidade estática.",
      price: "18€",
      imagePath: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Acessórios"
    },
    {
      id: "5",
      name: "Kit de Barbear Tradicional",
      description: "Kit completo com navalha, pincel e sabonete para uma experiência de barbear tradicional e luxuosa.",
      price: "45€",
      imagePath: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Barba",
      featured: true
    },
    {
      id: "6",
      name: "Cera de Alto Brilho",
      description: "Cera de fixação forte com acabamento brilhante para penteados estruturados e duradouros.",
      price: "16€",
      imagePath: "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Styling"
    },
    {
      id: "7",
      name: "Bálsamo Pós-Barba",
      description: "Bálsamo calmante que alivia a irritação após o barbear e hidrata profundamente a pele.",
      price: "13€",
      imagePath: "https://images.unsplash.com/photo-1571875257727-256c39da42af?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Barba"
    },
    {
      id: "8",
      name: "Escova para Barba",
      description: "Escova de cerdas naturais para distribuir produtos e modelar a barba com perfeição.",
      price: "22€",
      imagePath: "https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Acessórios"
    },
    {
      id: "9",
      name: "Tónico Capilar Fortificante",
      description: "Tónico que estimula o crescimento do cabelo e previne a queda, fortalecendo os folículos.",
      price: "24€",
      imagePath: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Cabelo"
    },
    {
      id: "10",
      name: "Tesoura Profissional",
      description: "Tesoura de corte profissional em aço inoxidável para manutenção de barba e cabelo em casa.",
      price: "35€",
      imagePath: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Acessórios"
    }
  ];

  const categories = ["todos", "Barba", "Cabelo", "Styling", "Acessórios"];

  // Filtrar produtos por categoria e termo de busca
  const filteredProducts = products.filter(product => {
    const matchesCategory = category === "todos" || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section 
        className="relative bg-navalha-black py-16 text-white"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">A Nossa Loja</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubra a nossa seleção exclusiva de produtos para cuidados de barba e cabelo, escolhidos a dedo pelos nossos barbeiros profissionais.
          </p>
        </div>
      </section>
      
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Produtos <span className="text-navalha-burgundy">Premium</span>
              </h2>
              <p className="text-gray-600">
                Produtos de alta qualidade para cuidados pessoais masculinos.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <Label htmlFor="search" className="sr-only">Pesquisar</Label>
                <Input 
                  id="search"
                  placeholder="Pesquisar produtos..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-60"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button 
                    key={cat} 
                    variant={category === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategory(cat)}
                    className={category === cat ? "bg-navalha-gold text-black hover:bg-navalha-burgundy hover:text-white" : ""}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Nenhum produto encontrado com os filtros selecionados.</p>
              <Button 
                onClick={() => {setCategory("todos"); setSearchTerm("");}}
                className="mt-4 bg-navalha-burgundy hover:bg-navalha-black text-white"
              >
                Limpar Filtros
              </Button>
            </div>
          )}
          
          {filteredProducts.length > 0 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Por Que Escolher os Nossos <span className="text-navalha-burgundy">Produtos</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              No Clube da Navalha, selecionamos cuidadosamente os melhores produtos para oferecer aos nossos clientes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="w-16 h-16 bg-navalha-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Qualidade Premium</h3>
              <p className="text-gray-600">
                Selecionamos apenas os produtos de mais alta qualidade, testados e aprovados pelos nossos barbeiros.
              </p>
            </div>
            
            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="w-16 h-16 bg-navalha-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Ingredientes Naturais</h3>
              <p className="text-gray-600">
                A maioria dos nossos produtos contém ingredientes naturais, livres de químicos agressivos.
              </p>
            </div>
            
            <div className="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
              <div className="w-16 h-16 bg-navalha-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Resultados Garantidos</h3>
              <p className="text-gray-600">
                Produtos com eficácia comprovada que irão elevar o seu cuidado pessoal para outro nível.
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

export default Loja;
