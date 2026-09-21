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
import type { ForecastPoint } from "@/types";

interface ForecastChartProps {
  forecastData: ForecastPoint[];
  currentPrice: number;
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: { isToday?: boolean; [key: string]: unknown };
}

const CustomDot = (props: CustomDotProps) => {
  const { cx, cy, payload } = props;
  if (payload?.isToday) {
    return (
      <circle cx={cx} cy={cy} r={6} fill="var(--chart-1)" stroke="var(--surface)" strokeWidth={2} />
    );
  }
  return (
    <circle cx={cx} cy={cy} r={4} fill="var(--surface)" stroke="var(--chart-1)" strokeWidth={2} />
  );
};

export default function ForecastChart({ forecastData, currentPrice }: ForecastChartProps) {
  // We prepend the current price as 'Today' to connect the chart
  const today = new Date();
  
  const chartData = [
    {
      date: today.toISOString().split("T")[0],
      displayDate: "Today",
      predictedPrice: currentPrice,
      isToday: true
    },
    ...forecastData.map((d) => {
      const parsedDate = new Date(d.date);
      return {
        date: d.date,
        displayDate: parsedDate.toLocaleDateString("en-US", { weekday: "short" }),
        predictedPrice: d.predictedPrice,
        isToday: false
      };
    })
  ];

  const formatXAxis = (tickItem: string) => {
    return tickItem; // already formatted as 'displayDate'
  };

  const formatTooltipValue = (value: unknown) => {
    if (typeof value !== "number") return ["—", "Price"];
    return [formatPrice(value), "Projected Price"];
  };

  const minPrice = Math.min(...chartData.map(d => d.predictedPrice));
  const maxPrice = Math.max(...chartData.map(d => d.predictedPrice));
  const yDomain = [Math.floor(minPrice * 0.95), Math.ceil(maxPrice * 1.05)];

  return (
    <div className="w-full h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
          <XAxis 
            dataKey="displayDate" 
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
            labelFormatter={(label) => label === "Today" ? "Today (Current)" : label}
            contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
          />
          {/* Note: In a real app we might draw 2 lines (solid & dashed) using separate datasets. 
              Here we use strokeDasharray to give the entire curve a dashed predictive feel 
              while the CustomDot highlights the origin point. */}
          <Area 
            type="monotone" 
            dataKey="predictedPrice" 
            stroke="var(--chart-1)" 
            strokeWidth={3}
            strokeDasharray="5 5"
            fillOpacity={1} 
            fill="url(#colorForecast)" 
            activeDot={{ r: 6, fill: "var(--chart-1)" }}
            dot={<CustomDot />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
