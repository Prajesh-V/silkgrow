"use client";

import { MapPin, ChevronDown } from "lucide-react";
import type { Market } from "@/types";

interface MarketSelectorProps {
  markets: Market[];
  selectedMarketId: string;
  onMarketChange: (marketId: string) => void;
}

export default function MarketSelector({ markets, selectedMarketId, onMarketChange }: MarketSelectorProps) {
  return (
    <div className="relative inline-block w-full md:w-auto">
      <div className="flex items-center bg-surface border border-border rounded-full px-4 py-2 hover:border-primary/50 transition-colors cursor-pointer w-full md:min-w-[320px]">
        <MapPin size={18} className="text-primary mr-2 flex-shrink-0" />
        <select
          value={selectedMarketId}
          onChange={(e) => onMarketChange(e.target.value)}
          className="appearance-none bg-transparent border-none focus:outline-none focus:ring-0 text-text-main font-semibold text-sm w-full cursor-pointer pr-6"
        >
          {markets.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} Silk Mandi {m.id === "mkt-ramanagara" ? "(Asia's Largest)" : ""}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="text-text-muted absolute right-4 pointer-events-none" />
      </div>
    </div>
  );
}
