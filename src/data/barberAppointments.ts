
import { addDays, subDays, format, startOfWeek, startOfMonth } from "date-fns";

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

export interface BarberMetrics {
  servicesToday: number;
  servicesByType: Record<string, number>;
  monthlyRevenue: number;
  averageTicket: number;
  returnRate: number;
  weeklyOccupation: number[];
  monthlyTrend: number[];
  goalProgress: {
    current: number;
    target: number;
    type: "revenue" | "services";
  };
}

const today = new Date();

// Generate sparkline data (last 7 days)
const generateTrendData = (startValue: number, volatility: number, trend: "up" | "down" | "stable" = "up") => {
  const data = [];
  let currentValue = startValue;
  
  for (let i = 6; i >= 0; i--) {
    // Apply trend with some random fluctuation
    const changeDirection = Math.random() > 0.3 ? (trend === "up" ? 1 : trend === "down" ? -1 : (Math.random() > 0.5 ? 1 : -1)) : (Math.random() > 0.5 ? 1 : -1);
    const change = changeDirection * Math.random() * volatility;
    currentValue += change;
    currentValue = Math.max(0, currentValue); // Ensure no negative values
    
    data.push(Math.round(currentValue * 10) / 10); // Round to one decimal place
  }
  
  return data;
};

// Generate last 30 days for monthly trends
const generateMonthlyData = (baseValue: number, volatility: number, trend: "up" | "down" | "stable" = "up") => {
  const data = [];
  let currentValue = baseValue;
  
  for (let i = 29; i >= 0; i--) {
    const changeDirection = Math.random() > 0.3 ? (trend === "up" ? 1 : trend === "down" ? -1 : (Math.random() > 0.5 ? 1 : -1)) : (Math.random() > 0.5 ? 1 : -1);
    const change = changeDirection * Math.random() * volatility;
    currentValue += change;
    currentValue = Math.max(0, currentValue);
    
    data.push(Math.round(currentValue * 10) / 10);
  }
  
  return data;
};

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

// Mock barber metrics data
export const barberMetrics: Record<string, BarberMetrics> = {
  // João Silva
  "1": {
    servicesToday: 2,
    servicesByType: { "Corte + Barba": 1, "Corte de Cabelo": 1 },
    monthlyRevenue: 1850,
    averageTicket: 18.5,
    returnRate: 78,
    weeklyOccupation: generateTrendData(80, 10, "up"),
    monthlyTrend: generateMonthlyData(1600, 50, "up"),
    goalProgress: {
      current: 1850,
      target: 2500,
      type: "revenue"
    }
  },
  // Maria Oliveira
  "2": {
    servicesToday: 2,
    servicesByType: { "Corte Feminino": 1, "Penteado": 1 },
    monthlyRevenue: 2240,
    averageTicket: 32.5,
    returnRate: 65,
    weeklyOccupation: generateTrendData(70, 15, "stable"),
    monthlyTrend: generateMonthlyData(2100, 80, "up"),
    goalProgress: {
      current: 2240,
      target: 3000,
      type: "revenue"
    }
  },
  // Pedro Santos
  "3": {
    servicesToday: 1,
    servicesByType: { "Barba": 1 },
    monthlyRevenue: 1560,
    averageTicket: 16.8,
    returnRate: 82,
    weeklyOccupation: generateTrendData(85, 8, "down"),
    monthlyTrend: generateMonthlyData(1700, 40, "down"),
    goalProgress: {
      current: 42,
      target: 60,
      type: "services"
    }
  },
  // Ana Pereira
  "4": {
    servicesToday: 0,
    servicesByType: {},
    monthlyRevenue: 1980,
    averageTicket: 35.2,
    returnRate: 70,
    weeklyOccupation: generateTrendData(65, 12, "up"),
    monthlyTrend: generateMonthlyData(1800, 60, "up"),
    goalProgress: {
      current: 1980,
      target: 2200,
      type: "revenue"
    }
  }
};

// Global shop metrics
export const shopMetrics = {
  servicesToday: 5,
  monthlyRevenue: 7630,
  averageTicket: 24.3,
  returnRate: 74,
  dailyTrend: generateTrendData(22, 5, "up"),
  revenueTrend: generateMonthlyData(7000, 200, "up"),
  goalProgress: {
    current: 7630,
    target: 10000,
    type: "revenue"
  },
  barberRanking: [
    { id: "2", name: "Maria Oliveira", revenue: 2240, services: 69 },
    { id: "4", name: "Ana Pereira", revenue: 1980, services: 56 },
    { id: "1", name: "João Silva", revenue: 1850, services: 100 },
    { id: "3", name: "Pedro Santos", revenue: 1560, services: 93 }
  ],
  occupancyAlerts: [
    { id: "4", name: "Ana Pereira", occupancy: 65, threshold: 70 }
  ],
  marketingCampaigns: [
    { name: "Cupom Primeira Visita", usage: 24, conversion: 68 },
    { name: "Desconto Aniversário", usage: 12, conversion: 92 }
  ]
};

// Function to get barber appointments by ID
export function getBarberAppointments(barberId: string): AppointmentDay[] {
  return barberAppointments[barberId] || [];
}

// Function to get barber metrics by ID
export function getBarberMetrics(barberId: string): BarberMetrics | undefined {
  return barberMetrics[barberId];
}

// Function to get global shop metrics
export function getShopMetrics() {
  return shopMetrics;
}
