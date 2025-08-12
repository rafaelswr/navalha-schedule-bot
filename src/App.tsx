
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

// Import existing pages
import Index from "./pages/Index";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBarbers from "./pages/AdminBarbers";
import AdminServices from "./pages/AdminServices";

import AdminCompany from "./pages/AdminCompany";

import BarberDashboard from "./pages/BarberDashboard";
import Servicos from "./pages/Servicos";

import Agendamento from "./pages/Agendamento";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicos" element={<Servicos />} />
          
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            
            <Route path="barber/:barberId" element={<BarberDashboard />} />
            <Route path="barbeiros" element={<AdminBarbers />} />
            <Route path="services" element={<AdminServices />} />
            
            <Route path="company" element={<AdminCompany />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
