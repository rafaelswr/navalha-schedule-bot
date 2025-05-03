import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, EyeOff, Scissors, Calendar as CalendarIcon, Users, Building, FileText, Store } from "lucide-react";
import { format } from "date-fns";
import { BarbersFilterToggle, BarberFilterValue } from "@/components/ui/barbers-filter-toggle";
import { useBarberFilter } from "@/hooks/use-barber-filter";
import { useBarbers } from "@/hooks/use-barbers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BarberCalendar } from "@/components/barbers/BarberCalendar";
import { getBarberAppointments } from "@/data/barberAppointments";

// Mock data for the dashboard
const dailyData = [
  { name: "Seg", corte: 15, barba: 8, total: 23 },
  { name: "Ter", corte: 18, barba: 12, total: 30 },
  { name: "Qua", corte: 22, barba: 15, total: 37 },
  { name: "Qui", corte: 25, barba: 20, total: 45 },
  { name: "Sex", corte: 32, barba: 24, total: 56 },
  { name: "Sáb", corte: 38, barba: 28, total: 66 },
  { name: "Dom", corte: 12, barba: 5, total: 17 },
];

const monthlyData = [
  { name: "Jan", corte: 120, barba: 80, total: 200 },
  { name: "Fev", corte: 130, barba: 90, total: 220 },
  { name: "Mar", corte: 150, barba: 110, total: 260 },
  { name: "Abr", corte: 170, barba: 130, total: 300 },
  { name: "Mai", corte: 190, barba: 150, total: 340 },
  { name: "Jun", corte: 210, barba: 170, total: 380 },
  { name: "Jul", corte: 230, barba: 190, total: 420 },
  { name: "Ago", corte: 210, barba: 170, total: 380 },
  { name: "Set", corte: 190, barba: 150, total: 340 },
  { name: "Out", corte: 170, barba: 130, total: 300 },
  { name: "Nov", corte: 150, barba: 110, total: 260 },
  { name: "Dez", corte: 180, barba: 140, total: 320 },
];

const yearlyData = [
  { name: "2020", corte: 1800, barba: 1200, total: 3000 },
  { name: "2021", corte: 2000, barba: 1500, total: 3500 },
  { name: "2022", corte: 2400, barba: 1800, total: 4200 },
  { name: "2023", corte: 2800, barba: 2200, total: 5000 },
  { name: "2024", corte: 3200, barba: 2600, total: 5800 },
];

// Mock per-barber data for filtering demonstration
const dailyDataByBarber = {
  "all": [
    { name: "Seg", corte: 15, barba: 8, total: 23 },
    { name: "Ter", corte: 18, barba: 12, total: 30 },
    { name: "Qua", corte: 22, barba: 15, total: 37 },
    { name: "Qui", corte: 25, barba: 20, total: 45 },
    { name: "Sex", corte: 32, barba: 24, total: 56 },
    { name: "Sáb", corte: 38, barba: 28, total: 66 },
    { name: "Dom", corte: 12, barba: 5, total: 17 },
  ],
  "self": [
    { name: "Seg", corte: 5, barba: 3, total: 8 },
    { name: "Ter", corte: 6, barba: 4, total: 10 },
    { name: "Qua", corte: 8, barba: 5, total: 13 },
    { name: "Qui", corte: 7, barba: 6, total: 13 },
    { name: "Sex", corte: 10, barba: 8, total: 18 },
    { name: "Sáb", corte: 12, barba: 9, total: 21 },
    { name: "Dom", corte: 4, barba: 2, total: 6 },
  ]
};

const monthlyDataByBarber = {
  "all": monthlyData,
  "self": monthlyData.map(month => ({
    ...month,
    corte: Math.round(month.corte * 0.3),
    barba: Math.round(month.barba * 0.3),
    total: Math.round(month.total * 0.3)
  }))
};

const yearlyDataByBarber = {
  "all": yearlyData,
  "self": yearlyData.map(year => ({
    ...year,
    corte: Math.round(year.corte * 0.3),
    barba: Math.round(year.barba * 0.3),
    total: Math.round(year.total * 0.3)
  }))
};

