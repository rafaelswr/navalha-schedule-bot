import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pencil,
  Trash2,
  Search,
  X,
  Check,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Barber } from "@/types/barber";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

interface BarberTableProps {
  barbers: Barber[];
  onEdit: (barber: Barber) => void;
  onDelete: (barber: Barber) => void;
  onStatusChange: (barber: Barber, newStatus: "active" | "inactive") => void;
  isLoading?: boolean;
  filteredByCurrentUser?: boolean;
}

const ITEMS_PER_PAGE = 10;

export function BarberTable({
  barbers,
  onEdit,
  onDelete,
  onStatusChange,
  isLoading = false,
  filteredByCurrentUser = false,
}: BarberTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter barbers based on search term
  const filteredBarbers = barbers.filter(
    (barber) =>
      barber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barber.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredBarbers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBarbers = filteredBarbers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Handle pagination
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Get specialty label
  const getSpecialtyLabel = (specialty: string) => {
    const specialtyMap: Record<string, string> = {
      "corte-masculino": "Corte Masculino",
      "barba": "Barba",
      "coloracao": "Coloração",
      "tratamento-capilar": "Tratamento Capilar",
      "relaxamento": "Relaxamento",
      "design-sobrancelhas": "Design de Sobrancelhas",
    };

    return specialtyMap[specialty] || specialty;
  };

  // Show mobile card view for small screens
  const renderMobileCard = (barber: Barber) => (
    <Card key={barber.id} className="p-4 mb-4 md:hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-3">
            <AvatarImage src={barber.photoUrl} alt={barber.name} />
            <AvatarFallback className="bg-navalha-burgundy text-white">
              {barber.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{barber.name}</h3>
            <p className="text-sm text-gray-500">
              {barber.status === "active" ? (
                <Badge className="bg-green-500 hover:bg-green-600">Ativo</Badge>
              ) : (
                <Badge variant="outline">Inativo</Badge>
              )}
            </p>
          </div>
        </div>
        <Switch
          checked={barber.status === "active"}
          onCheckedChange={(checked) =>
            onStatusChange(barber, checked ? "active" : "inactive")
          }
        />
      </div>

      <div className="grid gap-2 text-sm">
        <div>
          <span className="font-semibold">Especialidades:</span>{" "}
          <div className="flex flex-wrap gap-1 mt-1">
            {barber.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {getSpecialtyLabel(specialty)}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <span className="font-semibold">Email:</span> {barber.email}
        </div>
        <div>
          <span className="font-semibold">Telefone:</span> {barber.phone}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(barber)}
          aria-label={`Editar ${barber.name}`}
        >
          <Pencil className="h-4 w-4 mr-1" /> Editar
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(barber)}
          aria-label={`Excluir ${barber.name}`}
        >
          <Trash2 className="h-4 w-4 mr-1" /> Excluir
        </Button>
      </div>
    </Card>
  );

  const renderDesktopTable = () => (
    <div className="hidden md:block rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Especialidades</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navalha-gold"></div>
                  <span className="mt-2">Carregando barbeiros...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : paginatedBarbers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <div className="flex flex-col items-center justify-center">
                  <X className="h-12 w-12 text-gray-400" />
                  <span className="mt-2 text-gray-500 font-medium">
                    {searchTerm
                      ? "Nenhum barbeiro encontrado para esta busca"
                      : filteredByCurrentUser
                      ? "Nenhum barbeiro disponível para este filtro"
                      : "Nenhum barbeiro cadastrado"}
                  </span>
                  {searchTerm && (
                    <Button
                      variant="link"
                      className="mt-2"
                      onClick={() => setSearchTerm("")}
                    >
                      Limpar busca
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            paginatedBarbers.map((barber) => (
              <TableRow key={barber.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={barber.photoUrl} alt={barber.name} />
                    <AvatarFallback className="bg-navalha-burgundy text-white">
                      {barber.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{barber.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {barber.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="secondary"
                        className="text-xs"
                      >
                        {getSpecialtyLabel(specialty)}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{barber.phone}</div>
                    <div className="text-gray-500">{barber.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={barber.status === "active"}
                      onCheckedChange={(checked) =>
                        onStatusChange(barber, checked ? "active" : "inactive")
                      }
                      aria-label={`Marcar como ${
                        barber.status === "active" ? "inativo" : "ativo"
                      }`}
                    />
                    {barber.status === "active" ? (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        Ativo
                      </Badge>
                    ) : (
                      <Badge variant="outline">Inativo</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(barber)}
                      aria-label={`Editar ${barber.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(barber)}
                      aria-label={`Excluir ${barber.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar por nome ou especialidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => setSearchTerm("")}
              aria-label="Limpar busca"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          Mostrando{" "}
          <span className="font-medium">
            {filteredBarbers.length > 0
              ? `${startIndex + 1}-${
                  Math.min(startIndex + ITEMS_PER_PAGE, filteredBarbers.length)
                }`
              : "0"}
          </span>{" "}
          de <span className="font-medium">{filteredBarbers.length}</span>{" "}
          barbeiros
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navalha-gold"></div>
            <span className="mt-2">Carregando barbeiros...</span>
          </div>
        ) : paginatedBarbers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <X className="h-12 w-12 text-gray-400" />
            <span className="mt-2 text-gray-500 font-medium text-center">
              {searchTerm
                ? "Nenhum barbeiro encontrado para esta busca"
                : filteredByCurrentUser
                ? "Nenhum barbeiro disponível para este filtro"
                : "Nenhum barbeiro cadastrado"}
            </span>
            {searchTerm && (
              <Button
                variant="link"
                className="mt-2"
                onClick={() => setSearchTerm("")}
              >
                Limpar busca
              </Button>
            )}
          </div>
        ) : (
          paginatedBarbers.map((barber) => renderMobileCard(barber))
        )}
      </div>

      {/* Desktop Table */}
      {renderDesktopTable()}

      {/* Pagination */}
      {filteredBarbers.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="hidden sm:flex"
            aria-label="Primeira página"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1 mx-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
              )
              .map((page, i, arr) => (
                <div key={page} className="flex items-center">
                  {i > 0 && arr[i - 1] !== page - 1 && (
                    <span className="px-1">...</span>
                  )}
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => goToPage(page)}
                    className="w-8 h-8"
                    aria-label={`Página ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </Button>
                </div>
              ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Próxima página"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="hidden sm:flex"
            aria-label="Última página"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
