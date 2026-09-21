"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { formatPrice } from "@/lib/formatting";
import type { MarketPrice } from "@/types";

interface PriceChartProps {
  data: MarketPrice[];
  dataKey: string;
  color?: string;
}

export default function PriceChart({ data, dataKey = "price", color = "#386641" }: PriceChartProps) {
  // Format the date for the X-axis (e.g., "Mon", "Tue")
  const formatXAxis = (tickItem: string) => {
    const d = new Date(tickItem);
    return d.toLocaleDateString("en-US", { weekday: "short" });
  };

  const formatTooltipValue = (value: unknown) => {
    if (typeof value !== "number") return ["—", "Price"];
    return [formatPrice(value), "Price"];
  };

  // Ensure data is sorted chronologically for the chart
  const sortedData = [...data].sort((a, b) => a.date.localeCompare(b.date));

  // Determine min and max for Y-axis domain to make the trend visible
  const minPrice = Math.min(...sortedData.map(d => d[dataKey as keyof MarketPrice] as number));
  const maxPrice = Math.max(...sortedData.map(d => d[dataKey as keyof MarketPrice] as number));
  
  // Add some padding to domain
  const yDomain = [
    Math.floor(minPrice * 0.95), 
    Math.ceil(maxPrice * 1.05)
  ];

  return (
    <div className="w-full h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sortedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color === "#386641" ? "var(--chart-1)" : color} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={color === "#386641" ? "var(--chart-1)" : color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis} 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "var(--chart-text)" }}
            dy={10}
          />
          <YAxis 
            domain={yDomain}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "var(--chart-text)" }}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip 
            formatter={formatTooltipValue}
            labelFormatter={(label) => new Date(label as string).toLocaleDateString()}
            contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
          />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color === "#386641" ? "var(--chart-1)" : color} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            activeDot={{ r: 6, strokeWidth: 0, fill: color === "#386641" ? "var(--chart-1)" : color }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
