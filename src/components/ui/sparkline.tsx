
import { useEffect, useState, useRef } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  TooltipProps,
} from "recharts";
import { format } from "date-fns";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface SparklineProps {
  data: Array<{ date: Date; value: number }>;
  height?: number;
  width?: string | number;
  className?: string;
  lineColor?: string;
  positiveColor?: string;
  negativeColor?: string;
  tooltipEnabled?: boolean;
}

/**
 * Sparkline Component
 * 
 * A minimalistic trend line chart component for displaying data trends in KPI cards.
 * 
 * @param {SparklineProps} props - The component props
 * @param {Array<{ date: Date; value: number }>} props.data - Array of data points with date and value
 * @param {number} [props.height=30] - Height of the sparkline in pixels
 * @param {string|number} [props.width="100%"] - Width of the sparkline
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.lineColor] - Default line color (overrides trend-based coloring)
 * @param {string} [props.positiveColor="#22c55e"] - Color for positive trends
 * @param {string} [props.negativeColor="#ef4444"] - Color for negative trends
 * @param {boolean} [props.tooltipEnabled=true] - Whether to show tooltips on hover
 * 
 * @returns React component
 */
export const Sparkline = ({
  data,
  height = 30,
  width = "100%",
  className,
  lineColor,
  positiveColor = "#22c55e",
  negativeColor = "#ef4444",
  tooltipEnabled = true,
}: SparklineProps) => {
  const [trendColor, setTrendColor] = useState<string>(positiveColor);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Determine trend direction and set appropriate color
  useEffect(() => {
    if (lineColor) {
      setTrendColor(lineColor);
      return;
    }

    if (data.length >= 2) {
      const firstValue = data[0].value;
      const lastValue = data[data.length - 1].value;
      setTrendColor(lastValue >= firstValue ? positiveColor : negativeColor);
    }
  }, [data, lineColor, positiveColor, negativeColor]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <Card className="bg-popover/95 border shadow-lg p-0">
          <CardContent className="p-2 text-xs">
            <div className="font-medium">{format(new Date(dataPoint.date), 'dd/MM/yyyy')}</div>
            <div>{dataPoint.value.toLocaleString()}</div>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  return (
    <div 
      ref={containerRef}
      className={cn("w-full overflow-hidden", className)}
      style={{ height, width }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <Line
            type="monotone"
            dataKey="value"
            stroke={trendColor}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
          {tooltipEnabled && (
            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
              wrapperStyle={{ outline: "none" }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
