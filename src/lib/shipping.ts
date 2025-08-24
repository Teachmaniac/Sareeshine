/**
 * This file contains the shipping cost calculation logic based on destination state.
 * The costs are based on Speed Post tariffs for a 201-500g parcel.
 * All charges are in whole Rupees (e.g., 60 for ₹60).
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

// Rates based on the user-provided table for a 201-500g parcel from Hyderabad.
const shippingRates: Record<string, number> = {
  // Local / Up to 200 km (₹30-₹50)
  Telangana: 50, // Taking higher end of range

  // 201–1000 km (₹60)
  'Andhra Pradesh': 60,
  Karnataka: 60,
  'Tamil Nadu': 60,
  Kerala: 60,
  Maharashtra: 60,
  Goa: 60,
  Gujarat: 60,
  'Madhya Pradesh': 60,
  Chhattisgarh: 60,
  Odisha: 60,
  'Dadra & Nagar Haveli and Daman & Diu': 60,
  Lakshadweep: 60,
  Puducherry: 60,

  // 1001–2000 km (₹80)
  'West Bengal': 80,
  Bihar: 80,
  Jharkhand: 80,
  'Uttar Pradesh': 80,
  Uttarakhand: 80,
  Rajasthan: 80,
  Haryana: 80,
  'NCT of Delhi': 80,
  Punjab: 80,
  Chandigarh: 80, // Taking lower end of ₹80-₹90 range

  // Above 2000 km (₹90)
  'Himachal Pradesh': 90,
  'Jammu & Kashmir': 90,
  Ladakh: 90,
  Assam: 90,
  'Arunachal Pradesh': 90,
  Manipur: 90,
  Meghalaya: 90,
  Mizoram: 90,
  Nagaland: 90,
  Tripura: 90,
  Sikkim: 90,
  'Andaman & Nicobar Islands': 90,
};

/**
 * Calculates the shipping cost for a given state.
 * @param {string} state The destination state.
 * @returns {number} The shipping cost in Rupees, or a default if the state is not found.
 */
export function getShippingCost(state: string): number {
  return shippingRates[state] || 80; // Default to a mid-range price if state not found
}
