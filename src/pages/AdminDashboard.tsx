import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Eye, EyeOff, Scissors, Calendar as CalendarIcon, UsersIcon, LogOut, Store, FileText, Building, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, isSameDay, addDays, subDays } from "date-fns";

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

// Mock recent appointments data
const recentAppointments = [
  { cliente: "Ricardo Santos", servico: "Corte + Barba", data: "02/05/2025", hora: "14:30", valor: "25€" },
  { cliente: "João Oliveira", servico: "Barba", data: "02/05/2025", hora: "15:30", valor: "12€" },
  { cliente: "Tiago Ferreira", servico: "Corte de Cabelo", data: "02/05/2025", hora: "16:30", valor: "15€" },
  { cliente: "André Martins", servico: "Pacote Premium", data: "02/05/2025", hora: "17:30", valor: "40€" },
];

// Mock appointments data
const appointmentsData = [
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
];

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

// Generate sparkline data sets
const servicesSparklineData = generateSparklineData(18, 5, "up");
const billingSparklineData = generateSparklineData(90, 15, "up");
const clientsSparklineData = generateSparklineData(120, 3, "up");

const AdminDashboard = () => {
  const [period, setPeriod] = useState("daily");
  const [date, setDate] = useState<Date>(new Date());
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [showBilling, setShowBilling] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/barbalogin");
  };

  const appointmentsForSelectedDate = appointmentsData.find(item => 
    isSameDay(item.date, date)
  )?.appointments || [];

  const handlePreviousMonth = () => {
    setCalendarMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCalendarMonth(prev => addMonths(prev, 1));
  };

  const daysWithAppointments = appointmentsData.map(item => item.date);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-navalha-black text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Scissors className="h-6 w-6 text-navalha-gold" />
            <h1 className="text-xl font-bold">Clube da Navalha | Admin</h1>
          </div>
          <Button 
            variant="ghost" 
            className="text-white hover:text-navalha-gold"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KpiCard
            title="Serviços Hoje"
            value="23"
            trend={{
              value: 15,
              label: "+15% vs ontem",
              isPositive: true
            }}
            footnote="15 cortes / 8 barbas"
            sparklineData={servicesSparklineData}
          />

          <KpiCard
            title="Faturação Mensal"
            value="3.450€"
            trend={{
              value: 8,
              label: "+8% vs mês anterior",
              isPositive: true
            }}
            footnote="Média diária: 115€"
            sparklineData={billingSparklineData}
            isPrivate={!showBilling}
            onToggleVisibility={() => setShowBilling(!showBilling)}
          />

          <KpiCard
            title="Clientes Fidelizados"
            value="128"
            trend={{
              value: 12,
              label: "+12 novos este mês",
              isPositive: true
            }}
            footnote="78% taxa de retorno"
            sparklineData={clientsSparklineData}
          />
        </div>

        {/* Calendar and Appointments Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle>Calendário</CardTitle>
                <div className="flex space-x-1">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 p-0"
                    onClick={handlePreviousMonth}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 p-0"
                    onClick={handleNextMonth}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                {format(calendarMonth, "MMMM yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                month={calendarMonth}
                className="p-3 pointer-events-auto"
                modifiers={{
                  hasAppointment: daysWithAppointments
                }}
                modifiersStyles={{
                  hasAppointment: { 
                    fontWeight: 'bold', 
                    backgroundColor: '#f8e3c5',
                    color: '#1f2937'
                  }
                }}
              />
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Agendamentos: {format(date, "dd/MM/yyyy")}</CardTitle>
              <CardDescription>
                {appointmentsForSelectedDate.length > 0 
                  ? `${appointmentsForSelectedDate.length} serviços agendados neste dia` 
                  : "Sem agendamentos para este dia"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {appointmentsForSelectedDate.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hora</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointmentsForSelectedDate.map((appointment, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{appointment.hora}</TableCell>
                        <TableCell>{appointment.cliente}</TableCell>
                        <TableCell>{appointment.servico}</TableCell>
                        <TableCell className="text-right">{appointment.valor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CalendarIcon className="h-12 w-12 text-gray-300 mb-2" />
                  <p className="text-gray-500">Não há agendamentos para mostrar neste dia</p>
                  <p className="text-gray-400 text-sm">Selecione outra data no calendário</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Admin Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => navigate("/admin/services")}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-navalha-burgundy" />
                <CardTitle>Gestão de Serviços</CardTitle>
              </div>
              <CardDescription>
                Adicione, edite ou remova serviços da barbearia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Gira os serviços exibidos na página principal e na página de serviços.</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => navigate("/admin/products")}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Store className="h-6 w-6 text-navalha-burgundy" />
                <CardTitle>Gestão de Produtos</CardTitle>
              </div>
              <CardDescription>
                Adicione, edite ou remova produtos da loja online
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Gira os produtos disponíveis na loja online do Clube da Navalha.</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => navigate("/admin/company")}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Building className="h-6 w-6 text-navalha-burgundy" />
                <CardTitle>Dados da Empresa</CardTitle>
              </div>
              <CardDescription>
                Gerencie as informações de contacto e localização
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Atualize endereço, contactos, redes sociais e localização no mapa.</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="daily" className="mb-8" onValueChange={setPeriod}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Estatísticas de Serviços</h2>
            <TabsList>
              <TabsTrigger value="daily">Diário</TabsTrigger>
              <TabsTrigger value="monthly">Mensal</TabsTrigger>
              <TabsTrigger value="yearly">Anual</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="daily">
            <Card className="mb-12"> {/* Increased margin-bottom from mb-8 to mb-12 */}
              <CardHeader>
                <CardTitle>Serviços - Última Semana</CardTitle>
                <CardDescription>
                  Distribuição de serviços por dia da semana
                </CardDescription>
              </CardHeader>
              <CardContent className="h-auto"> {/* Decreased height from 350px to 300px */}
                <ChartContainer
                  config={{
                    corte: { label: "Cortes", color: "#9b87f5" },
                    barba: { label: "Barbas", color: "#7E69AB" },
                    total: { label: "Total", color: "#1A1F2C" },
                  }}
                >
                  <BarChart data={dailyData}>
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
            <Card className="mb-12"> {/* Increased margin-bottom from mb-8 to mb-12 */}
              <CardHeader>
                <CardTitle>Serviços - Este Ano</CardTitle>
                <CardDescription>
                  Distribuição de serviços por mês
                </CardDescription>
              </CardHeader>
              <CardContent className="h-auto"> {/* Decreased height from 350px to 300px */}
                <ChartContainer
                  config={{
                    corte: { label: "Cortes", color: "#9b87f5" },
                    barba: { label: "Barbas", color: "#7E69AB" },
                    total: { label: "Total", color: "#1A1F2C" },
                  }}
                >
                  <LineChart data={monthlyData}>
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
            <Card className="mb-12"> {/* Increased margin-bottom from mb-8 to mb-12 */}
              <CardHeader>
                <CardTitle>Serviços - Histórico Anual</CardTitle>
                <CardDescription>
                  Evolução de serviços por ano
                </CardDescription>
              </CardHeader>
              <CardContent className="h-auto"> {/* Decreased height from 350px to 300px */}
                <ChartContainer
                  config={{
                    corte: { label: "Cortes", color: "#9b87f5" },
                    barba: { label: "Barbas", color: "#7E69AB" },
                    total: { label: "Total", color: "#1A1F2C" },
                  }}
                >
                  <BarChart data={yearlyData}>
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

        <Card>
          <CardHeader>
            <CardTitle>Agendamentos Recentes</CardTitle>
            <CardDescription>
              Últimos serviços agendados para hoje
            </CardDescription>
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
