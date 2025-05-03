
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBarbers } from "@/hooks/use-barbers";
import { useBarberMetrics } from "@/hooks/use-barber-metrics";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { TrendMiniChart } from "@/components/dashboard/TrendMiniChart";
import { GoalProgressCard } from "@/components/dashboard/GoalProgressCard";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart";
import { AlertCircle, Calendar, Bell, TrendingUp, Users, Landmark, ArrowRight } from "lucide-react";

const ShopDashboard = () => {
  const navigate = useNavigate();
  const { barbers, isLoading: isBarbersLoading } = useBarbers();
  const { shopMetrics, isShopLoading } = useBarberMetrics();
  
  const [period, setPeriod] = useState("weekly");
  
  const activeBarbers = barbers.filter(barber => barber.status === "active");
  
  // Loading state
  if (isBarbersLoading || isShopLoading || !shopMetrics) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard Geral - Clube da Navalha</h1>
        <div className="animate-pulse space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-200 h-32 rounded-lg" />
            <div className="bg-gray-200 h-32 rounded-lg" />
            <div className="bg-gray-200 h-32 rounded-lg" />
          </div>
          <div className="bg-gray-200 h-64 rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-200 h-80 rounded-lg" />
            <div className="bg-gray-200 h-80 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  // Format data for charts
  const dailyServiceData = Array(7).fill(0).map((_, i) => ({
    name: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][i],
    value: shopMetrics.dailyTrend[i]
  }));

  // Prepare barber ranking data
  const barberRankingData = shopMetrics.barberRanking.map(barber => ({
    ...barber,
    name: barber.name.split(' ')[0] // Just first name for display
  }));

  // Create mock data for monthly evolution chart
  const monthlyEvolutionData = Array(30).fill(0).map((_, i) => ({
    day: i + 1,
    services: Math.round(20 + Math.random() * 10 + i / 2),
    revenue: Math.round(400 + Math.random() * 100 + i * 10)
  }));

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Geral - Clube da Navalha</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KpiCard
          title="Serviços Totais Hoje"
          value={shopMetrics.servicesToday}
          trend={{ 
            value: 15, 
            isPositive: true, 
            label: "+15% vs média" 
          }}
          footnote={`${activeBarbers.length} barbeiros ativos`}
        />
        
        <KpiCard
          title="Faturação Mensal"
          value={`${shopMetrics.monthlyRevenue.toLocaleString()}€`}
          trend={{ 
            value: 8, 
            isPositive: true, 
            label: "+8% vs mês anterior" 
          }}
          footnote={`Ticket médio: ${shopMetrics.averageTicket}€`}
        />
        
        <KpiCard
          title="Taxa de Retorno Média"
          value={`${shopMetrics.returnRate}%`}
          trend={{ 
            value: 3, 
            isPositive: true, 
            label: "+3% vs mês anterior"
          }}
          footnote="Últimos 30 dias"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Evolução Mensal</CardTitle>
            <CardDescription>Serviços e faturação nos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{
                services: { label: "Serviços", color: "#9b87f5" },
                revenue: { label: "Faturação (€)", color: "#6E59A5" },
              }}
            >
              <LineChart data={monthlyEvolutionData}>
                <XAxis 
                  dataKey="day" 
                  tickFormatter={(day) => day % 5 === 0 ? `${day}` : ''} 
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="services" 
                  stroke="#9b87f5" 
                  name="Serviços" 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6E59A5" 
                  name="Faturação (€)" 
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <GoalProgressCard
          title="Meta Mensal - Faturação"
          current={shopMetrics.goalProgress.current}
          target={shopMetrics.goalProgress.target}
          type="revenue"
          className="h-auto"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Ranking de Barbeiros</CardTitle>
            <CardDescription>Desempenho de barbeiros em faturação e serviços</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="revenue">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="revenue">Faturação</TabsTrigger>
                <TabsTrigger value="services">Serviços</TabsTrigger>
              </TabsList>
              
              <TabsContent value="revenue" className="h-64">
                <ChartContainer
                  config={{
                    revenue: { label: "Faturação", color: "#6E59A5" },
                  }}
                >
                  <BarChart data={barberRankingData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={60} 
                    />
                    <Tooltip formatter={(value) => [`${value}€`, 'Faturação']} />
                    <Bar 
                      dataKey="revenue" 
                      fill="#6E59A5" 
                      barSize={20}
                      name="Faturação"
                    />
                  </BarChart>
                </ChartContainer>
              </TabsContent>
              
              <TabsContent value="services" className="h-64">
                <ChartContainer
                  config={{
                    services: { label: "Serviços", color: "#9b87f5" },
                  }}
                >
                  <BarChart data={barberRankingData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={60} 
                    />
                    <Tooltip />
                    <Bar 
                      dataKey="services" 
                      fill="#9b87f5" 
                      barSize={20}
                      name="Serviços"
                    />
                  </BarChart>
                </ChartContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/admin/barbeiros')}>
              <Users className="h-4 w-4 mr-2" />
              Ver Todos os Barbeiros
            </Button>
          </CardFooter>
        </Card>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                Alertas de Ocupação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {shopMetrics.occupancyAlerts.length > 0 ? (
                shopMetrics.occupancyAlerts.map((alert, index) => {
                  const barber = barbers.find(b => b.id === alert.id);
                  if (!barber) return null;
                  
                  return (
                    <Alert key={index} variant="destructive" className="bg-amber-50 text-amber-800 border-amber-200">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={barber.photoUrl} alt={barber.name} />
                            <AvatarFallback>{barber.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <AlertTitle className="mb-1">{barber.name}</AlertTitle>
                            <AlertDescription>
                              Ocupação de {alert.occupancy}% (abaixo do mínimo de {alert.threshold}%)
                            </AlertDescription>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="ml-2"
                          onClick={() => navigate(`/admin/barber/${barber.id}`)}
                        >
                          Ver
                        </Button>
                      </div>
                    </Alert>
                  );
                })
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Bell className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>Sem alertas de ocupação no momento</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                Campanhas de Marketing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campanha</TableHead>
                    <TableHead>Uso</TableHead>
                    <TableHead>Conversão</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shopMetrics.marketingCampaigns.map((campaign, index) => (
                    <TableRow key={index}>
                      <TableCell>{campaign.name}</TableCell>
                      <TableCell>{campaign.usage}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Progress value={campaign.conversion} className="h-2 mr-2" />
                          <span className="text-xs">{campaign.conversion}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Ver Todas as Campanhas
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
          <ArrowRight className="h-4 w-4 mr-2" />
          Dashboard de Barbeiros
        </Button>
      </div>
    </div>
  );
};

export default ShopDashboard;
