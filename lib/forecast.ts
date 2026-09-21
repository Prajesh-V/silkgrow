/**
 * SilkGrow — Forecast Utilities
 *
 * Centralized forecast business logic: lookup, trend, favorable window,
 * and insight generation.
 *
 * See: docs/ARCHITECTURE.md §10, §15
 * See: docs/DATA_MODEL.md §12–§17
 */

import type { Forecast, ForecastPoint, TrendState } from "@/types";

/** Trend threshold for forecast direction (reuses ±1% convention) */
const FORECAST_TREND_THRESHOLD = 1;

/**
 * Look up the forecast for a given market.
 */
export function getForecast(
  forecasts: Forecast[],
  marketId: string,
): Forecast | null {
  return forecasts.find((f) => f.marketId === marketId) ?? null;
}

/**
 * Determine the forecast trend direction.
 *
 * Compares first vs last forecast point (DATA_MODEL.md §15).
 */
export function getForecastTrend(forecast: ForecastPoint[]): TrendState {
  if (forecast.length < 2) return "stable";

  const first = forecast[0].predictedPrice;
  const last = forecast[forecast.length - 1].predictedPrice;
  const percentageChange = ((last - first) / first) * 100;

  if (percentageChange > FORECAST_TREND_THRESHOLD) return "increasing";
  if (percentageChange < -FORECAST_TREND_THRESHOLD) return "decreasing";
  return "stable";
}

/**
 * Calculate the predicted favorable selling window.
 *
 * Identifies the contiguous period of forecast points where
 * the predicted price is above the current market price.
 *
 * See: docs/DATA_MODEL.md §16
 */
export function getFavorableWindow(
  forecast: ForecastPoint[],
  currentPrice: number,
): { startDate: string; endDate: string } | null {
  const aboveCurrent = forecast.filter(
    (p) => p.predictedPrice > currentPrice,
  );

  if (aboveCurrent.length === 0) return null;

  // Find the longest contiguous block above current price
  let bestStart = 0;
  let bestLength = 1;
  let currentStart = 0;
  let currentLength = 1;

  for (let i = 1; i < aboveCurrent.length; i++) {
    const prevDate = new Date(aboveCurrent[i - 1].date);
    const currDate = new Date(aboveCurrent[i].date);
    const dayDiff =
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);

    if (dayDiff <= 1) {
      currentLength++;
    } else {
      if (currentLength > bestLength) {
        bestStart = currentStart;
        bestLength = currentLength;
      }
      currentStart = i;
      currentLength = 1;
    }
  }

  if (currentLength > bestLength) {
    bestStart = currentStart;
    bestLength = currentLength;
  }

  return {
    startDate: aboveCurrent[bestStart].date,
    endDate: aboveCurrent[bestStart + bestLength - 1].date,
  };
}

/**
 * Generate a simple forecast insight text based on trend direction.
 *
 * See: docs/DATA_MODEL.md §17
 * Never invents causal explanations not supported by the data.
 */
export function generateForecastInsight(trend: TrendState): string {
  switch (trend) {
    case "increasing":
      return "The forecast indicates a short-term upward movement compared with the current market price.";
    case "decreasing":
      return "The forecast indicates a short-term downward movement compared with the current market price.";
    case "stable":
      return "The forecast indicates relatively stable prices in the short term.";
  }
}
