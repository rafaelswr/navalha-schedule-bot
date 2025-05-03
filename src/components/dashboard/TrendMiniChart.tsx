
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis } from "recharts";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface TrendMiniChartProps {
  title: string;
  data: number[];
  trend: "up" | "down" | "stable";
  trendValue: number;
  trendLabel: string;
  type?: "line" | "area";
  valueFormatter?: (value: number) => string;
  valueLabel?: string;
  className?: string;
}

export const TrendMiniChart = ({
  title,
  data,
  trend,
  trendValue,
  trendLabel,
  type = "line",
  valueFormatter = (val) => val.toString(),
  valueLabel,
  className,
}: TrendMiniChartProps) => {
  const chartData = data.map((value, index) => ({ 
    index, 
    value 
  }));
  
  const lastValue = data[data.length - 1];
  
  // Color based on trend
  const trendColor = trend === "up" 
    ? "text-green-500" 
    : trend === "down" 
      ? "text-red-500" 
      : "text-yellow-500";
  
  // Stroke color for chart
  const strokeColor = trend === "up" 
    ? "#22c55e" 
    : trend === "down" 
      ? "#ef4444" 
      : "#eab308";
  
  // Fill color for area chart
  const fillColor = trend === "up" 
    ? "rgba(34, 197, 94, 0.1)" 
    : trend === "down" 
      ? "rgba(239, 68, 68, 0.1)" 
      : "rgba(234, 179, 8, 0.1)";

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-bold">
            {valueFormatter(lastValue)}
            {valueLabel && <span className="text-xs text-muted-foreground ml-1">{valueLabel}</span>}
          </span>
          
          <span className={cn("flex items-center text-sm", trendColor)}>
            {trend === "up" ? (
              <ArrowUp className="h-3.5 w-3.5 mr-1" />
            ) : trend === "down" ? (
              <ArrowDown className="h-3.5 w-3.5 mr-1" />
            ) : null}
            {trendValue}%
          </span>
        </div>
        
        <div className="text-xs text-muted-foreground">{trendLabel}</div>
        
        <div className="h-16 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            {type === "line" ? (
              <LineChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={strokeColor}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            ) : (
              <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id={`colorValue-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="index" hide />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={strokeColor}
                  fillOpacity={1}
                  fill={`url(#colorValue-${title.replace(/\s+/g, '')})`}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
