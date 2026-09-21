/**
 * SilkGrow — Forecast Types
 *
 * Defines the stable forecast contract consumed by the frontend.
 * See: docs/DATA_MODEL.md §12, §13
 */

export interface ForecastPoint {
  date: string; // YYYY-MM-DD
  predictedPrice: number;
}

export interface Forecast {
  id: string;
  marketId: string;
  commodity: "cocoon";
  generatedAt: string; // YYYY-MM-DD
  forecastHorizonDays: number;
  forecast: ForecastPoint[];
  sourceType: "offline_lstm_demo";
}
