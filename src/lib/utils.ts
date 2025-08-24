import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a price in paise into a currency string (e.g., 2999 -> ₹29.99).
 * @param priceInPaise The price in the smallest currency unit (paise).
 * @returns A formatted string representing the price in Rupees.
 */
export function formatPrice(priceInPaise: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(priceInPaise / 100);
}
