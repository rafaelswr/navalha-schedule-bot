
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Barber, BarberFormData, UseBarberOptions } from "@/types/barber";
import { toast } from "sonner";

// Dados mockados para demonstração
const MOCK_BARBERS: Barber[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@clubedanavalha.com",
    phone: "(11) 98765-4321",
    specialties: ["Corte Clássico", "Barba"],
    photoUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=100&h=100",
    status: "active",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    email: "maria@clubedanavalha.com",
    phone: "(11) 91234-5678",
    specialties: ["Tratamentos Capilares", "Coloração"],
    photoUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=100&h=100", 
    status: "active",
  },
  {
    id: "3",
    name: "Pedro Santos",
    email: "pedro@clubedanavalha.com",
    phone: "(11) 92222-3333",
    specialties: ["Barba", "Corte Moderno"],
    photoUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=100&h=100", 
    status: "inactive",
  },
  {
    id: "4",
    name: "Ana Pereira",
    email: "ana@clubedanavalha.com",
    phone: "(11) 94444-5555",
    specialties: ["Corte Feminino", "Penteados"],
    photoUrl: "https://images.unsplash.com/photo-1501286353178-1ec871214838?auto=format&fit=crop&w=100&h=100", 
    status: "active",
  },
];

// Constante simulando usuário autenticado
const CURRENT_USER_ID = "1"; // Simulando que o João está autenticado

export function useBarbers(options?: UseBarberOptions) {
  const queryClient = useQueryClient();
  const { barberId } = options || {};

  // Função que simula a chamada GET à API
  const fetchBarbers = async (): Promise<Barber[]> => {
    // Simula tempo de resposta da API
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Se tiver barberId definido (modo "self"), retorna apenas o barbeiro específico
    if (barberId) {
      const filtered = MOCK_BARBERS.filter(barber => barber.id === barberId);
      return filtered;
    }
    
    return MOCK_BARBERS;
  };

  // Query para buscar barbeiros
  const barberQuery = useQuery({
    queryKey: ["barbers", barberId],
    queryFn: fetchBarbers,
  });

  // Mutação para criar barbeiro
  const createBarber = useMutation({
    mutationFn: async (data: BarberFormData) => {
      // Simula tempo de resposta da API
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Simulação de criação (apenas retorna um objeto com ID gerado)
      const newBarber: Barber = {
        id: `${Math.floor(Math.random() * 1000)}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        specialties: data.specialties,
        photoUrl: data.photoUrl || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=100&h=100",
        status: data.status,
      };
      
      return newBarber;
    },
    onSuccess: () => {
      // Invalida cache para recarregar dados
      queryClient.invalidateQueries({ queryKey: ["barbers"] });
      toast.success("Barbeiro adicionado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao adicionar barbeiro");
    }
  });

  // Mutação para atualizar barbeiro
  const updateBarber = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BarberFormData }) => {
      // Simula tempo de resposta da API
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Simulação de atualização (apenas retorna o objeto atualizado)
      const updatedBarber: Barber = {
        id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        specialties: data.specialties,
        photoUrl: data.photoUrl || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=100&h=100",
        status: data.status,
      };
      
      return updatedBarber;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbers"] });
      toast.success("Barbeiro atualizado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao atualizar barbeiro");
    }
  });

  // Mutação para atualizar status do barbeiro
  const updateBarberStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "active" | "inactive" }) => {
      // Simula tempo de resposta da API
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Simulação de atualização (apenas retorna sucesso)
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbers"] });
      toast.success("Status do barbeiro atualizado");
    },
    onError: () => {
      toast.error("Erro ao atualizar status do barbeiro");
    }
  });

  // Mutação para deletar barbeiro
  const deleteBarber = useMutation({
    mutationFn: async (id: string) => {
      // Simula tempo de resposta da API
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Simulação de deleção (apenas retorna sucesso)
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbers"] });
      toast.success("Barbeiro removido com sucesso");
    },
    onError: () => {
      toast.error("Erro ao remover barbeiro");
    }
  });

  return {
    barbers: barberQuery.data || [],
    isLoading: barberQuery.isLoading,
    isError: barberQuery.isError,
    createBarber,
    updateBarber,
    updateBarberStatus,
    deleteBarber,
    currentUserId: CURRENT_USER_ID, // Usuário autenticado simulado
  };
}
