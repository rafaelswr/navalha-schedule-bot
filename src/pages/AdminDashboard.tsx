
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Scissors, Calendar, UsersIcon, LogOut } from "lucide-react";

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

// Recent appointments data
const recentAppointments = [
  { cliente: "João Silva", servico: "Corte + Barba", data: "02/05/2025", hora: "10:00", valor: "25€" },
  { cliente: "Manuel Costa", servico: "Barba", data: "02/05/2025", hora: "11:00", valor: "12€" },
  { cliente: "António Ferreira", servico: "Corte de Cabelo", data: "02/05/2025", hora: "12:00", valor: "15€" },
  { cliente: "Pedro Santos", servico: "Tratamento Facial", data: "02/05/2025", hora: "14:00", valor: "20€" },
  { cliente: "Carlos Lopes", servico: "Pacote Premium", data: "02/05/2025", hora: "15:30", valor: "40€" },
];

const AdminDashboard = () => {
  const [period, setPeriod] = useState("daily");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/barbalogin");
  };

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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Serviços Hoje</CardTitle>
              <div className="flex items-baseline justify-between">
                <CardDescription className="text-3xl font-bold">23</CardDescription>
                <CardDescription className="text-emerald-500 text-sm font-medium">+15% vs ontem</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                15 cortes / 8 barbas
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Faturação Mensal</CardTitle>
              <div className="flex items-baseline justify-between">
                <CardDescription className="text-3xl font-bold">3.450€</CardDescription>
                <CardDescription className="text-emerald-500 text-sm font-medium">+8% vs mês anterior</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Média diária: 115€
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Clientes Fidelizados</CardTitle>
              <div className="flex items-baseline justify-between">
                <CardDescription className="text-3xl font-bold">128</CardDescription>
                <CardDescription className="text-emerald-500 text-sm font-medium">+12 novos este mês</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                78% taxa de retorno
              </div>
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
            <Card className="mb-8"> {/* Added margin-bottom to create space */}
              <CardHeader>
                <CardTitle>Serviços - Última Semana</CardTitle>
                <CardDescription>
                  Distribuição de serviços por dia da semana
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]"> {/* Fixed height to prevent overflow */}
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
            <Card className="mb-8"> {/* Added margin-bottom to create space */}
              <CardHeader>
                <CardTitle>Serviços - Este Ano</CardTitle>
                <CardDescription>
                  Distribuição de serviços por mês
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]"> {/* Fixed height to prevent overflow */}
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
            <Card className="mb-8"> {/* Added margin-bottom to create space */}
              <CardHeader>
                <CardTitle>Serviços - Histórico Anual</CardTitle>
                <CardDescription>
                  Evolução de serviços por ano
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]"> {/* Fixed height to prevent overflow */}
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
