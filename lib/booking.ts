/**
 * SilkGrow — Booking Utilities
 *
 * Centralized booking logic: ID generation, total calculation,
 * booking creation, and local persistence.
 *
 * See: docs/ARCHITECTURE.md §12, §15
 * See: docs/DATA_MODEL.md §24–§28
 */

import type { Booking, BookingStatus } from "@/types";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "./storage";

/**
 * Generate a readable booking ID in the format SG-XXXXX.
 * Avoids duplicates within the current booking collection.
 *
 * See: docs/DATA_MODEL.md §27
 */
export function generateBookingId(existingBookings: Booking[]): string {
  const existingIds = new Set(existingBookings.map((b) => b.id));

  let id: string;
  do {
    const num = Math.floor(10000 + Math.random() * 90000);
    id = `SG-${num}`;
  } while (existingIds.has(id));

  return id;
}

/**
 * Calculate the booking total.
 *
 * Rule (DATA_MODEL.md §26): total = unitPrice × quantity
 */
export function calculateTotal(unitPrice: number, quantity: number): number {
  return unitPrice * quantity;
}

/**
 * Create a new booking record.
 */
export function createBooking(params: {
  resourceId: string;
  supplierId: string;
  resourceName: string;
  supplierName: string;
  quantity: number;
  unitPrice: number;
  estimatedDelivery: string;
  existingBookings: Booking[];
}): Booking {
  const id = generateBookingId(params.existingBookings);
  const total = calculateTotal(params.unitPrice, params.quantity);
  const bookingDate = new Date().toISOString().split("T")[0];

  return {
    id,
    resourceId: params.resourceId,
    supplierId: params.supplierId,
    resourceNameSnapshot: params.resourceName,
    supplierNameSnapshot: params.supplierName,
    quantity: params.quantity,
    unitPrice: params.unitPrice,
    total,
    bookingDate,
    estimatedDelivery: params.estimatedDelivery,
    status: "confirmed" as BookingStatus,
  };
}

/**
 * Load bookings from localStorage.
 */
export function loadBookings(): Booking[] {
  return getStorageItem<Booking[]>(STORAGE_KEYS.BOOKINGS) ?? [];
}

/**
 * Save bookings to localStorage.
 */
export function saveBookings(bookings: Booking[]): void {
  setStorageItem(STORAGE_KEYS.BOOKINGS, bookings);
}

/**
 * Add a new booking to localStorage.
 */
export function persistBooking(booking: Booking): void {
  const existing = loadBookings();
  existing.push(booking);
  saveBookings(existing);
}
