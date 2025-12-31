import { NextResponse } from 'next/server'
import { calculateFood } from '../../../../utils/calculator'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { weightKg = 4, ageMonths = 24, activity = 'normal' } = body
  const grams = calculateFood(Number(weightKg), Number(ageMonths), activity)
  return NextResponse.json({ data: { grams } })
}
