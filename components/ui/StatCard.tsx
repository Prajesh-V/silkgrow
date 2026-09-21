import type { TrendState } from "@/types";
import TrendBadge from "./TrendBadge";

interface StatCardProps {
  title: string;
  value: string;
  trend: TrendState;
  trendValue: string;
  subtext: string;
}

export default function StatCard({ title, value, trend, trendValue, subtext }: StatCardProps) {
  return (
    <div className="bg-surface p-5 rounded-base border border-border shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-medium text-text-muted mb-2">{title}</h3>
        <div className="flex items-end gap-3 flex-wrap">
          <span className="text-3xl font-heading font-bold text-text-main">{value}</span>
          <TrendBadge trend={trend} label={trendValue} />
        </div>
      </div>
      <div className="mt-4 text-xs text-text-muted">
        {subtext}
      </div>
    </div>
  );
}
