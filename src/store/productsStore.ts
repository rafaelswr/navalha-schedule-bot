
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imagePath: string;
  category: string;
  featured: boolean;
}

interface ProductsState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set) => ({
      products: [
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
          category: "Barba",
          featured: false
        },
        {
          id: "3",
          name: "Champô Anticaspa",
          description: "Champô especializado para combater a caspa e manter o couro cabeludo saudável.",
          price: "14€",
          imagePath: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
          category: "Cabelo",
          featured: false
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
      ],
      setProducts: (products) => set({ products }),
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map((product) => 
          product.id === id ? { ...product, ...updatedProduct } : product
        ),
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((product) => product.id !== id)
      })),
    }),
    {
      name: 'products-storage',
    }
  )
);
