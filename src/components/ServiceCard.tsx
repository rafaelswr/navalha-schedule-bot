
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  featured?: boolean;
  imagePath?: string;
}

export const ServiceCard = ({
  title,
  description,
  price,
  duration,
  featured = false,
  imagePath
}: ServiceCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg",
      featured && "border-navalha-gold"
    )}>
      {imagePath && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={imagePath}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className={featured ? "bg-navalha-gold text-black" : ""}>
        <CardTitle>{title}</CardTitle>
        <CardDescription className={featured ? "text-gray-800" : ""}>
          <span className="font-semibold">{price}</span> • {duration}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          className={cn(
            "transition-colors",
            featured 
              ? "bg-navalha-burgundy hover:bg-navalha-black text-white"
              : "bg-navalha-gold hover:bg-navalha-burgundy text-black hover:text-white"
          )}
          asChild
        >
          <Link to="/agendamento">Marcar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
