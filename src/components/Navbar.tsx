
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background text-foreground border-b py-4 px-6 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-foreground font-bold text-2xl">Clube da Navalha</span>
          </Link>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Início
          </Link>
          <Link to="/servicos" className="text-muted-foreground hover:text-foreground transition-colors">
            Serviços
          </Link>
          <Link to="/agendamento" className="text-muted-foreground hover:text-foreground transition-colors">
            Agendamento
          </Link>
          <Link to="/admin/login" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <UserRound size={18} />
            Login
          </Link>
          <Button asChild>
            <Link to="/agendamento">Marcar Agora</Link>
          </Button>
        </nav>

        {/* Menu Mobile Button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-background border-t mt-2 py-4">
          <div className="container mx-auto flex flex-col space-y-4 px-6">
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/servicos" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link 
              to="/agendamento" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Agendamento
            </Link>
            <Link 
              to="/admin/login" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2 flex items-center gap-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserRound size={18} />
              Login
            </Link>
            <Button className="w-full" asChild>
              <Link to="/agendamento" onClick={() => setIsMenuOpen(false)}>Marcar Agora</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};
