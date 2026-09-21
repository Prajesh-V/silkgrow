/**
 * SilkGrow — Resource Types
 *
 * Defines the data contracts for sericulture resources and suppliers.
 * See: docs/DATA_MODEL.md §18, §19
 */

export interface Supplier {
  id: string;
  name: string;
  location: string;
  deliveryEstimate: string;
  isDemo: boolean;
}

export type ResourceStatus = "available" | "limited" | "unavailable";

export type ResourceCategory =
  | "mulberry-leaves"
  | "cocoons"
  | "rearing-equipment"
  | "disinfectants"
  | "other";

export interface Resource {
  id: string;
  name: string;
  category: ResourceCategory;
  description: string;
  image?: string;
  supplierId: string;
  price: number;
  unit: string;
  availableQuantity: number;
  minimumOrderQuantity: number;
  deliveryEstimate: string;
  status: ResourceStatus;
  isDemo: boolean;
}
