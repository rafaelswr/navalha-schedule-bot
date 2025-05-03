
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Scissors, Package, Users, Building } from "lucide-react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";

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
    <div className="min-h-screen flex flex-col w-full bg-gray-50 text-lg leading-relaxed">
      <header className="w-full bg-navalha-black text-white py-2 px-4 shadow-md">
        <div className="container mx-auto max-w-8xl flex items-center justify-between">
          <div className="text-navalha-gold font-bold text-xl">
            Clube da Navalha
          </div>
          
          <Menubar className="border-none bg-transparent">
            {menuItems.map((item) => (
              <MenubarMenu key={item.path}>
                <MenubarTrigger 
                  className={`flex items-center gap-2 hover:bg-gray-700 hover:text-white transition-colors ${
                    item.isActive ? 'bg-gray-700 text-white' : 'text-gray-200'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </MenubarTrigger>
                <MenubarContent className="min-w-[8rem]">
                  <MenubarItem asChild>
                    <Link 
                      to={item.path}
                      className="flex items-center gap-2 cursor-pointer"
                      aria-current={item.isActive ? "page" : undefined}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            ))}
          </Menubar>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="container mx-auto max-w-8xl">
          {children}
        </div>
      </main>
    </div>
  );
}
