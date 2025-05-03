import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import Index from "./pages";
import Servicos from "./pages/servicos";
import Agendamento from "./pages/agendamento";
import Loja from "./pages/loja";
import Contactos from "./pages/contactos";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBarbers from "./pages/AdminBarbers";
import AdminServices from "./pages/AdminServices";
import AdminProducts from "./pages/AdminProducts";
import AdminCompany from "./pages/AdminCompany";
import NotFound from "./pages/NotFound";
import ShopDashboard from "./pages/ShopDashboard";
import BarberDashboard from "./pages/BarberDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/agendamento" element={<Agendamento />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="shop-dashboard" element={<ShopDashboard />} />
          <Route path="barber/:barberId" element={<BarberDashboard />} />
          <Route path="barbeiros" element={<AdminBarbers />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="company" element={<AdminCompany />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
