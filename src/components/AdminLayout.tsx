
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Scissors, Package, Users, Building } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
      isActive: currentPath === "/admin/dashboard",
    },
    {
      title: "Gestão de Serviços",
      icon: Scissors,
      path: "/admin/services",
      isActive: currentPath === "/admin/services",
    },
    {
      title: "Gestão de Produtos",
      icon: Package,
      path: "/admin/products",
      isActive: currentPath === "/admin/products",
    },
    {
      title: "Gestão de Barbeiros",
      icon: Users,
      path: "/admin/barbeiros",
      isActive: currentPath === "/admin/barbeiros",
    },
    {
      title: "Dados da Empresa",
      icon: Building,
      path: "/admin/company",
      isActive: currentPath === "/admin/company",
    },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="bg-navalha-black text-white">
          <SidebarHeader>
            <div className="p-2 flex items-center gap-2">
              <div className="text-navalha-gold font-bold text-xl">
                Clube da Navalha
              </div>
              <SidebarTrigger />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.title}
                  >
                    <Link 
                      to={item.path}
                      aria-current={item.isActive ? "page" : undefined}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-2 text-sm text-gray-400">
              Área Administrativa
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
