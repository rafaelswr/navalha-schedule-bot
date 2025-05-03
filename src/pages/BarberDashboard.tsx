
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBarbers } from "@/hooks/use-barbers";
import { useBarberMetrics } from "@/hooks/use-barber-metrics";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarberDailyAgenda } from "@/components/dashboard/BarberDailyAgenda";
import { TrendMiniChart } from "@/components/dashboard/TrendMiniChart";
import { GoalProgressCard } from "@/components/dashboard/GoalProgressCard";
import { ServiceTypePieChart } from "@/components/dashboard/ServiceTypePieChart";
import { ArrowLeft, Scissors } from "lucide-react";

const BarberDashboard = () => {
  const { barberId } = useParams();
  const navigate = useNavigate();
  const { barbers, isLoading: isBarbersLoading } = useBarbers();
  const { 
    barberMetrics, 
    isBarberLoading, 
    appointments, 
    isAppointmentsLoading 
  } = useBarberMetrics(barberId);

  const barber = barbers.find(b => b.id === barberId);

  // Redirect to admin dashboard if barber not found
  useEffect(() => {
    if (!isBarbersLoading && !barber) {
      navigate('/admin/dashboard');
    }
  }, [barber, isBarbersLoading, navigate]);

  // Convert servicesByType to array for pie chart
  const serviceTypeData = barberMetrics ? 
    Object.entries(barberMetrics.servicesByType).map(([name, value]) => ({ name, value })) :
    [];

  // Loading state
  if (isBarbersLoading || isBarberLoading || isAppointmentsLoading || !barber || !barberMetrics) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="sm" className="mr-4" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <Skeleton className="h-10 w-48" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        
        <Skeleton className="h-96 mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" size="sm" className="mr-4" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={barber.photoUrl} alt={barber.name} />
              <AvatarFallback>{barber.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{barber.name}</h1>
              <div className="flex items-center text-sm text-muted-foreground">
                <Badge variant="outline" className="mr-2">
                  {barber.status === 'active' ? 'Ativo' : 'Inativo'}
                </Badge>
                {barber.specialties.join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KpiCard
          title="Serviços Hoje"
          value={barberMetrics.servicesToday}
          trend={{ 
            value: 10, 
            isPositive: true, 
            label: "+10% vs ontem" 
          }}
          footnote={Object.entries(barberMetrics.servicesByType)
            .map(([type, count]) => `${count} ${type}`)
            .join(" / ")}
        />
        
        <KpiCard
          title="Faturação Mensal"
          value={`${barberMetrics.monthlyRevenue.toLocaleString()}€`}
          trend={{ 
            value: 5, 
            isPositive: true, 
            label: "+5% vs mês anterior" 
          }}
          footnote={`Média diária: ${(barberMetrics.monthlyRevenue / 30).toFixed(0)}€`}
        />
        
        <KpiCard
          title="Ticket Médio"
          value={`${barberMetrics.averageTicket.toLocaleString()}€`}
          trend={{ 
            value: 2, 
            isPositive: true, 
            label: "+2% vs mês anterior"
          }}
          footnote={`Taxa de retorno: ${barberMetrics.returnRate}%`}
        />
        
        <GoalProgressCard
          title="Meta Mensal"
          current={barberMetrics.goalProgress.current}
          target={barberMetrics.goalProgress.target}
          type={barberMetrics.goalProgress.type}
        />
      </div>
      
      <BarberDailyAgenda 
        barber={barber}
        appointments={appointments}
        className="mb-8"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <TrendMiniChart
          title="Taxa de Ocupação Semanal"
          data={barberMetrics.weeklyOccupation}
          trend={barberMetrics.weeklyOccupation[6] > barberMetrics.weeklyOccupation[0] ? "up" : "down"}
          trendValue={8}
          trendLabel="vs semana anterior"
          valueFormatter={(val) => `${val}%`}
          type="area"
        />
        
        <TrendMiniChart
          title="Evolução de Faturação"
          data={barberMetrics.monthlyTrend.slice(-7)}
          trend={barberMetrics.monthlyTrend[barberMetrics.monthlyTrend.length-1] > 
            barberMetrics.monthlyTrend[barberMetrics.monthlyTrend.length-7] ? "up" : "down"}
          trendValue={5}
          trendLabel="vs mês anterior"
          valueFormatter={(val) => `${val}€`}
        />
        
        <ServiceTypePieChart
          title="Distribuição de Serviços"
          data={serviceTypeData}
        />
      </div>
    </div>
  );
};

export default BarberDashboard;
