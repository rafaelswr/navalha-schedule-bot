
import { useState } from "react";
import { useBarberFilter } from "@/hooks/use-barber-filter";
import { useBarbers } from "@/hooks/use-barbers";
import { Barber, BarberFormData } from "@/types/barber";
import { BarberTable } from "@/components/barbers/BarberTable";
import { BarberFormModal } from "@/components/barbers/BarberFormModal";
import { DeleteConfirmationDialog } from "@/components/barbers/DeleteConfirmationDialog";
import { BarbersFilterToggle } from "@/components/ui/barbers-filter-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";

export default function AdminBarbers() {
  const [barberFilter, setBarberFilter] = useBarberFilter(); // Reusa o filtro global
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);

  // Determina qual opção de filtro usar para a consulta de barbeiros
  const options = barberFilter === "self" ? { barberId: "1" } : undefined; // "1" é o ID do barbeiro logado (mockado)
  const { 
    barbers, 
    isLoading, 
    createBarber, 
    updateBarber, 
    updateBarberStatus, 
    deleteBarber,
    currentUserId
  } = useBarbers(options);

  // Filtra barbeiros pelo termo de busca
  const filteredBarbers = barbers.filter(barber => {
    const searchLower = searchTerm.toLowerCase();
    return (
      barber.name.toLowerCase().includes(searchLower) ||
      barber.specialties.some(specialty => specialty.toLowerCase().includes(searchLower))
    );
  });

  // Handlers
  const handleNewBarber = () => {
    setSelectedBarber(null);
    setIsFormModalOpen(true);
  };

  const handleEditBarber = (barber: Barber) => {
    setSelectedBarber(barber);
    setIsFormModalOpen(true);
  };

  const handleDeleteBarber = (barber: Barber) => {
    setSelectedBarber(barber);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBarber) {
      deleteBarber.mutate(selectedBarber.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleFormSubmit = (data: BarberFormData) => {
    if (selectedBarber) {
      // Atualiza barbeiro existente
      updateBarber.mutate({ id: selectedBarber.id, data });
    } else {
      // Cria novo barbeiro
      createBarber.mutate(data);
    }
  };

  const handleStatusChange = (barber: Barber, status: "active" | "inactive") => {
    updateBarberStatus.mutate({ id: barber.id, status });
  };

  return (
    <div className="container mx-auto">
      {/* Page header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Barbeiros Cadastrados</h1>
          <p className="text-muted-foreground">
            Gerencie os profissionais da sua barbearia
          </p>
        </div>

        {/* Filter toggle - reusa o componente existente */}
        <div className="mt-4 md:mt-0 self-end">
          <BarbersFilterToggle
            value={barberFilter}
            onValueChange={setBarberFilter}
            currentBarberId={currentUserId}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou especialidade..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleNewBarber}>
          <UserPlus className="mr-2 h-4 w-4" />
          <span>Novo Barbeiro</span>
        </Button>
      </div>

      {/* Barbers Table */}
      <BarberTable
        barbers={filteredBarbers}
        onEdit={handleEditBarber}
        onDelete={handleDeleteBarber}
        onStatusChange={handleStatusChange}
        isLoading={isLoading}
        filteredByCurrentUser={barberFilter === "self"}
      />

      {/* Modals */}
      <BarberFormModal
        open={isFormModalOpen}
        onOpenChange={setIsFormModalOpen}
        onSubmit={handleFormSubmit}
        barber={selectedBarber || undefined}
      />

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        barber={selectedBarber}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
