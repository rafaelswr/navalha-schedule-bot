
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

interface ServiceTypePieChartProps {
  title: string;
  data: Array<{ name: string; value: number }>;
  className?: string;
  colors?: string[];
}

const DEFAULT_COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#4C1D95'];

export const ServiceTypePieChart = ({
  title,
  data,
  className,
  colors = DEFAULT_COLORS,
}: ServiceTypePieChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} (${((value as number / total) * 100).toFixed(1)}%)`, 'Quantidade']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center text-xs gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="truncate">{item.name}</span>
              <span className="font-medium ml-auto">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
