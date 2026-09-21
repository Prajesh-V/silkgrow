/**
 * SilkGrow — User Types
 *
 * Defines the demo user session contract.
 * See: docs/DATA_MODEL.md §29
 */

export interface DemoUser {
  name: string;
  phone: string;
  marketId: string;
  createdAt: string; // ISO date string
}
