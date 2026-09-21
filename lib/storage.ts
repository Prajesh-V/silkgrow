/**
 * SilkGrow — Storage Utility
 *
 * Wraps all localStorage operations with safe access patterns.
 * Handles server/client differences, missing values, malformed JSON,
 * unexpected object shapes, and storage failures.
 *
 * See: docs/ARCHITECTURE.md §8, docs/DATA_MODEL.md §30
 */

const STORAGE_KEYS = {
  USER: "silkgrow:user",
  SELECTED_MARKET: "silkgrow:selectedMarket",
  BOOKINGS: "silkgrow:bookings",
  FEEDING_LOGS: "silkgrow:feedingLogs",
  NOTIFICATIONS: "silkgrow:notificationState",
} as const;

/**
 * Check whether we are in a browser environment with localStorage access.
 */
function isClient(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

/**
 * Safely read and parse a JSON value from localStorage.
 * Returns null if the key is missing, the value is malformed, or
 * localStorage is unavailable.
 */
export function getStorageItem<T>(key: string): T | null {
  if (!isClient()) return null;

  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/**
 * Safely write a JSON value to localStorage.
 * Silently fails if localStorage is unavailable.
 */
export function setStorageItem<T>(key: string, value: T): void {
  if (!isClient()) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

/**
 * Remove a single key from localStorage.
 */
export function removeStorageItem(key: string): void {
  if (!isClient()) return;

  try {
    localStorage.removeItem(key);
  } catch {
    // Fail silently
  }
}

/**
 * Clear all SilkGrow-namespaced keys from localStorage.
 * Useful for development/demo reset.
 */
export function clearAllSilkGrowData(): void {
  if (!isClient()) return;

  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch {
    // Fail silently
  }
}

export { STORAGE_KEYS };
