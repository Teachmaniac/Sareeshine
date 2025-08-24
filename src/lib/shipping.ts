/**
 * This file contains the shipping cost calculation logic based on destination state.
 * The costs are based on Speed Post tariffs for a 201-500g parcel.
 * All charges are in cents (e.g., 3000 for ₹30).
 */

export const IndianStates = [
  'Andaman & Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra & Nagar Haveli and Daman & Diu',
  'NCT of Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const shippingRates: Record<string, number> = {
  // Local & Up to 200 km (₹30-₹50)
  Telangana: 5000,

  // 201–1000 km (₹60)
  'Andhra Pradesh': 6000,
  Karnataka: 6000,
  'Tamil Nadu': 6000,
  Kerala: 6000,
  Maharashtra: 6000,
  Goa: 6000,
  Gujarat: 6000,
  'Madhya Pradesh': 6000,
  Chhattisgarh: 6000,
  Odisha: 6000,
  'Dadra & Nagar Haveli and Daman & Diu': 6000,
  Lakshadweep: 6000,
  Puducherry: 6000,

  // 1001–2000 km (₹80)
  'West Bengal': 8000,
  Bihar: 8000,
  Jharkhand: 8000,
  'Uttar Pradesh': 8000,
  Uttarakhand: 8000,
  Rajasthan: 8000,
  Haryana: 8000,
  'NCT of Delhi': 8000,
  Punjab: 8000,
  Chandigarh: 8000, // Can be ₹80-₹90, taking lower end.

  // Above 2000 km (₹90)
  'Himachal Pradesh': 9000,
  'Jammu & Kashmir': 9000,
  Ladakh: 9000,
  Assam: 9000,
  'Arunachal Pradesh': 9000,
  Manipur: 9000,
  Meghalaya: 9000,
  Mizoram: 9000,
  Nagaland: 9000,
  Tripura: 9000,
  Sikkim: 9000,
  'Andaman & Nicobar Islands': 9000,
};

/**
 * Calculates the shipping cost for a given state.
 * @param {string} state The destination state.
 * @returns {number} The shipping cost in cents, or a default if the state is not found.
 */
export function getShippingCost(state: string): number {
  return shippingRates[state] || 8000; // Default to a mid-range price if state not found
}
