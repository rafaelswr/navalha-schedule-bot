
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Users, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type BarberFilterValue = "all" | "self";

interface BarbersFilterToggleProps {
  value: BarberFilterValue;
  onValueChange: (value: BarberFilterValue) => void;
  className?: string;
  currentBarberId?: string | number;
  compact?: boolean;
}

/**
 * Barbers Filter Toggle Component
 * 
 * Allows users to toggle between viewing data for all barbers or just themselves.
 * 
 * @param {BarbersFilterToggleProps} props - Component props
 * @returns React component
 */
export const BarbersFilterToggle = ({
  value,
  onValueChange,
  className,
  currentBarberId,
  compact = false,
}: BarbersFilterToggleProps) => {
  return (
    <div className={cn("flex items-center justify-end mb-2", className)}>
      <TooltipProvider>
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={(newValue) => {
            if (newValue) onValueChange(newValue as BarberFilterValue);
          }}
          className="border rounded-md"
          aria-label="Filtrar por barbeiro"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem 
                value="all"
                aria-label="Ver dados de todos os barbeiros"
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5",
                  compact && "px-2 py-1"
                )}
              >
                <Users className="h-4 w-4" />
                {!compact && <span>Todos os barbeiros</span>}
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>Exibe dados de todos os barbeiros</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem 
                value="self"
                aria-label="Ver apenas meus dados"
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5",
                  compact && "px-2 py-1"
                )}
              >
                <User className="h-4 w-4" />
                {!compact && <span>Somente eu</span>}
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>Exibe apenas meus dados</p>
            </TooltipContent>
          </Tooltip>
        </ToggleGroup>
      </TooltipProvider>
    </div>
  );
};

