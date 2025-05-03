
import { useState } from "react";
import Image from "./ui/image";
import { useBarbers } from "@/hooks/use-barbers";
import { Card, CardContent } from "./ui/card";

type BarberSelectionProps = {
  selectedBarberId: string | null;
  onSelect: (barberId: string) => void;
};

export const BarberSelection = ({
  selectedBarberId,
  onSelect,
}: BarberSelectionProps) => {
  const { barbers, isLoading } = useBarbers();
  const activeBarbers = barbers.filter(barber => barber.status === "active");

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Escolhe o teu barbeiro preferido</h3>
      
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-pulse h-32 w-full bg-gray-200 rounded-md"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeBarbers.map((barber) => (
            <Card 
              key={barber.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedBarberId === barber.id 
                  ? "ring-2 ring-navalha-gold border-navalha-gold" 
                  : "hover:border-gray-300"
              }`}
              onClick={() => onSelect(barber.id)}
            >
              <CardContent className="flex flex-col items-center p-4">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                  <Image 
                    src={barber.photoUrl} 
                    alt={barber.name}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <h4 className="font-semibold text-center">{barber.name}</h4>
                <p className="text-sm text-gray-500 text-center">
                  {barber.specialties.join(", ")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
