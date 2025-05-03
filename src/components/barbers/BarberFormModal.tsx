
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MultiSelect } from "@/components/ui/multi-select";
import { Barber, BarberFormData } from "@/types/barber";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface BarberFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  barber?: Barber | null;
  onSubmit: (data: BarberFormData, barberId?: string) => void;
  isSubmitting?: boolean;
}

const specialtyOptions = [
  { label: "Corte Masculino", value: "corte-masculino" },
  { label: "Barba", value: "barba" },
  { label: "Coloração", value: "coloracao" },
  { label: "Tratamento Capilar", value: "tratamento-capilar" },
  { label: "Relaxamento", value: "relaxamento" },
  { label: "Design de Sobrancelhas", value: "design-sobrancelhas" },
];

export function BarberFormModal({ 
  open, 
  onOpenChange, 
  barber, 
  onSubmit, 
  isSubmitting = false 
}: BarberFormModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal opens/closes or barber changes
  useEffect(() => {
    if (open && barber) {
      setName(barber.name);
      setEmail(barber.email);
      setPhone(barber.phone);
      setSpecialties(barber.specialties);
      setStatus(barber.status);
      setPassword("");
      setPhoto(null);
      setPreviewUrl(barber.photoUrl);
      setErrors({});
    } else if (open && !barber) {
      // New barber - reset form
      setName("");
      setEmail("");
      setPhone("");
      setSpecialties([]);
      setStatus("active");
      setPassword("");
      setPhoto(null);
      setPreviewUrl("");
      setErrors({});
    }
  }, [open, barber]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
      toast.error("Formato de imagem inválido. Use JPEG, PNG ou WebP.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast.error("A imagem deve ter menos de 5MB");
      return;
    }

    setPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = "Nome é obrigatório";
    if (!email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "E-mail inválido";
    
    if (!phone.trim()) newErrors.phone = "Telefone é obrigatório";
    if (specialties.length === 0) newErrors.specialties = "Selecione pelo menos uma especialidade";
    
    if (!barber && !password) newErrors.password = "Senha é obrigatória para novos barbeiros";
    else if (password && password.length < 6) newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    
    if (!barber && !photo && !previewUrl) newErrors.photo = "Foto é obrigatória";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    // Different data structure based on whether we're updating or creating
    if (barber) {
      // Update existing barber
      const updateData: BarberFormData = {
        name: name,
        email: email,
        phone: phone,
        specialties: specialties,
        status: status,
      };
      
      if (photo) updateData.photo = photo;
      if (password) updateData.password = password;
      
      onSubmit(updateData, barber.id);
    } else {
      // Create new barber
      const createData: BarberFormData = {
        name: name,
        email: email,
        phone: phone,
        specialties: specialties,
        status: status,
        password: password,
      };
      
      if (photo) createData.photo = photo;
      
      onSubmit(createData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {barber ? "Editar Barbeiro" : "Adicionar Novo Barbeiro"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24 border-2 border-neutral-200">
                <AvatarImage src={previewUrl} alt={name} />
                <AvatarFallback className="text-lg bg-navalha-burgundy text-white">
                  {name ? name.substring(0, 2).toUpperCase() : "BB"}
                </AvatarFallback>
              </Avatar>
              <Button 
                type="button"
                variant="outline" 
                size="icon"
                className="absolute bottom-0 right-0 rounded-full w-8 h-8 shadow-md"
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                +
              </Button>
            </div>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {errors.photo && <span className="text-xs text-red-500">{errors.photo}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha {barber && "(deixe em branco para não alterar)"}</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="specialties">Especialidades</Label>
              <MultiSelect
                id="specialties"
                options={specialtyOptions}
                selectedValues={specialties}
                onChange={setSpecialties}
                className={errors.specialties ? "border-red-500" : ""}
              />
              {errors.specialties && <span className="text-xs text-red-500">{errors.specialties}</span>}
              <div className="flex flex-wrap gap-2 mt-2">
                {specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline">
                    {specialtyOptions.find(opt => opt.value === specialty)?.label || specialty}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                id="status" 
                checked={status === "active"} 
                onCheckedChange={(checked) => setStatus(checked ? "active" : "inactive")}
              />
              <Label htmlFor="status">Barbeiro Ativo</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)} 
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-navalha-gold hover:bg-navalha-gold/90 text-black"
          >
            {isSubmitting ? "Salvando..." : barber ? "Salvar Alterações" : "Adicionar Barbeiro"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
