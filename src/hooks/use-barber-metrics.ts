
import { useQuery } from "@tanstack/react-query";
import { 
  getBarberAppointments, 
  getBarberMetrics, 
  getShopMetrics,
  AppointmentDay, 
  BarberMetrics 
} from "@/data/barberAppointments";

export function useBarberMetrics(barberId?: string) {
  // Query for getting shop-wide metrics (when barberId is undefined)
  const shopMetricsQuery = useQuery({
    queryKey: ["shopMetrics"],
    queryFn: () => getShopMetrics(),
    enabled: !barberId,
  });

  // Query for getting barber-specific metrics
  const barberMetricsQuery = useQuery({
    queryKey: ["barberMetrics", barberId],
    queryFn: () => getBarberMetrics(barberId as string),
    enabled: !!barberId,
  });

  // Query for getting barber appointments
  const appointmentsQuery = useQuery({
    queryKey: ["barberAppointments", barberId],
    queryFn: () => getBarberAppointments(barberId as string),
    enabled: !!barberId,
  });

  return {
    shopMetrics: shopMetricsQuery.data,
    isShopLoading: shopMetricsQuery.isLoading,
    barberMetrics: barberMetricsQuery.data,
    isBarberLoading: barberMetricsQuery.isLoading,
    appointments: appointmentsQuery.data || [],
    isAppointmentsLoading: appointmentsQuery.isLoading,
  };
}
