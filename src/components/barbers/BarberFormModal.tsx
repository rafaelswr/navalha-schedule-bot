
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Barber, BarberFormData } from "@/types/barber";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Lista de especialidades disponíveis
const SPECIALTIES = [
  "Corte Clássico",
  "Corte Moderno",
  "Corte Feminino",
  "Barba",
  "Tratamentos Capilares",
  "Coloração",
  "Penteados",
];

// Schema para validação do formulário
const barberFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(8, { message: "Telefone deve ter pelo menos 8 caracteres" }),
  specialties: z.array(z.string()).min(1, { message: "Selecione pelo menos uma especialidade" }),
  status: z.enum(["active", "inactive"]),
  password: z.string().optional(),
});

interface BarberFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BarberFormData) => void;
  barber?: Barber;
}

export function BarberFormModal({
  open,
  onOpenChange,
  onSubmit,
  barber,
}: BarberFormModalProps) {
  const isEditing = !!barber;
  
  // Inicializa o formulário com react-hook-form e zod
  const form = useForm<z.infer<typeof barberFormSchema>>({
    resolver: zodResolver(barberFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialties: [],
      status: "active" as const,
      password: "",
    },
  });
  
  // Preenche o formulário quando estiver editando um barbeiro
  useEffect(() => {
    if (barber) {
      form.reset({
        name: barber.name,
        email: barber.email,
        phone: barber.phone,
        specialties: barber.specialties,
        status: barber.status,
        password: "", // Não preencher senha ao editar
      });
    } else {
      form.reset({
        name: "",
        email: "",
        phone: "",
        specialties: [],
        status: "active" as const,
        password: "",
      });
    }
  }, [barber, form]);
  
  // Função para lidar com o envio do formulário
  const handleSubmit = (data: z.infer<typeof barberFormSchema>) => {
    // Se a senha estiver vazia na edição, não inclua no payload
    if (isEditing && !data.password) {
      const { password, ...restData } = data;
      onSubmit({
        ...restData,
        photoUrl: barber?.photoUrl, // Mantém a foto atual ao editar
      });
    } else {
      onSubmit(data);
    }
    
    onOpenChange(false);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Barbeiro" : "Novo Barbeiro"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize os dados do barbeiro conforme necessário."
              : "Preencha os dados para adicionar um novo barbeiro."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Avatar preview */}
            {isEditing && (
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24 border-2 border-primary">
                  <AvatarImage src={barber?.photoUrl} alt={barber?.name} />
                  <AvatarFallback className="text-lg">{getInitials(barber?.name || "")}</AvatarFallback>
                </Avatar>
              </div>
            )}
            
            {/* Campo: Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do barbeiro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Campo: Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Campo: Telefone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Campo: Especialidades */}
            <FormField
              control={form.control}
              name="specialties"
              render={() => (
                <FormItem>
                  <FormLabel>Especialidades</FormLabel>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {SPECIALTIES.map((specialty) => (
                      <FormField
                        key={specialty}
                        control={form.control}
                        name="specialties"
                        render={({ field }) => (
                          <FormItem key={specialty} className="flex flex-row items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(specialty)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, specialty])
                                    : field.onChange(field.value?.filter((value) => value !== specialty));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer text-sm">
                              {specialty}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Campo: Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Status</FormLabel>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status-active"
                      checked={field.value === "active"}
                      onCheckedChange={(checked) => {
                        if (checked) field.onChange("active");
                        else field.onChange("inactive");
                      }}
                    />
                    <label
                      htmlFor="status-active"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Ativo
                    </label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Campo: Senha (opcional ao editar) */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEditing ? "Nova Senha (opcional)" : "Senha"}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={isEditing ? "Deixe em branco para manter" : "Digite a senha"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Campo: Upload de foto (mock) */}
            <FormItem>
              <FormLabel>Foto (Placeholder)</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" disabled className="cursor-not-allowed" />
              </FormControl>
              <p className="text-xs text-muted-foreground">
                Funcionalidade de upload simulada. Em um ambiente real, você poderia enviar imagens.
              </p>
            </FormItem>
            
            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {isEditing ? "Atualizar" : "Adicionar"} Barbeiro
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
