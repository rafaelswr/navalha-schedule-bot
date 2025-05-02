
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  imagePath: string;
  featured: boolean;
}

interface ServicesState {
  services: Service[];
  setServices: (services: Service[]) => void;
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
}

export const useServicesStore = create<ServicesState>()(
  persist(
    (set) => ({
      services: [
        {
          id: "1",
          title: "Corte de Cabelo",
          description: "Corte moderno executado com perícia e precisão, inclui lavagem e styling.",
          price: "15€",
          duration: "30 min",
          imagePath: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
          featured: false
        },
        {
          id: "2",
          title: "Corte + Barba",
          description: "Combinação perfeita de corte de cabelo e aparagem de barba com toalha quente.",
          price: "25€",
          duration: "60 min",
          imagePath: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
          featured: true
        },
        {
          id: "3",
          title: "Barba",
          description: "Tratamento completo de barba com toalha quente, óleos essenciais e aparagem.",
          price: "12€",
          duration: "30 min",
          imagePath: "https://images.unsplash.com/photo-1593702288056-7056d12307fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
          featured: false
        },
      ],
      setServices: (services) => set({ services }),
      addService: (service) => set((state) => ({ services: [...state.services, service] })),
      updateService: (id, updatedService) => set((state) => ({
        services: state.services.map((service) => 
          service.id === id ? { ...service, ...updatedService } : service
        ),
      })),
      deleteService: (id) => set((state) => ({
        services: state.services.filter((service) => service.id !== id)
      })),
    }),
    {
      name: 'services-storage',
    }
  )
);
