
# Sparkline Component

A minimalistic trendline visualization component designed to be embedded in KPI cards.

## Features

- Simple, clean visualization without axes or grid lines
- Dynamic color based on trend direction (positive/negative)
- Responsive sizing for mobile and desktop layouts
- Interactive tooltip on hover showing date and value
- Customizable appearance

## Usage

```tsx
import { Sparkline } from "@/components/ui/sparkline";

// Example data (7 days)
const sparklineData = [
  { date: new Date('2025-05-01'), value: 120 },
  { date: new Date('2025-05-02'), value: 132 },
  { date: new Date('2025-05-03'), value: 125 },
  { date: new Date('2025-05-04'), value: 140 },
  { date: new Date('2025-05-05'), value: 145 },
  { date: new Date('2025-05-06'), value: 138 },
  { date: new Date('2025-05-07'), value: 150 }
];

// Basic usage
<Sparkline data={sparklineData} />

// Custom height and colors
<Sparkline 
  data={sparklineData}
  height={30}
  positiveColor="#4ade80"
  negativeColor="#f87171"
/>

// Disable tooltip
<Sparkline 
  data={sparklineData}
  tooltipEnabled={false}
/>
```

## Integration with KPI Card

The `KpiCard` component has built-in support for sparklines:

```tsx
import { KpiCard } from "@/components/ui/kpi-card";

<KpiCard
  title="Monthly Revenue"
  value="$12,450"
  trend={{
    value: 8.5,
    label: "+8.5% vs last month",
    isPositive: true
  }}
  footnote="Average daily: $415"
  sparklineData={sparklineData}
/>
```

## Props

### Sparkline Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<{ date: Date; value: number }>` | Required | Array of data points with date and value |
| `height` | `number` | `30` | Height of the sparkline in pixels |
| `width` | `string \| number` | `"100%"` | Width of the sparkline |
| `className` | `string` | `undefined` | Additional CSS classes |
| `lineColor` | `string` | `undefined` | Override default trend-based coloring |
| `positiveColor` | `string` | `"#22c55e"` | Color for positive trends |
| `negativeColor` | `string` | `"#ef4444"` | Color for negative trends |
| `tooltipEnabled` | `boolean` | `true` | Whether to show tooltips on hover |

### KPI Card Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | Title of the KPI card |
| `value` | `string \| number` | Required | Main KPI value to display |
| `description` | `string` | `undefined` | Optional description text |
| `trend` | `{ value: number; label: string; isPositive: boolean }` | `undefined` | Trend indicator with percentage and label |
| `sparklineData` | `Array<{ date: Date; value: number }>` | `undefined` | Data for the sparkline chart |
| `footnote` | `string` | `undefined` | Additional information displayed below the value |
| `className` | `string` | `undefined` | Additional CSS classes |
| `isPrivate` | `boolean` | `false` | Whether to hide the actual values (for sensitive data) |
| `onToggleVisibility` | `() => void` | `undefined` | Handler for toggling visibility of private data |
