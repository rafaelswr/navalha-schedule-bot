
import { addDays, subDays } from "date-fns";

// Mock appointments data by barber
export interface BarberAppointment {
  cliente: string;
  servico: string;
  hora: string;
  valor: string;
}

export interface AppointmentDay {
  date: Date;
  appointments: BarberAppointment[];
}

const today = new Date();

export const barberAppointments: Record<string, AppointmentDay[]> = {
  // Barber ID "1" = João Silva
  "1": [
    { date: today, appointments: [
      { cliente: "Antonio Ribeiro", servico: "Corte + Barba", hora: "09:00", valor: "25€" },
      { cliente: "Pedro Costa", servico: "Corte de Cabelo", hora: "11:30", valor: "15€" },
    ]},
    { date: addDays(today, 1), appointments: [
      { cliente: "João Alves", servico: "Corte + Barba", hora: "10:00", valor: "25€" },
      { cliente: "Manuel Silva", servico: "Barba", hora: "11:00", valor: "12€" },
    ]},
    { date: addDays(today, 2), appointments: [
      { cliente: "Miguel Ramos", servico: "Corte de Cabelo", hora: "09:30", valor: "15€" },
    ]},
    { date: subDays(today, 1), appointments: [
      { cliente: "Duarte Fonseca", servico: "Corte de Cabelo", hora: "10:00", valor: "15€" },
    ]},
  ],
  
  // Barber ID "2" = Maria Oliveira
  "2": [
    { date: today, appointments: [
      { cliente: "Sofia Cardoso", servico: "Corte Feminino", hora: "14:00", valor: "30€" },
      { cliente: "Margarida Santos", servico: "Penteado", hora: "16:00", valor: "25€" },
    ]},
    { date: addDays(today, 1), appointments: [
      { cliente: "Ana Rita", servico: "Coloração", hora: "13:30", valor: "45€" },
    ]},
    { date: addDays(today, 3), appointments: [
      { cliente: "Joana Martins", servico: "Corte Feminino", hora: "15:00", valor: "30€" },
      { cliente: "Inês Sousa", servico: "Tratamento Capilar", hora: "17:30", valor: "40€" },
    ]},
  ],
  
  // Barber ID "3" = Pedro Santos
  "3": [
    { date: today, appointments: [
      { cliente: "Ricardo Fernandes", servico: "Barba", hora: "10:30", valor: "12€" },
    ]},
    { date: addDays(today, 2), appointments: [
      { cliente: "Paulo Mendes", servico: "Corte + Barba", hora: "14:30", valor: "25€" },
      { cliente: "Tiago Costa", servico: "Corte de Cabelo", hora: "16:00", valor: "15€" },
    ]},
    { date: subDays(today, 2), appointments: [
      { cliente: "Carlos Martins", servico: "Corte de Cabelo", hora: "11:00", valor: "15€" },
      { cliente: "Fernando Silva", servico: "Barba", hora: "12:30", valor: "12€" },
    ]},
  ],
  
  // Barber ID "4" = Ana Pereira
  "4": [
    { date: addDays(today, 1), appointments: [
      { cliente: "Marta Santos", servico: "Corte Feminino", hora: "09:00", valor: "30€" },
      { cliente: "Carolina Almeida", servico: "Penteado", hora: "11:00", valor: "25€" },
    ]},
    { date: addDays(today, 3), appointments: [
      { cliente: "Diana Costa", servico: "Coloração", hora: "10:00", valor: "45€" },
      { cliente: "Teresa Ribeiro", servico: "Tratamento Capilar", hora: "14:00", valor: "40€" },
    ]},
  ]
};

// Function to get barber appointments by ID
export function getBarberAppointments(barberId: string): AppointmentDay[] {
  return barberAppointments[barberId] || [];
}
