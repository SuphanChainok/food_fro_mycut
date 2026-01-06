// src/app/api/ai/route.ts

import { NextResponse } from 'next/server'
import { calculateFood } from '@/utils/calculator'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { weightKg, ageMonths } = body

  if (!weightKg || !ageMonths) {
    return NextResponse.json(
      { error: 'Missing weightKg or ageMonths' },
      { status: 400 }
    )
  }

  const amount = calculateFood(Number(weightKg), Number(ageMonths))

  return NextResponse.json({ amount })
}
