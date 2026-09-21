import type { TrendState } from "@/types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TrendBadgeProps {
  trend: TrendState;
  label: string;
}

export default function TrendBadge({ trend, label }: TrendBadgeProps) {
  if (trend === "increasing") {
    return (
      <span className="inline-flex items-center gap-1 bg-success-bg text-success-text px-2 py-0.5 rounded-full text-xs font-semibold">
        <TrendingUp size={14} />
        {label}
      </span>
    );
  }
  if (trend === "decreasing") {
    return (
      <span className="inline-flex items-center gap-1 bg-danger-bg text-danger-text px-2 py-0.5 rounded-full text-xs font-semibold">
        <TrendingDown size={14} />
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-neutral-bg text-neutral-text px-2 py-0.5 rounded-full text-xs font-semibold">
      <Minus size={14} />
      {label}
    </span>
  );
}
