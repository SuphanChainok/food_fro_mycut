export function calculateFood(weightKg: number, ageMonths = 24, activity: 'low' | 'normal' | 'high' | string = 'normal') {
  // Resting Energy Requirement for cats: RER = 70 * weight(kg)^0.75
  const rer = 70 * Math.pow(Math.max(0.1, weightKg), 0.75)
  // Activity / life-stage multiplier
  let factor = 1.0
  if (ageMonths < 6) factor = 2.0 // growing kittens
  else if (activity === 'low') factor = 0.9
  else if (activity === 'high') factor = 1.3
  else factor = 1.0

  const kcalPerDay = rer * factor
  // Approximate kcal per gram for dry cat food ~4 kcal/g
  const gramsPerDay = Math.max(5, Math.round(kcalPerDay / 4))
  return gramsPerDay
}

export default calculateFood