// Mock recent appointments data
const recentAppointments = [
  { cliente: "Ricardo Santos", servico: "Corte + Barba", data: "02/05/2025", hora: "14:30", valor: "25€" },
  { cliente: "João Oliveira", servico: "Barba", data: "02/05/2025", hora: "15:30", valor: "12€" },
  { cliente: "Tiago Ferreira", servico: "Corte de Cabelo", data: "02/05/2025", hora: "16:30", valor: "15€" },
  { cliente: "André Martins", servico: "Pacote Premium", data: "02/05/2025", hora: "17:30", valor: "40€" },
];

// Mock appointments data by barber
const appointmentsDataByBarber = {
  "all": [
    { date: new Date(2025, 4, 1), appointments: [
      { cliente: "António Ribeiro", servico: "Corte + Barba", hora: "09:00", valor: "25€" },
      { cliente: "Pedro Costa", servico: "Corte de Cabelo", hora: "11:30", valor: "15€" },
      { cliente: "Rui Mendes", servico: "Barba", hora: "14:00", valor: "12€" },
    ]},
    { date: new Date(2025, 4, 2), appointments: [
      { cliente: "João Silva", servico: "Corte + Barba", hora: "10:00", valor: "25€" },
      { cliente: "Manuel Costa", servico: "Barba", hora: "11:00", valor: "12€" },
      { cliente: "António Ferreira", servico: "Corte de Cabelo", hora: "12:00", valor: "15€" },
      { cliente: "Pedro Santos", servico: "Tratamento Facial", hora: "14:00", valor: "20€" },
      { cliente: "Carlos Lopes", servico: "Pacote Premium", hora: "15:30", valor: "40€" },
    ]},
    { date: new Date(2025, 4, 3), appointments: [
      { cliente: "Miguel Ramos", servico: "Corte de Cabelo", hora: "09:30", valor: "15€" },
      { cliente: "José Almeida", servico: "Barba", hora: "13:00", valor: "12€" },
      { cliente: "Francisco Silva", servico: "Corte + Barba", hora: "16:30", valor: "25€" },
    ]},
    { date: new Date(2025, 3, 28), appointments: [
      { cliente: "Duarte Fonseca", servico: "Corte de Cabelo", hora: "10:00", valor: "15€" },
      { cliente: "Tomás Costa", servico: "Pacote Premium", hora: "14:00", valor: "40€" },
    ]},
    { date: new Date(2025, 3, 29), appointments: [
      { cliente: "Paulo Marques", servico: "Barba", hora: "09:00", valor: "12€" },
      { cliente: "Jorge Mendes", servico: "Corte + Barba", hora: "11:30", valor: "25€" },
      { cliente: "Fernando Sousa", servico: "Tratamento Facial", hora: "15:00", valor: "20€" },
    ]},
  ],
  "self": [
    { date: new Date(2025, 4, 1), appointments: [
      { cliente: "António Ribeiro", servico: "Corte + Barba", hora: "09:00", valor: "25€" },
    ]},
    { date: new Date(2025, 4, 2), appointments: [
      { cliente: "João Silva", servico: "Corte + Barba", hora: "10:00", valor: "25€" },
      { cliente: "Manuel Costa", servico: "Barba", hora: "11:00", valor: "12€" },
    ]},
    { date: new Date(2025, 4, 3), appointments: [
      { cliente: "Miguel Ramos", servico: "Corte de Cabelo", hora: "09:30", valor: "15€" },
    ]},
    { date: new Date(2025, 3, 28), appointments: [
      { cliente: "Duarte Fonseca", servico: "Corte de Cabelo", hora: "10:00", valor: "15€" },
    ]},
    { date: new Date(2025, 3, 29), appointments: [
      { cliente: "Paulo Marques", servico: "Barba", hora: "09:00", valor: "12€" },
    ]},
  ]
};

