/**
 * SilkGrow — Booking Types
 *
 * Defines the data contract for demonstration bookings.
 * See: docs/DATA_MODEL.md §24
 */

export type BookingStatus =
  | "confirmed"
  | "processing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface Booking {
  id: string;
  resourceId: string;
  supplierId: string;
  resourceNameSnapshot: string;
  supplierNameSnapshot: string;
  quantity: number;
  unitPrice: number;
  total: number;
  bookingDate: string; // YYYY-MM-DD
  estimatedDelivery: string;
  status: BookingStatus;
}
