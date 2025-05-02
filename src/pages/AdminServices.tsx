
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Scissors, ArrowLeft, Pencil, Trash2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

// Define the form schema for services
const serviceSchema = z.object({
  title: z.string().min(3, { message: "O nome do serviço deve ter pelo menos 3 caracteres" }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  price: z.string().regex(/^\d+€$/, { message: "O preço deve estar no formato '00€'" }),
  duration: z.string().regex(/^\d+ min$/, { message: "A duração deve estar no formato '00 min'" }),
  imagePath: z.string().url({ message: "Insira um URL de imagem válido" }),
  featured: z.boolean().optional(),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

// Mock data for services (in a real app this would come from a database)
const initialServices = [
  {
    id: "1",
    title: "Corte de Cabelo",
    description: "Corte moderno executado com perícia e precisão, inclui lavagem e styling.",
    price: "15€",
    duration: "30 min",
    imagePath: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    featured: false
  },
  {
    id: "2",
    title: "Corte + Barba",
    description: "Combinação perfeita de corte de cabelo e aparagem de barba com toalha quente.",
    price: "25€",
    duration: "60 min",
    imagePath: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    featured: true
  },
  {
    id: "3",
    title: "Barba",
    description: "Tratamento completo de barba com toalha quente, óleos essenciais e aparagem.",
    price: "12€",
    duration: "30 min",
    imagePath: "https://images.unsplash.com/photo-1593702288056-7056d12307fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    featured: false
  },
];

const AdminServices = () => {
  const [services, setServices] = useState(initialServices);
  const [editingService, setEditingService] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      duration: "",
      imagePath: "",
      featured: false
    }
  });

  const openNewServiceDialog = () => {
    form.reset();
    setEditingService(null);
    setIsDialogOpen(true);
  };

  const openEditServiceDialog = (service: any) => {
    form.reset({
      title: service.title,
      description: service.description,
      price: service.price,
      duration: service.duration,
      imagePath: service.imagePath,
      featured: service.featured || false,
    });
    setEditingService(service);
    setIsDialogOpen(true);
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Serviço eliminado",
      description: "O serviço foi eliminado com sucesso"
    });
  };

  const onSubmit = (data: ServiceFormValues) => {
    if (editingService) {
      // Update existing service
      setServices(services.map(service => 
        service.id === editingService.id ? { ...service, ...data } : service
      ));
      toast({
        title: "Serviço atualizado",
        description: "O serviço foi atualizado com sucesso"
      });
    } else {
      // Add new service
      const newService = {
        id: Date.now().toString(),
        ...data
      };
      setServices([...services, newService]);
      toast({
        title: "Serviço adicionado",
        description: "O novo serviço foi adicionado com sucesso"
      });
    }
    
    setIsDialogOpen(false);
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
            onClick={() => navigate("/admin/dashboard")}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar ao Dashboard
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Gestão de Serviços</CardTitle>
              <CardDescription>
                Adicione, edite ou remova serviços da barbearia
              </CardDescription>
            </div>
            <Button onClick={openNewServiceDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Serviço
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Destaque</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>{service.duration}</TableCell>
                    <TableCell>{service.featured ? "Sim" : "Não"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openEditServiceDialog(service)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Editar Serviço" : "Adicionar Novo Serviço"}
            </DialogTitle>
            <DialogDescription>
              Preencha os detalhes do serviço abaixo.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Serviço</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Corte de Cabelo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 15€" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duração</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 30 min" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Descreva o serviço..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imagePath"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL da Imagem</FormLabel>
                    <FormControl>
                      <Input placeholder="https://exemplo.com/imagem.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Serviço em Destaque</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Marque esta opção para destacar este serviço
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">
                  {editingService ? "Guardar Alterações" : "Adicionar Serviço"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