// Generate sparkline data (last 7 days)
const generateSparklineData = (startValue: number, volatility: number, trend: "up" | "down" | "stable" = "up") => {
  const today = new Date();
  const data = [];
  let currentValue = startValue;
  
  for (let i = 6; i >= 0; i--) {
    const date = subDays(today, i);
    // Apply trend with some random fluctuation
    const changeDirection = Math.random() > 0.3 ? (trend === "up" ? 1 : trend === "down" ? -1 : (Math.random() > 0.5 ? 1 : -1)) : (Math.random() > 0.5 ? 1 : -1);
    const change = changeDirection * Math.random() * volatility;
    currentValue += change;
    currentValue = Math.max(0, currentValue); // Ensure no negative values
    
    data.push({
      date: date,
      value: Math.round(currentValue * 10) / 10, // Round to one decimal place
    });
  }
  
  return data;
};

// Generate sparkline data sets by barber
const servicesSparklineDataByBarber = {
  "all": generateSparklineData(18, 5, "up"),
  "self": generateSparklineData(6, 2, "up")
};

const billingSparklineDataByBarber = {
  "all": generateSparklineData(90, 15, "up"),
  "self": generateSparklineData(30, 5, "up")
};

const clientsSparklineDataByBarber = {
  "all": generateSparklineData(120, 3, "up"),
  "self": generateSparklineData(40, 2, "up")
};

// KPI data by filter
const kpiDataByBarber = {
  "all": {
    services: { value: "23", trend: { value: 15, isPositive: true, label: "+15% vs ontem" }, footnote: "15 cortes / 8 barbas" },
    billing: { value: "3.450€", trend: { value: 8, isPositive: true, label: "+8% vs mês anterior" }, footnote: "Média diária: 115€" },
    clients: { value: "128", trend: { value: 12, isPositive: true, label: "+12 novos este mês" }, footnote: "78% taxa de retorno" }
  },
  "self": {
    services: { value: "8", trend: { value: 10, isPositive: true, label: "+10% vs ontem" }, footnote: "5 cortes / 3 barbas" },
    billing: { value: "1.125€", trend: { value: 5, isPositive: true, label: "+5% vs mês anterior" }, footnote: "Média diária: 38€" },
    clients: { value: "42", trend: { value: 4, isPositive: true, label: "+4 novos este mês" }, footnote: "82% taxa de retorno" }
  }
};

// Individual barber KPI data
const individualBarberKPIData: Record<string, any> = {
  "1": { // João
    services: { value: "8", trend: { value: 10, isPositive: true, label: "+10% vs ontem" }, footnote: "5 cortes / 3 barbas" },
    billing: { value: "1.125€", trend: { value: 5, isPositive: true, label: "+5% vs mês anterior" }, footnote: "Média diária: 38€" },
  },
  "2": { // Maria
    services: { value: "6", trend: { value: 5, isPositive: true, label: "+5% vs ontem" }, footnote: "4 cortes femininos / 2 penteados" },
    billing: { value: "950€", trend: { value: 8, isPositive: true, label: "+8% vs mês anterior" }, footnote: "Média diária: 32€" },
  },
  "3": { // Pedro
    services: { value: "5", trend: { value: 0, isPositive: false, label: "0% vs ontem" }, footnote: "3 cortes / 2 barbas" },
    billing: { value: "825€", trend: { value: 3, isPositive: true, label: "+3% vs mês anterior" }, footnote: "Média diária: 28€" },
  },
  "4": { // Ana
    services: { value: "4", trend: { value: 12, isPositive: true, label: "+12% vs ontem" }, footnote: "3 cortes femininos / 1 penteado" },
    billing: { value: "750€", trend: { value: 6, isPositive: true, label: "+6% vs mês anterior" }, footnote: "Média diária: 25€" },
  },
};

