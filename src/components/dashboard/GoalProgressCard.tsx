
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface GoalProgressCardProps {
  title: string;
  current: number;
  target: number;
  type?: 'revenue' | 'services';
  className?: string;
  formatValue?: (value: number) => string;
}

export const GoalProgressCard = ({ 
  title, 
  current, 
  target, 
  type = 'revenue', 
  className,
  formatValue = (val) => type === 'revenue' ? `${val.toLocaleString()}€` : val.toString()
}: GoalProgressCardProps) => {
  const percentage = Math.min(100, Math.round((current / target) * 100));
  const remaining = target - current;
  const isCompleted = current >= target;

  let statusColor = 'bg-yellow-500';
  if (percentage >= 80) statusColor = 'bg-green-500';
  else if (percentage < 40) statusColor = 'bg-red-500';

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Progresso</span>
          <span className="font-semibold">{percentage}%</span>
        </div>
        
        <Progress 
          value={percentage} 
          className={cn("h-2", statusColor)}
        />
        
        <div className="flex justify-between items-center text-sm">
          <div>
            <div className="font-medium">{formatValue(current)}</div>
            <div className="text-xs text-muted-foreground">Atual</div>
          </div>
          
          <div className="text-right">
            <div className="font-medium">{formatValue(target)}</div>
            <div className="text-xs text-muted-foreground">Meta</div>
          </div>
        </div>
        
        {!isCompleted && (
          <div className={cn(
            "text-xs px-2 py-1 rounded-sm text-center",
            percentage < 40 ? "bg-red-50 text-red-700" :
            percentage < 80 ? "bg-yellow-50 text-yellow-700" :
            "bg-green-50 text-green-700"
          )}>
            {type === 'revenue' ? `Faltam ${formatValue(remaining)}` : `Faltam ${remaining} serviços`} para atingir a meta
          </div>
        )}
        
        {isCompleted && (
          <div className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-sm text-center">
            Meta atingida! Parabéns!
          </div>
        )}
      </CardContent>
    </Card>
  );
};
