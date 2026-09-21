/**
 * SilkGrow — Market Utilities
 *
 * Centralized market business logic: price lookups, change calculations,
 * and trend classification.
 *
 * See: docs/ARCHITECTURE.md §9, §15
 * See: docs/DATA_MODEL.md §8–§11
 */

import type { MarketPrice, TrendState, PriceChange, Commodity } from "@/types";

/** Trend threshold: ±1% (from DATA_MODEL.md §11) */
const TREND_THRESHOLD = 1;

/**
 * Get the latest price record for a given market and commodity.
 * Assumes records are sorted by date or finds the maximum date.
 */
export function getLatestPrice(
  prices: MarketPrice[],
  marketId: string,
  commodity: Commodity,
): MarketPrice | null {
  const filtered = prices.filter(
    (p) => p.marketId === marketId && p.commodity === commodity,
  );

  if (filtered.length === 0) return null;

  return filtered.reduce((latest, current) =>
    current.date > latest.date ? current : latest,
  );
}

/**
 * Get the previous (second-latest) price record.
 */
export function getPreviousPrice(
  prices: MarketPrice[],
  marketId: string,
  commodity: Commodity,
): MarketPrice | null {
  const filtered = prices
    .filter((p) => p.marketId === marketId && p.commodity === commodity)
    .sort((a, b) => b.date.localeCompare(a.date));

  return filtered.length >= 2 ? filtered[1] : null;
}

/**
 * Classify a percentage change into a trend state.
 *
 * Rule (DATA_MODEL.md §11):
 * - percentageChange > +1%  → Increasing
 * - percentageChange < -1%  → Decreasing
 * - otherwise               → Stable
 */
export function classifyTrend(percentageChange: number): TrendState {
  if (percentageChange > TREND_THRESHOLD) return "increasing";
  if (percentageChange < -TREND_THRESHOLD) return "decreasing";
  return "stable";
}

/**
 * Calculate the price change between current and previous price.
 * Returns absolute change, percentage change, and trend state.
 */
export function calculatePriceChange(
  currentPrice: number,
  previousPrice: number,
): PriceChange {
  const absoluteChange = currentPrice - previousPrice;
  const percentageChange = (absoluteChange / previousPrice) * 100;

  return {
    absoluteChange,
    percentageChange,
    trend: classifyTrend(percentageChange),
  };
}

/**
 * Get historical price records for a market/commodity,
 * sorted chronologically, limited to the last N days.
 */
export function getHistoricalPrices(
  prices: MarketPrice[],
  marketId: string,
  commodity: Commodity,
  days: number,
): MarketPrice[] {
  const filtered = prices
    .filter((p) => p.marketId === marketId && p.commodity === commodity)
    .sort((a, b) => a.date.localeCompare(b.date));

  return filtered.slice(-days);
}

/**
 * Fetch live market data from our internal API proxy.
 */
export async function fetchLiveMarketData(marketName: string): Promise<MarketPrice | null> {
  try {
    // We assume this is called client-side, so relative URL works
    const res = await fetch(`/api/market?market=${encodeURIComponent(marketName)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error("Failed to fetch live market data:", error);
    return null;
  }
}

/**
 * Combine static historical prices with a live price, ensuring no duplicate dates
 * and maintaining chronological order.
 */
export function combineWithLivePrice(
  historicalPrices: MarketPrice[],
  livePrice: MarketPrice | null
): MarketPrice[] {
  if (!livePrice) return historicalPrices;
  
  const combined = [...historicalPrices];
  
  const existingIndex = combined.findIndex(
    p => p.date === livePrice.date && p.commodity === livePrice.commodity && p.marketId === livePrice.marketId
  );
  
  if (existingIndex >= 0) {
    combined[existingIndex] = livePrice;
  } else {
    combined.push(livePrice);
  }
  
  return combined.sort((a, b) => a.date.localeCompare(b.date));
}