const AdminDashboard = () => {
  const [period, setPeriod] = useState("daily");
  const [showBilling, setShowBilling] = useState(false);
  const [barberFilter, setBarberFilter] = useBarberFilter("all", "dashboardBarberFilter");
  const navigate = useNavigate();
  
  // Get barber data from our hook instead of mock data
  const { barbers, isLoading } = useBarbers();
  const activeBarbers = barbers.filter(barber => barber.status === "active");

  // Use filtered data based on barber filter selection
  const currentDailyData = dailyDataByBarber[barberFilter];
  const currentMonthlyData = monthlyDataByBarber[barberFilter];
  const currentYearlyData = yearlyDataByBarber[barberFilter];
  const currentKpiData = kpiDataByBarber[barberFilter];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KpiCard
            title="Serviços Hoje"
            value={currentKpiData.services.value}
            trend={currentKpiData.services.trend}
            footnote={currentKpiData.services.footnote}
            sparklineData={servicesSparklineDataByBarber[barberFilter]}
            rightElement={
              <BarbersFilterToggle
                value={barberFilter}
                onValueChange={setBarberFilter}
                currentBarberId="1"
                compact={true}
              />
            }
          />

          <KpiCard
            title="Faturação Mensal"
            value={currentKpiData.billing.value}
            trend={currentKpiData.billing.trend}
            footnote={currentKpiData.billing.footnote}
            sparklineData={billingSparklineDataByBarber[barberFilter]}
            isPrivate={!showBilling}
            onToggleVisibility={() => setShowBilling(!showBilling)}
            rightElement={
              <BarbersFilterToggle
                value={barberFilter}
                onValueChange={setBarberFilter}
                currentBarberId="1"
                compact={true}
              />
            }
          />

          <KpiCard
            title="Clientes Fidelizados"
            value={currentKpiData.clients.value}
            trend={currentKpiData.clients.trend}
            footnote={currentKpiData.clients.footnote}
            sparklineData={clientsSparklineDataByBarber[barberFilter]}
            rightElement={
              <BarbersFilterToggle
                value={barberFilter}
                onValueChange={setBarberFilter}
                currentBarberId="1"
                compact={true}
              />
            }
          />
        </div>

        {/* Barbeiros Ativos Section */}
        <div className="mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-xl">Barbeiros Ativos</CardTitle>
                <CardDescription>
                  {activeBarbers.length} barbeiros ativos na equipe
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm"
                onClick={() => navigate('/admin/barbeiros')}
              >
                <Users className="h-4 w-4 mr-2" />
                Gerir Barbeiros
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {isLoading ? (
                  <div className="w-full text-center py-4">Carregando barbeiros...</div>
                ) : activeBarbers.length > 0 ? (
                  activeBarbers.map((barber) => (
                    <Card key={barber.id} className="w-full md:w-[calc(33.333%-1rem)] bg-white border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12 border-2 border-navalha-gold">
                            <AvatarImage src={barber.photoUrl} alt={barber.name} />
                            <AvatarFallback>{barber.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-lg">{barber.name}</h3>
                            <p className="text-sm text-gray-500">{barber.specialties.join(", ")}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                            Ativo
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => navigate(`/admin/barbeiros?edit=${barber.id}`)}
                            className="h-8 text-sm"
                          >
                            Ver Perfil
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="w-full text-center py-4">
                    Não há barbeiros ativos. <Button variant="link" onClick={() => navigate('/admin/barbeiros')}>Adicionar barbeiros</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Individual Barber Calendars */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Calendários e Agendamentos por Barbeiro</h2>
          
          {isLoading ? (
            <div className="w-full text-center py-4">Carregando calendários...</div>
          ) : activeBarbers.length > 0 ? (
            activeBarbers.map((barber) => (
              <div key={barber.id} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={barber.photoUrl} alt={barber.name} />
                    <AvatarFallback>{barber.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {barber.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <KpiCard
                    title="Serviços Hoje"
                    value={individualBarberKPIData[barber.id]?.services.value || "0"}
                    trend={individualBarberKPIData[barber.id]?.services.trend}
                    footnote={individualBarberKPIData[barber.id]?.services.footnote}
                    sparklineData={servicesSparklineDataByBarber.self}
                  />
                  <KpiCard
                    title="Faturação Mensal"
                    value={individualBarberKPIData[barber.id]?.billing.value || "0€"}
                    trend={individualBarberKPIData[barber.id]?.billing.trend}
                    footnote={individualBarberKPIData[barber.id]?.billing.footnote}
                    sparklineData={billingSparklineDataByBarber.self}
                    isPrivate={!showBilling}
                    onToggleVisibility={() => setShowBilling(!showBilling)}
                  />
                </div>
                <BarberCalendar 
                  barber={barber}
                  appointments={getBarberAppointments(barber.id)}
                />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-4">
              Não há barbeiros ativos. <Button variant="link" onClick={() => navigate('/admin/barbeiros')}>Adicionar barbeiros</Button>
            </div>
          )}
        </div>

        {/* Admin Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/services')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Serviços
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Gerir serviços, preços e disponibilidade
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/products')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Produtos
              </CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Gerir inventário de produtos e vendas
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/company')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Empresa
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Editar informações da empresa e definições
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Estatísticas de Serviços</h2>
            <BarbersFilterToggle
              value={barberFilter}
              onValueChange={setBarberFilter}
              currentBarberId="1"
              compact={false}
            />
          </div>
          
          <Tabs defaultValue="daily" onValueChange={setPeriod}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="daily">Diário</TabsTrigger>
              <TabsTrigger value="monthly">Mensal</TabsTrigger>
              <TabsTrigger value="yearly">Anual</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily">
              <Card className="mb-12">
                <CardHeader>
                  <CardTitle>Serviços - Última Semana</CardTitle>
                  <CardDescription>
                    Distribuição de serviços por dia da semana
                    {barberFilter === "self" ? " (somente meus atendimentos)" : " (todos os barbeiros)"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-auto">
                  <ChartContainer
                    config={{
                      corte: { label: "Cortes", color: "#9b87f5" },
                      barba: { label: "Barbas", color: "#7E69AB" },
                      total: { label: "Total", color: "#1A1F2C" },
                    }}
                  >
                    <BarChart data={currentDailyData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="corte" fill="#9b87f5" name="Cortes" />
                      <Bar dataKey="barba" fill="#7E69AB" name="Barbas" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="monthly">
              <Card className="mb-12">
                <CardHeader>
                  <CardTitle>Serviços - Este Ano</CardTitle>
                  <CardDescription>
                    Distribuição de serviços por mês
                    {barberFilter === "self" ? " (somente meus atendimentos)" : " (todos os barbeiros)"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-auto">
                  <ChartContainer
                    config={{
                      corte: { label: "Cortes", color: "#9b87f5" },
                      barba: { label: "Barbas", color: "#7E69AB" },
                      total: { label: "Total", color: "#1A1F2C" },
                    }}
                  >
                    <LineChart data={currentMonthlyData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="corte" stroke="#9b87f5" name="Cortes" />
                      <Line type="monotone" dataKey="barba" stroke="#7E69AB" name="Barbas" />
                      <Line type="monotone" dataKey="total" stroke="#1A1F2C" name="Total" />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="yearly">
              <Card className="mb-12">
                <CardHeader>
                  <CardTitle>Serviços - Histórico Anual</CardTitle>
                  <CardDescription>
                    Evolução de serviços por ano
                    {barberFilter === "self" ? " (somente meus atendimentos)" : " (todos os barbeiros)"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-auto">
                  <ChartContainer
                    config={{
                      corte: { label: "Cortes", color: "#9b87f5" },
                      barba: { label: "Barbas", color: "#7E69AB" },
                      total: { label: "Total", color: "#1A1F2C" },
                    }}
                  >
                    <BarChart data={currentYearlyData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="corte" fill="#9b87f5" name="Cortes" />
                      <Bar dataKey="barba" fill="#7E69AB" name="Barbas" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Agendamentos Recentes</CardTitle>
                <CardDescription>
                  Últimos serviços agendados para hoje
                  {barberFilter === "self" ? " (somente meus atendimentos)" : ""}
                </CardDescription>
              </div>
              <BarbersFilterToggle
                value={barberFilter}
                onValueChange={setBarberFilter}
                currentBarberId="1"
                compact={true}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentAppointments.map((appointment, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{appointment.cliente}</TableCell>
                    <TableCell>{appointment.servico}</TableCell>
                    <TableCell>{appointment.data}</TableCell>
                    <TableCell>{appointment.hora}</TableCell>
                    <TableCell className="text-right">{appointment.valor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
