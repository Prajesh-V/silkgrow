/**
 * SilkGrow — Market Types
 *
 * Defines the data contracts for markets and market prices.
 * See: docs/DATA_MODEL.md §5, §6
 */

export interface Market {
  id: string;
  name: string;
  district?: string;
  state: string;
  country: string;
  isDemo: boolean;
}

export interface MarketPrice {
  id: string;
  marketId: string;
  commodity: "cocoon" | "silk";
  productName: string;
  date: string; // YYYY-MM-DD
  price: number;
  unit: string;
  minPrice?: number;
  maxPrice?: number;
  volume?: number;
  sourceType: "demo" | "government_market_feed";
  sourceUpdatedAt?: string;
}

export type Commodity = "cocoon" | "silk";

export type TrendState = "increasing" | "decreasing" | "stable";

export interface PriceChange {
  absoluteChange: number;
  percentageChange: number;
  trend: TrendState;
}
