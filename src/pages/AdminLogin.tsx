
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Scissors } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        toast({
          title: "Login bem-sucedido",
          description: "A entrar no dashboard...",
          variant: "default",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Erro de autenticação",
          description: "Nome de utilizador ou palavra-passe incorretos.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md mx-4 shadow-lg">
        <CardHeader className="space-y-1 text-center bg-navalha-gold text-black py-6">
          <div className="flex justify-center mb-2">
            <Scissors className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl">Clube da Navalha</CardTitle>
          <CardDescription className="text-gray-700">
            Acesso à área de administração
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Nome de utilizador
              </label>
              <Input
                id="username"
                placeholder="Insira o seu nome de utilizador"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Palavra-passe
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Insira a sua palavra-passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-navalha-burgundy hover:bg-navalha-black text-white"
              disabled={isLoading}
            >
              {isLoading ? "A autenticar..." : "Entrar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
