/**
 * SilkGrow — Resource Utilities
 *
 * Centralized logic for resource access and filtering.
 */

import type { Resource, Supplier } from "@/types/resource";
import resourcesData from "@/data/resources.json";
import suppliersData from "@/data/suppliers.json";

export function getResources(): Resource[] {
  return resourcesData as Resource[];
}

export function getSuppliers(): Supplier[] {
  return suppliersData as Supplier[];
}

export function getResourceById(id: string): Resource | null {
  return getResources().find(r => r.id === id) || null;
}

export function getSupplierById(id: string): Supplier | null {
  return getSuppliers().find(s => s.id === id) || null;
}

export function filterResources(category: string): Resource[] {
  if (!category || category === "all") {
    return getResources();
  }
  return getResources().filter(r => r.category === category);
}
