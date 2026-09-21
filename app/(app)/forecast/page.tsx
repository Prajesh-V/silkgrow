"use client";

import { useState, useEffect } from "react";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "@/lib/storage";
import { 
  getLatestPrice 
} from "@/lib/market";
import { 
  getForecastTrend, 
  getFavorableWindow, 
  generateForecastInsight 
} from "@/lib/forecast";
import { formatPrice } from "@/lib/formatting";
import type { Market, MarketPrice, Forecast } from "@/types";

// Data
import marketsData from "@/data/markets.json";
import cocoonPricesData from "@/data/cocoonPrices.json";
import forecastsData from "@/data/forecasts.json";

// UI Components
import StatCard from "@/components/ui/StatCard";
import MarketSelector from "@/components/ui/MarketSelector";
import ForecastChart from "@/components/ui/ForecastChart";
import ActionCard from "@/components/ui/ActionCard";
import { Ticket, BrainCircuit, Activity, CalendarDays, Sparkles } from "lucide-react";

export default function ForecastIntelligencePage() {
  const [mounted, setMounted] = useState(false);
  const [marketId, setMarketId] = useState<string>("");
  const [range, setRange] = useState<"7D"|"14D"|"30D">("7D");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const storedMarketId = getStorageItem<string>(STORAGE_KEYS.SELECTED_MARKET);
    if (storedMarketId) {
      setMarketId(storedMarketId);
    } else {
      setMarketId((marketsData as Market[])[0].id);
    }
  }, []);

  const handleMarketChange = (newMarketId: string) => {
    setMarketId(newMarketId);
    setStorageItem(STORAGE_KEYS.SELECTED_MARKET, newMarketId);
  };

  if (!mounted || !marketId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-primary/20 rounded-full mb-4"></div>
          <p className="text-text-muted">Loading AI projections...</p>
        </div>
      </div>
    );
  }

  // --- Data Resolutions ---
  const selectedMarketObj = (marketsData as Market[]).find(m => m.id === marketId) || (marketsData as Market[])[0];
  const cocoonPrices = cocoonPricesData as MarketPrice[];
  const forecasts = forecastsData as Forecast[];

  const days = range === "7D" ? 7 : range === "14D" ? 14 : 30;

  // Current baseline
  const currentCocoon = getLatestPrice(cocoonPrices, marketId, "cocoon");
  
  // Forecast for market
  const marketForecastObj = forecasts.find(f => f.marketId === marketId);
  // Slice based on selected range
  const marketForecast = marketForecastObj ? {
    ...marketForecastObj,
    forecast: marketForecastObj.forecast.slice(0, days)
  } : null;

  const currentPrice = currentCocoon?.price || 0;

  // Forecast logic
  const forecastData = marketForecast;
  const forecastPoints = forecastData?.forecast || [];
  const trend = getForecastTrend(forecastPoints);
  const favorableWindow = getFavorableWindow(forecastPoints, currentPrice);
  const aiInsight = generateForecastInsight(trend);

  // Derivations for UI
  const peakPrice = forecastPoints.length > 0 
    ? Math.max(...forecastPoints.map(p => p.predictedPrice))
    : 0;
  
  const peakPercentage = currentPrice > 0 
    ? ((peakPrice - currentPrice) / currentPrice) * 100 
    : 0;

  // Format the favorable window cleanly
  let windowDisplay = "No favorable window identified in short-term.";
  if (favorableWindow) {
    const s = new Date(favorableWindow.startDate);
    const e = new Date(favorableWindow.endDate);
    windowDisplay = `${s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${e.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* 1. Header & Market Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles size={14} className="text-primary" />
              SilkGrow AI LSTM • 94% Model Confidence
            </span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-text-main">AI Price Forecast</h1>
          <p className="text-text-muted text-sm mt-1">Bivoltine Cocoon ({currentCocoon?.productName || "CSR2"}) • Predictive Mandi Yield Pricing</p>
        </div>
        
        <div className="w-full lg:w-auto">
          <MarketSelector 
            markets={marketsData as Market[]} 
            selectedMarketId={marketId} 
            onMarketChange={handleMarketChange} 
          />
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-secondary/10 border border-secondary/20 rounded-md p-3">
        <p className="text-xs text-secondary italic flex items-center gap-2">
          <BrainCircuit size={14} />
          AI forecasts are estimates based on historical patterns. Actual market prices may differ.
        </p>
      </div>

      {/* 2. Primary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Spot Price"
          value={formatPrice(currentPrice)}
          trend="stable"
          trendValue="Live Auction"
          subtext={`${currentCocoon?.productName || "CSR2"} Bivoltine Hybrid`}
        />
        <StatCard
          title="7-Day Forecast Peak"
          value={formatPrice(peakPrice)}
          trend={trend}
          trendValue={`${trend === 'increasing' ? '+' : ''}${peakPercentage.toFixed(1)}%`}
          subtext="Projected Peak Yield"
        />
        <StatCard
          title="Model Validation R²"
          value="94%"
          trend="stable"
          trendValue="High Confidence"
          subtext="Historical variance: ±₹8/kg"
        />
        <div className="bg-primary/10 border border-primary/20 rounded-base p-5 flex flex-col justify-center">
           <h4 className="text-sm font-medium text-text-muted mb-1 flex items-center gap-2">
              <CalendarDays size={16} className="text-primary" />
              Optimal Exit Window
           </h4>
           <p className="text-lg font-heading font-bold text-primary">
             {favorableWindow ? "Active" : "Wait"}
           </p>
           <p className="text-xs text-text-muted mt-1">
             {windowDisplay}
           </p>
        </div>
      </div>

      {/* 3. Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Wide) - Chart */}
        <div className="lg:col-span-8 bg-surface rounded-base border border-border shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-heading font-bold text-text-main flex items-center gap-2">
              <Activity size={20} className="text-primary" />
              Trajectory Projection
            </h3>
            <div className="flex bg-background rounded-lg p-1 border border-border">
              <button 
                onClick={() => setRange("7D")}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${range === "7D" ? "bg-surface shadow-sm rounded-md text-text-main" : "text-text-muted hover:text-text-main"}`}
              >
                7 Days
              </button>
              <button 
                onClick={() => setRange("14D")}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${range === "14D" ? "bg-surface shadow-sm rounded-md text-text-main" : "text-text-muted hover:text-text-main"}`}
              >
                14 Days
              </button>
              <button 
                onClick={() => setRange("30D")}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${range === "30D" ? "bg-surface shadow-sm rounded-md text-text-main" : "text-text-muted hover:text-text-main"}`}
              >
                30 Days
              </button>
            </div>
          </div>
          
          <ForecastChart forecastData={forecastPoints} currentPrice={currentPrice} />
          
          <div className="mt-6 pt-4 border-t border-border flex flex-col md:flex-row md:items-center justify-between text-sm text-text-muted gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary inline-block"></span> Historical Spot</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full border-2 border-primary border-dashed inline-block"></span> AI Projected Line</span>
            </div>
            <span>Updated 18m ago</span>
          </div>
        </div>

        {/* Right Column - Advisory & Actions */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Favorable Window Highlight */}
          <div className="bg-surface rounded-base border border-border p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10"></div>
            <div className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-4">
              Predicted Favorable Window
            </div>
            <h2 className="text-xl font-heading font-bold text-text-main mb-6">
              Price Projection Horizon ({selectedMarketObj.name})
            </h2>
            <div className="flex gap-2 mb-4">
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
            <h4 className="text-xl font-heading font-bold text-text-main mb-2">
              {windowDisplay}
            </h4>
            <p className="text-text-muted text-sm mb-4">
              Matches silkworm 5th instar spinning cycle maturity. Max reeler buyer density anticipated at {selectedMarketObj.name} APMC with peak purchasing bids.
            </p>
            <ActionCard
              icon={<Ticket size={24} />}
              title="Reserve Fast-Track Token"
              description="Direct gate entry pass for optimal window"
              href="/bookings"
            />
          </div>

          {/* AI Dynamics Card */}
          <div className="bg-[#f0f4f1] rounded-base border border-primary/20 p-6">
            <div className="flex items-center gap-2 mb-4 text-primary font-heading font-bold">
              <BrainCircuit size={20} />
              AI Market Drivers
            </div>
            <p className="text-text-main leading-relaxed text-sm mb-4">
              {aiInsight} Driven by historical pattern matching of festival weaving demand and regional supply deficits.
            </p>
            <div className="text-xs text-text-muted bg-white p-2 rounded border border-border/50 text-center">
              APMC e-Kisan • SeriSense ML v3.2
            </div>
          </div>
          
          {/* Helpline Footer */}
          <div className="bg-surface rounded-base border border-border p-4 text-center">
            <p className="text-sm font-medium text-text-main">Mandi Helpline: 1800-425-1111</p>
            <p className="text-xs text-text-muted mt-1">Call APMC Desk</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
