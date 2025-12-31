import { NextResponse } from 'next/server'

const cats = [
  { id: '1', name: 'Mimi', ageMonths: 24, weightKg: 4.2 },
]

export async function GET() {
  return NextResponse.json({ data: cats })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const newCat = { id: String(Date.now()), ...body }
  cats.push(newCat)
  return NextResponse.json({ data: newCat }, { status: 201 })
}
