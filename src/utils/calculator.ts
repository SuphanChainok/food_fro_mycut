// src/utils/calculator.ts

/**
 * Calculate daily food amount (grams)
 */
export function calculateFood(weightKg: number, ageMonths: number): number {
  if (weightKg <= 0 || ageMonths <= 0) return 0

  // kitten
  if (ageMonths < 12) {
    return Math.round(weightKg * 50)
  }

  // adult
  return Math.round(weightKg * 40)
}
