"use client";

import { useState, useEffect } from "react";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "@/lib/storage";
import { 
  getLatestPrice, 
  getPreviousPrice, 
  calculatePriceChange,
  getHistoricalPrices,
  fetchLiveMarketData,
  combineWithLivePrice
} from "@/lib/market";
import { formatPrice } from "@/lib/formatting";
import type { Market, MarketPrice, PriceChange } from "@/types";

// Data
import marketsData from "@/data/markets.json";
import cocoonPricesData from "@/data/cocoonPrices.json";
import silkPricesData from "@/data/silkPrices.json";

// UI Components
import StatCard from "@/components/ui/StatCard";
import MarketSelector from "@/components/ui/MarketSelector";
import PriceChart from "@/components/ui/PriceChart";
import ActionCard from "@/components/ui/ActionCard";
import { BrainCircuit, Ticket } from "lucide-react";

export default function MarketIntelligencePage() {
  const [mounted, setMounted] = useState(false);
  const [marketId, setMarketId] = useState<string>("");
  const [range, setRange] = useState<"7D"|"15D"|"30D">("7D");
  const [livePrice, setLivePrice] = useState<MarketPrice | null>(null);
  const [isFetchingLive, setIsFetchingLive] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const storedMarketId = getStorageItem<string>(STORAGE_KEYS.SELECTED_MARKET);
    if (storedMarketId) {
      setMarketId(storedMarketId);
    } else {
      // Fallback safely if no selected market
      setMarketId((marketsData as Market[])[0].id);
    }
  }, []);

  useEffect(() => {
    if (!marketId) return;
    const fetchLive = async () => {
      setIsFetchingLive(true);
      const selectedMarketObj = (marketsData as Market[]).find(m => m.id === marketId) || (marketsData as Market[])[0];
      const data = await fetchLiveMarketData(selectedMarketObj.name);
      setLivePrice(data);
      setIsFetchingLive(false);
    };
    fetchLive();
  }, [marketId]);

  const handleMarketChange = (newMarketId: string) => {
    setMarketId(newMarketId);
    setStorageItem(STORAGE_KEYS.SELECTED_MARKET, newMarketId);
  };

  if (!mounted || !marketId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-primary/20 rounded-full mb-4"></div>
          <p className="text-text-muted">Loading market intelligence...</p>
        </div>
      </div>
    );
  }

  // --- Data Resolutions ---
  const baseCocoonPrices = cocoonPricesData as MarketPrice[];
  const cocoonPrices = combineWithLivePrice(baseCocoonPrices, livePrice);
  const silkPrices = silkPricesData as MarketPrice[];
  
  const selectedMarketObj = (marketsData as Market[]).find(m => m.id === marketId) || (marketsData as Market[])[0];

  // Cocoon logic
  const currentCocoon = getLatestPrice(cocoonPrices, marketId, "cocoon");
  const previousCocoon = getPreviousPrice(cocoonPrices, marketId, "cocoon");
  let cocoonChange: PriceChange = { absoluteChange: 0, percentageChange: 0, trend: "stable" };
  if (currentCocoon && previousCocoon) {
    cocoonChange = calculatePriceChange(currentCocoon.price, previousCocoon.price);
  }
  
  // Historical logic (dynamic)
  const days = parseInt(range.replace("D", ""), 10);
  const historicalCocoon = getHistoricalPrices(cocoonPrices, marketId, "cocoon", days);

  // Silk logic
  const currentSilk = getLatestPrice(silkPrices, marketId, "silk");
  const previousSilk = getPreviousPrice(silkPrices, marketId, "silk");
  let silkChange: PriceChange = { absoluteChange: 0, percentageChange: 0, trend: "stable" };
  if (currentSilk && previousSilk) {
    silkChange = calculatePriceChange(currentSilk.price, previousSilk.price);
  }

  // Insight Generation
  const insightDirection = cocoonChange.percentageChange > 1 
    ? "increased" 
    : cocoonChange.percentageChange < -1 
      ? "decreased" 
      : "remained relatively stable";
      
  const buyerDemand = cocoonChange.percentageChange > 1 ? "High" : cocoonChange.percentageChange < -1 ? "Low" : "Steady";

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* 1. Header & Market Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              {isFetchingLive ? (
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
              ) : currentCocoon?.sourceType === "government_market_feed" ? (
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              ) : (
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
              {isFetchingLive ? "Fetching Live Data..." : currentCocoon?.sourceType === "government_market_feed" ? "Live Government Feed" : "Static History"}
            </span>
            <span className="text-text-muted text-sm">
              {currentCocoon?.sourceUpdatedAt 
                ? `Updated ${new Date(currentCocoon.sourceUpdatedAt).toLocaleDateString()}` 
                : "Historical dataset"}
            </span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-text-main">Market Intelligence</h1>
        </div>
        
        <div className="w-full lg:w-auto">
          <MarketSelector 
            markets={marketsData as Market[]} 
            selectedMarketId={marketId} 
            onMarketChange={handleMarketChange} 
          />
        </div>
      </div>

      {/* 2. Primary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={`${currentCocoon?.productName || "CSR2"} Cocoon Spot`}
          value={currentCocoon ? formatPrice(currentCocoon.price) : "—"}
          trend={cocoonChange.trend}
          trendValue={currentCocoon && previousCocoon ? `${cocoonChange.absoluteChange > 0 ? "+" : ""}${formatPrice(cocoonChange.absoluteChange)} (${cocoonChange.percentageChange.toFixed(1)}%)` : "No data"}
          subtext={`Modal range: ${formatPrice((currentCocoon?.price || 0) - 15)} - ${formatPrice((currentCocoon?.price || 0) + 15)} | High buyer density`}
        />
        <StatCard
          title={`${currentSilk?.productName || "Grade-A"} Silk Spot`}
          value={currentSilk ? formatPrice(currentSilk.price) : "—"}
          trend={silkChange.trend}
          trendValue={currentSilk && previousSilk ? `${silkChange.absoluteChange > 0 ? "+" : ""}${formatPrice(silkChange.absoluteChange)} (${silkChange.percentageChange.toFixed(1)}%)` : "No data"}
          subtext={`${selectedMarketObj.name} Silk Exchange Benchmark`}
        />
        <StatCard
          title="Mandi Trade Volume Today"
          value="₹1.18 Cr"
          trend="increasing"
          trendValue="+12%"
          subtext="18,420 kg traded | 98% clearance rate"
        />
        <StatCard
          title="Avg. Lot Realization Speed"
          value="42 Mins"
          trend="decreasing"
          trendValue="-8 mins"
          subtext="Gate entry to digital weighment"
        />
      </div>

      {/* 3. Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Wide) - Chart */}
        <div className="lg:col-span-8 bg-surface rounded-base border border-border shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-heading font-bold text-text-main">
              Cocoon Price Trend ({selectedMarketObj.name})
            </h3>
            <div className="flex gap-2">
              {["7D", "15D", "30D"].map((r) => (
                <button 
                  key={r}
                  onClick={() => setRange(r as "7D" | "15D" | "30D")}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
                    range === r 
                      ? "bg-primary text-white" 
                      : "bg-surface border border-border text-text-muted hover:text-primary"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          
          <PriceChart data={historicalCocoon} dataKey="price" />
          
          <div className="mt-6 pt-4 border-t border-border flex flex-col md:flex-row md:items-center justify-between text-sm text-text-muted gap-2">
            <span>{range} Range: {formatPrice(Math.min(...historicalCocoon.map(h => h.price)))} – {formatPrice(Math.max(...historicalCocoon.map(h => h.price)))}</span>
            <span className="font-medium text-text-main">Net Shift: {cocoonChange.absoluteChange > 0 ? "+" : ""}{formatPrice(currentCocoon!.price - historicalCocoon[0].price)}/kg this cycle</span>
          </div>
        </div>

        {/* Right Column - Advisory & Actions */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* AI Dynamics Card */}
          <div className="bg-[#f0f4f1] rounded-base border border-primary/20 p-6">
            <div className="flex items-center gap-2 mb-4 text-primary font-heading font-bold">
              <BrainCircuit size={20} />
              AI Mandi Dynamics & Advisory
            </div>
            
            <p className="text-text-main leading-relaxed mb-6">
              Prices have <span className="font-semibold">{insightDirection}</span> by {Math.abs(cocoonChange.percentageChange).toFixed(1)}% over the last {days} days. Demand for {currentCocoon?.productName} cocoons remains exceptionally strong due to upcoming regional reeling demand. Favorable selling window active.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-border/50">
                <div className="text-xs text-text-muted mb-1">Buyer Demand</div>
                <div className="font-bold text-primary">{buyerDemand}</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-border/50">
                <div className="text-xs text-text-muted mb-1">Clearance Rate</div>
                <div className="font-bold text-text-main">98%</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-border/50">
                <div className="text-xs text-text-muted mb-1">Optimal Arrival</div>
                <div className="font-bold text-text-main">08:30 AM</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-border/50">
                <div className="text-xs text-text-muted mb-1">Queue Wait Time</div>
                <div className="font-bold text-text-main">~25 mins</div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <ActionCard
            icon={<Ticket size={24} />}
            title="Reserve Fast-Track Token"
            description="Skip the 4-hour weighment queue with green channel entry"
            href="/bookings"
          />
          
          {/* Helpline Footer */}
          <div className="bg-surface rounded-base border border-border p-4 text-center">
            <p className="text-sm font-medium text-text-main">Mandi Helpline: 1800-425-1111</p>
            <p className="text-xs text-text-muted mt-1">{selectedMarketObj.name} APMC Control Room</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
