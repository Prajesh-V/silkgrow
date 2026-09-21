"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStorageItem, STORAGE_KEYS } from "@/lib/storage";
import { 
  getLatestPrice, 
  getPreviousPrice, 
  calculatePriceChange,
  fetchLiveMarketData,
  combineWithLivePrice
} from "@/lib/market";
import { formatPrice } from "@/lib/formatting";
import type { DemoUser, Market, MarketPrice, Forecast, PriceChange } from "@/types";

// Data
import marketsData from "@/data/markets.json";
import cocoonPricesData from "@/data/cocoonPrices.json";
import silkPricesData from "@/data/silkPrices.json";
import forecastsData from "@/data/forecasts.json";

// UI Components
import StatCard from "@/components/ui/StatCard";
import ActionCard from "@/components/ui/ActionCard";
import { TrendingUp, BarChart3, Truck, Sprout } from "lucide-react";

import { addFeedingLog } from "@/lib/feeding";

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<DemoUser | null>(null);
  const [market, setMarket] = useState<Market | null>(null);
  const [showFeedingModal, setShowFeedingModal] = useState(false);
  const [feedingQty, setFeedingQty] = useState("");
  const [feedingNotes, setFeedingNotes] = useState("");
  const [feedingSuccess, setFeedingSuccess] = useState(false);

  const handleLogFeeding = () => {
    if (!feedingQty || isNaN(Number(feedingQty)) || Number(feedingQty) <= 0) return;
    addFeedingLog({
      date: new Date().toISOString(),
      quantity: Number(feedingQty),
      notes: feedingNotes,
      marketId: market?.id || ""
    });
    setFeedingSuccess(true);
    setFeedingQty("");
    setFeedingNotes("");
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const storedUser = getStorageItem<DemoUser>(STORAGE_KEYS.USER);
    const storedMarketId = getStorageItem<string>(STORAGE_KEYS.SELECTED_MARKET);
    
    if (!storedUser || !storedMarketId) {
      router.replace("/"); // Redirect to onboarding if missing session
      return;
    }
    
    setUser(storedUser);
    const m = (marketsData as Market[]).find(m => m.id === storedMarketId) || null;
    setMarket(m);
  }, [router]);

  const [livePrice, setLivePrice] = useState<MarketPrice | null>(null);
  
  useEffect(() => {
    if (!market) return;
    const fetchLive = async () => {
      const data = await fetchLiveMarketData(market.name);
      setLivePrice(data);
    };
    fetchLive();
  }, [market]);

  if (!mounted || !user || !market) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-primary/20 rounded-full mb-4"></div>
          <p className="text-text-muted">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // --- Data Resolutions ---
  const baseCocoonPrices = cocoonPricesData as MarketPrice[];
  const cocoonPrices = combineWithLivePrice(baseCocoonPrices, livePrice);
  const silkPrices = silkPricesData as MarketPrice[];
  const forecasts = forecastsData as Forecast[];

  // Cocoon logic
  const currentCocoon = getLatestPrice(cocoonPrices, market.id, "cocoon");
  const previousCocoon = getPreviousPrice(cocoonPrices, market.id, "cocoon");
  let cocoonChange: PriceChange = { absoluteChange: 0, percentageChange: 0, trend: "stable" };
  if (currentCocoon && previousCocoon) {
    cocoonChange = calculatePriceChange(currentCocoon.price, previousCocoon.price);
  }

  // Silk logic
  const currentSilk = getLatestPrice(silkPrices, market.id, "silk");
  const previousSilk = getPreviousPrice(silkPrices, market.id, "silk");
  let silkChange: PriceChange = { absoluteChange: 0, percentageChange: 0, trend: "stable" };
  if (currentSilk && previousSilk) {
    silkChange = calculatePriceChange(currentSilk.price, previousSilk.price);
  }

  // Forecast logic
  const marketForecast = forecasts.find(f => f.marketId === market.id);
  const peakForecast = marketForecast?.forecast?.[marketForecast.forecast.length - 1] || null; // End of horizon

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* 1. Header & Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-main">
            Namaskara, {user.name}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
              📍 Selected Market: {market.name}
            </span>
            <span className="text-text-muted hidden md:inline">
              Active Batch #SW-2025-04 • 4th Instar Active
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowFeedingModal(true)}
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-base text-sm font-medium transition-colors"
          >
            Log Feeding
          </button>
        </div>
      </div>

      {/* Feeding Modal */}
      {showFeedingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-surface rounded-base w-full max-w-md shadow-xl border border-border p-6 relative my-auto max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-heading font-bold mb-4">Log Feeding</h2>
            {feedingSuccess ? (
              <div className="bg-success-bg border border-success-border text-success-text p-4 rounded-md mb-4 flex items-center gap-2">
                <Sprout size={20} className="text-success-text" />
                <span className="font-medium text-sm">Feeding logged successfully!</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-text-main mb-1">Quantity (kg)</label>
                  <input 
                    type="number" 
                    value={feedingQty}
                    onChange={(e) => setFeedingQty(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                    placeholder="e.g. 50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-1">Notes (Optional)</label>
                  <input 
                    type="text" 
                    value={feedingNotes}
                    onChange={(e) => setFeedingNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                    placeholder="e.g. V1 leaves, slightly wet"
                  />
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => { setShowFeedingModal(false); setFeedingSuccess(false); }}
                className="px-4 py-2 text-sm font-bold text-text-muted hover:text-text-main transition-colors"
              >
                {feedingSuccess ? "Close" : "Cancel"}
              </button>
              {!feedingSuccess && (
                <button 
                  onClick={handleLogFeeding}
                  className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-bold transition-colors"
                >
                  Save Log
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Primary Stats (Top Row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Cocoon Spot"
          value={currentCocoon ? formatPrice(currentCocoon.price) : "—"}
          trend={cocoonChange.trend}
          trendValue={currentCocoon && previousCocoon ? `${cocoonChange.absoluteChange > 0 ? "+" : ""}${formatPrice(cocoonChange.absoluteChange)} (${cocoonChange.percentageChange.toFixed(1)}%)` : "No data"}
          subtext={currentCocoon?.sourceUpdatedAt 
            ? `Source: Live Govt Feed • Updated ${new Date(currentCocoon.sourceUpdatedAt).toLocaleDateString()}` 
            : `Mandi latest • Source: Historical Dataset`}
        />
        <StatCard
          title={`Raw Silk Spot (${currentSilk?.productName || "Grade-A"})`}
          value={currentSilk ? formatPrice(currentSilk.price) : "—"}
          trend={silkChange.trend}
          trendValue={currentSilk && previousSilk ? `${silkChange.absoluteChange > 0 ? "+" : ""}${formatPrice(silkChange.absoluteChange)} (${silkChange.percentageChange.toFixed(1)}%)` : "No data"}
          subtext={`${market.name} Silk Exchange`}
        />
        <StatCard
          title="Chamber Microclimate"
          value="24.8°C"
          trend="stable"
          trendValue="Optimal"
          subtext="68% RH • Chamber Hall 1"
        />
        <StatCard
          title="Mulberry Foliage Vigor"
          value="94%"
          trend="increasing"
          trendValue="High Vigour"
          subtext="45 mins to next feed"
        />
      </div>

      {/* 3. Split Bento View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Wide) - AI Forecast */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-surface rounded-base border border-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                <Sprout size={14} />
                AI Harvest Intelligence
              </span>
              <span className="text-xs text-text-muted">94% Confidence</span>
            </div>
            
            <h3 className="text-xl font-heading font-bold text-text-main mb-2">
              Cocoon price predicted to rise over next 4-6 days.
            </h3>
            <p className="text-text-muted mb-6">
              Favorable sale window aligns with your batch spinning maturity. Silkworms enter full cocooning in 48 hours. Target Mandi arrival: Friday Morning.
            </p>

            {/* Projection Timeline (Visual logic) */}
            {marketForecast && (
              <div className="bg-background rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-border">
                <div className="text-center md:text-left flex-1">
                  <div className="text-xs text-text-muted mb-1">Today</div>
                  <div className="font-bold">{formatPrice(marketForecast.forecast[0].predictedPrice)}</div>
                </div>
                <div className="hidden md:block text-border">
                  <TrendingUp size={24} />
                </div>
                <div className="text-center flex-1">
                  <div className="text-xs text-text-muted mb-1">Day 3</div>
                  <div className="font-bold text-primary">{formatPrice(marketForecast.forecast[2].predictedPrice)}</div>
                </div>
                <div className="hidden md:block text-border">
                  <TrendingUp size={24} />
                </div>
                <div className="text-center md:text-right flex-1 bg-primary/5 p-2 rounded-md border border-primary/20">
                  <div className="text-xs text-primary font-medium mb-1">Day 5 (Peak)</div>
                  <div className="font-bold text-primary">{formatPrice(peakForecast?.predictedPrice || 0)}</div>
                </div>
              </div>
            )}
            
            <p className="text-[10px] text-text-muted mt-4 italic">
              AI forecasts are estimates based on historical patterns. Actual market prices may differ.
            </p>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <ActionCard
            icon={<BarChart3 size={24} />}
            title="Market Intelligence"
            description="Live Mandi bids, arrival volumes & slot wait-times"
            href="/market"
          />
          <ActionCard
            icon={<TrendingUp size={24} />}
            title="Detailed AI Price Curve"
            description="14-day machine-learning trend & weather correlation"
            href="/forecast"
          />
          <ActionCard
            icon={<Truck size={24} />}
            title="Book Farm Logistics"
            description="Disinfection sprayers, cocoon crates & transport"
            href="/resources"
          />
        </div>
      </div>
    </div>
  );
}
