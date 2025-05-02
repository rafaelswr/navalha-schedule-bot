
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  imagePath: string;
  category: string;
  featured?: boolean;
}

export const ProductCard = ({
  id,
  name,
  description,
  price,
  imagePath,
  category,
  featured = false,
}: ProductCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col",
      featured && "border-navalha-gold"
    )}>
      <div className="h-52 w-full overflow-hidden">
        <img
          src={imagePath}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className={featured ? "bg-navalha-gold text-black" : ""}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="mb-1">{name}</CardTitle>
            <CardDescription className={cn(
              "text-sm inline-block px-2 py-1 rounded-full", 
              featured ? "bg-black/10 text-black" : "bg-navalha-gold/10"
            )}>
              {category}
            </CardDescription>
          </div>
          <div className="text-lg font-bold">
            {price}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button 
          variant="outline"
          size="sm"
          className="text-gray-600 hover:text-navalha-burgundy"
        >
          Detalhes
        </Button>
        <Button 
          className={cn(
            "transition-colors",
            featured 
              ? "bg-navalha-burgundy hover:bg-navalha-black text-white"
              : "bg-navalha-gold hover:bg-navalha-burgundy text-black hover:text-white"
          )}
          size="sm"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Comprar
        </Button>
      </CardFooter>
    </Card>
  );
};
