
import { useState } from "react";
import { Barber } from "@/types/barber";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, Scissors } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BarberTableProps {
  barbers: Barber[];
  onEdit: (barber: Barber) => void;
  onDelete: (barber: Barber) => void;
  onStatusChange: (id: string, status: "active" | "inactive") => void;
  isLoading?: boolean;
}

export function BarberTable({
  barbers,
  onEdit,
  onDelete,
  onStatusChange,
  isLoading = false,
}: BarberTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Paginação
  const totalPages = Math.ceil(barbers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBarbers = barbers.slice(startIndex, endIndex);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48 w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (barbers.length === 0) {
    return (
      <div className="text-center py-8">
        <Scissors className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum barbeiro encontrado</h3>
        <p className="mt-1 text-sm text-gray-500">
          Adicione novos barbeiros para começar.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-md border overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Foto</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Especialidades</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBarbers.map((barber) => (
                <TableRow key={barber.id}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={barber.photoUrl} alt={barber.name} />
                      <AvatarFallback>{getInitials(barber.name)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{barber.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {barber.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{barber.email}</span>
                      <span className="text-xs text-muted-foreground">{barber.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={barber.status === "active"}
                        onCheckedChange={(checked) => {
                          onStatusChange(barber.id, checked ? "active" : "inactive");
                        }}
                        aria-label={`Status do barbeiro ${barber.name}`}
                      />
                      <span className={barber.status === "active" ? "text-green-600" : "text-red-600"}>
                        {barber.status === "active" ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(barber)}
                        aria-label={`Editar barbeiro ${barber.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onDelete(barber)}
                        aria-label={`Excluir barbeiro ${barber.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden divide-y">
          {currentBarbers.map((barber) => (
            <div key={barber.id} className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={barber.photoUrl} alt={barber.name} />
                  <AvatarFallback>{getInitials(barber.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{barber.name}</h3>
                  <p className="text-sm text-muted-foreground">{barber.email}</p>
                </div>
                <div className="ml-auto">
                  <Switch
                    checked={barber.status === "active"}
                    onCheckedChange={(checked) => {
                      onStatusChange(barber.id, checked ? "active" : "inactive");
                    }}
                    aria-label={`Status do barbeiro ${barber.name}`}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {barber.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm">{barber.phone}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(barber)}
                    aria-label={`Editar barbeiro ${barber.name}`}
                  >
                    <Pencil className="h-4 w-4 mr-1" /> Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(barber)}
                    aria-label={`Excluir barbeiro ${barber.name}`}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Excluir
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                aria-label="Ir para a página anterior"
              />
            </PaginationItem>
            
            {/* Primeira página */}
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationLink 
                  onClick={() => setCurrentPage(1)}
                  aria-label="Ir para a primeira página"
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            
            {/* Ellipsis se necessário */}
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            
            {/* Página anterior se não for a primeira */}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink 
                  onClick={() => setCurrentPage(currentPage - 1)}
                  aria-label={`Ir para a página ${currentPage - 1}`}
                >
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            
            {/* Página atual */}
            <PaginationItem>
              <PaginationLink 
                isActive 
                aria-label={`Página atual, página ${currentPage}`}
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            
            {/* Próxima página se não for a última */}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink 
                  onClick={() => setCurrentPage(currentPage + 1)}
                  aria-label={`Ir para a página ${currentPage + 1}`}
                >
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            
            {/* Ellipsis se necessário */}
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            
            {/* Última página */}
            {currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink 
                  onClick={() => setCurrentPage(totalPages)}
                  aria-label={`Ir para a última página, página ${totalPages}`}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                aria-label="Ir para a próxima página"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
