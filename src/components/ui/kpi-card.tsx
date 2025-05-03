
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sparkline } from "@/components/ui/sparkline";
import { ArrowDown, ArrowUp, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface KpiCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  sparklineData?: Array<{ date: Date; value: number }>;
  footnote?: string;
  className?: string;
  isPrivate?: boolean;
  onToggleVisibility?: () => void;
}

/**
 * KPI Card Component
 * 
 * A card component for displaying key performance indicators with optional sparkline trend visualization.
 * 
 * @param {KpiCardProps} props - The component props
 * @returns React component
 */
export const KpiCard = ({
  title,
  value,
  description,
  trend,
  sparklineData,
  footnote,
  className,
  isPrivate = false,
  onToggleVisibility,
}: KpiCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
          <span>{title}</span>
          {onToggleVisibility && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 rounded-full"
              onClick={onToggleVisibility}
            >
              {isPrivate ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          )}
        </CardTitle>
        <div className="flex items-baseline justify-between">
          <CardDescription className="text-3xl font-bold">
            {isPrivate ? "****" : value}
          </CardDescription>
          {trend && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CardDescription 
                    className={cn(
                      "text-sm font-medium flex items-center",
                      trend.isPositive ? "text-emerald-500" : "text-red-500"
                    )}
                  >
                    {trend.isPositive ? (
                      <ArrowUp className="h-3 w-3 mr-0.5" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-0.5" />
                    )}
                    {isPrivate ? "**" : trend.value}%
                  </CardDescription>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{trend.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {footnote && (
          <div className="text-xs text-muted-foreground mb-2">
            {isPrivate ? "Dados protegidos" : footnote}
          </div>
        )}
        {sparklineData && sparklineData.length > 0 && (
          <div className="pt-1">
            <Sparkline 
              data={sparklineData} 
              height={24}
              tooltipEnabled={true}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
