/**
 * SilkGrow — Validation Utilities
 *
 * Centralized client-side validation for forms and booking quantities.
 *
 * See: docs/PRODUCT_REQUIREMENTS.md §3 (ONB-002), §7 (RES-003)
 */

/**
 * Validate that a name is non-empty after trimming.
 */
export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return "Name is required.";
  }
  return null;
}

/**
 * Validate an Indian phone number.
 * Accepts 10-digit numbers, optionally prefixed with +91 or 0.
 */
export function validatePhone(phone: string): string | null {
  const trimmed = phone.trim();
  if (trimmed.length === 0) {
    return "Phone number is required.";
  }

  // Strip optional prefix
  const cleaned = trimmed.replace(/^(\+91|0)/, "");

  if (!/^\d{10}$/.test(cleaned)) {
    return "Please enter a valid 10-digit phone number.";
  }

  return null;
}

/**
 * Validate a booking quantity against resource constraints.
 *
 * Rules (from DATA_MODEL.md §22):
 * - quantity > 0
 * - quantity >= minimumOrderQuantity
 * - quantity <= availableQuantity
 */
export function validateQuantity(
  quantity: number,
  minimumOrderQuantity: number,
  availableQuantity: number,
): string | null {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    return "Quantity must be a positive number.";
  }

  if (quantity < minimumOrderQuantity) {
    return `Minimum order quantity is ${minimumOrderQuantity}.`;
  }

  if (quantity > availableQuantity) {
    return `Only ${availableQuantity} available.`;
  }

  return null;
}
