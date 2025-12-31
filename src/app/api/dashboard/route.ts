import { NextResponse } from 'next/server'

export async function GET() {
  const summary = {
    catsCount: 1,
    lastFeeding: new Date().toISOString(),
    lastWeightGr: 420,
  }
  return NextResponse.json({ data: summary })
}
