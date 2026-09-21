/**
 * SilkGrow — Formatting Utilities
 *
 * Presentation-layer formatting for prices, dates, and percentages.
 * Business logic (calculation) belongs in domain-specific modules.
 * This module handles display formatting only.
 *
 * See: docs/DATA_MODEL.md §10, §23
 */

/**
 * Format a numeric price with the Indian Rupee symbol.
 * Uses Intl.NumberFormat for locale-aware comma grouping.
 *
 * @example formatPrice(6842) → "₹6,842"
 * @example formatPrice(48) → "₹48"
 */
export function formatPrice(price: number): string {
  return `₹${new Intl.NumberFormat("en-IN").format(price)}`;
}

/**
 * Format a price with its unit.
 *
 * @example formatPriceWithUnit(742, "kg") → "₹742 / kg"
 */
export function formatPriceWithUnit(price: number, unit: string): string {
  return `${formatPrice(price)} / ${unit}`;
}

/**
 * Format a percentage change for display.
 * Includes sign prefix and single-decimal precision.
 *
 * @example formatPercentage(4.2) → "+4.2%"
 * @example formatPercentage(-1.5) → "-1.5%"
 * @example formatPercentage(0) → "0.0%"
 */
export function formatPercentage(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

/**
 * Format an ISO date string (YYYY-MM-DD) into a human-readable format.
 *
 * @example formatDate("2026-09-20") → "20 September 2026"
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format an ISO date string into a short format for chart axes.
 *
 * @example formatShortDate("2026-09-20") → "20 Sep"
 */
export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}
