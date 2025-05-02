
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scissors, ArrowLeft, Building, MapPin, Clock, Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useCompanyStore } from "@/store/companyStore";
import { Separator } from "@/components/ui/separator";
import { GoogleMap } from "@/components/GoogleMap";

// Define the form schemas
const contactInfoSchema = z.object({
  name: z.string().min(3, { message: "O nome da empresa é obrigatório" }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  address: z.string().min(3, { message: "O endereço é obrigatório" }),
  city: z.string().min(2, { message: "A cidade é obrigatória" }),
  postalCode: z.string().min(4, { message: "O código postal é obrigatório" }),
  country: z.string().min(2, { message: "O país é obrigatório" }),
  phone: z.string().min(9, { message: "O telefone é obrigatório" }),
  email: z.string().email({ message: "Insira um email válido" }),
});

const workHoursSchema = z.object({
  weekdays: z.string().min(1, { message: "O horário é obrigatório" }),
  saturday: z.string().min(1, { message: "O horário é obrigatório" }),
  sunday: z.string().min(1, { message: "O horário é obrigatório" }),
  monday: z.string().min(1, { message: "O horário é obrigatório" }),
});

const socialMediaSchema = z.object({
  facebook: z.string().url({ message: "Insira um URL válido" }),
  instagram: z.string().url({ message: "Insira um URL válido" }),
  twitter: z.string().url({ message: "Insira um URL válido" }),
});

type ContactInfoFormValues = z.infer<typeof contactInfoSchema>;
type WorkHoursFormValues = z.infer<typeof workHoursSchema>;
type SocialMediaFormValues = z.infer<typeof socialMediaSchema>;

const AdminCompany = () => {
  const { info, updateInfo, updateSocialMedia, updateWorkHours, updateLocation } = useCompanyStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");
  
  // Contact Info Form
  const contactInfoForm = useForm<ContactInfoFormValues>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      name: info.name,
      description: info.description,
      address: info.address,
      city: info.city,
      postalCode: info.postalCode,
      country: info.country,
      phone: info.phone,
      email: info.email,
    }
  });

  // Work Hours Form
  const workHoursForm = useForm<WorkHoursFormValues>({
    resolver: zodResolver(workHoursSchema),
    defaultValues: {
      weekdays: info.workHours.weekdays,
      saturday: info.workHours.saturday,
      sunday: info.workHours.sunday,
      monday: info.workHours.monday,
    }
  });

  // Social Media Form
  const socialMediaForm = useForm<SocialMediaFormValues>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      facebook: info.socialMedia.facebook,
      instagram: info.socialMedia.instagram,
      twitter: info.socialMedia.twitter,
    }
  });

  // Form submission handlers
  const onContactInfoSubmit = (data: ContactInfoFormValues) => {
    updateInfo(data);
    toast({
      title: "Informações atualizadas",
      description: "As informações da empresa foram atualizadas com sucesso",
    });
  };

  const onWorkHoursSubmit = (data: WorkHoursFormValues) => {
    updateWorkHours(data);
    toast({
      title: "Horário atualizado",
      description: "O horário de funcionamento foi atualizado com sucesso",
    });
  };

  const onSocialMediaSubmit = (data: SocialMediaFormValues) => {
    updateSocialMedia(data);
    toast({
      title: "Redes sociais atualizadas",
      description: "Os links para redes sociais foram atualizados com sucesso",
    });
  };

  const handleLocationUpdate = (lat: number, lng: number) => {
    updateLocation({ lat, lng });
    toast({
      title: "Localização atualizada",
      description: "A localização da empresa foi atualizada com sucesso",
    });
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
          <CardHeader>
            <CardTitle>Informações da Empresa</CardTitle>
            <CardDescription>
              Gerencie as informações de contacto, horário e localização da sua barbearia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="info" className="flex items-center gap-2">
                  <Building className="h-4 w-4" /> Dados Gerais
                </TabsTrigger>
                <TabsTrigger value="hours" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Horário
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Redes Sociais
                </TabsTrigger>
                <TabsTrigger value="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Localização
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="info">
                <Form {...contactInfoForm}>
                  <form onSubmit={contactInfoForm.handleSubmit(onContactInfoSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={contactInfoForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Empresa</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={contactInfoForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={contactInfoForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Separator className="my-4" />
                    <h3 className="text-lg font-medium mb-4">Endereço</h3>
                    
                    <FormField
                      control={contactInfoForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Morada</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={contactInfoForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={contactInfoForm.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Código Postal</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={contactInfoForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>País</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={contactInfoForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit">Guardar Alterações</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="hours">
                <Form {...workHoursForm}>
                  <form onSubmit={workHoursForm.handleSubmit(onWorkHoursSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={workHoursForm.control}
                        name="weekdays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Horário de Terça a Sexta</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: 10h - 19h" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={workHoursForm.control}
                        name="saturday"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Horário de Sábado</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: 10h - 19h" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={workHoursForm.control}
                        name="sunday"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Horário de Domingo</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Fechado" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={workHoursForm.control}
                        name="monday"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Horário de Segunda</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Fechado" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">Guardar Alterações</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="social">
                <Form {...socialMediaForm}>
                  <form onSubmit={socialMediaForm.handleSubmit(onSocialMediaSubmit)} className="space-y-4">
                    <FormField
                      control={socialMediaForm.control}
                      name="facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facebook</FormLabel>
                          <FormControl>
                            <Input placeholder="https://facebook.com/clubedanavalha" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={socialMediaForm.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <Input placeholder="https://instagram.com/clubedanavalha" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={socialMediaForm.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input placeholder="https://twitter.com/clubedanavalha" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit">Guardar Alterações</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="location">
                <div className="space-y-6">
                  <div className="h-[400px] rounded-md overflow-hidden">
                    <GoogleMap 
                      initialLat={info.location.lat} 
                      initialLng={info.location.lng} 
                      onLocationChange={handleLocationUpdate} 
                    />
                  </div>
                  <div className="flex justify-end">
                    <p className="text-sm text-muted-foreground">
                      Arraste o marcador para definir a localização exata da barbearia
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCompany;
