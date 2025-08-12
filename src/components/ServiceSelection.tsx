
import { Card, CardContent } from "./ui/card";

type Service = {
  id: string;
  name: string;
  duration: string;
  price: string;
};

type ServiceSelectionProps = {
  selectedServiceId: string | null;
  onSelect: (serviceId: string) => void;
};

// Mock services data - in a real app, this could come from an API or store
const services: Service[] = [
  { id: "corte", name: "Corte de Cabelo", duration: "30 min", price: "18€" },
  { id: "barba", name: "Barba", duration: "20 min", price: "12€" },
  { id: "combo", name: "Corte + Barba", duration: "45 min", price: "25€" },
  { id: "premium", name: "Tratamento Premium", duration: "60 min", price: "35€" },
];

export const ServiceSelection = ({
  selectedServiceId,
  onSelect,
}: ServiceSelectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Escolhe o serviço desejado</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card 
            key={service.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedServiceId === service.id 
                ? "ring-2 ring-navalha-gold border-navalha-gold" 
                : "hover:border-gray-300"
            }`}
            onClick={() => onSelect(service.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{service.name}</h4>
                  <p className="text-sm text-gray-500">{service.duration}</p>
                </div>
                <div className="text-lg font-bold text-foreground">
                  {service.price}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
