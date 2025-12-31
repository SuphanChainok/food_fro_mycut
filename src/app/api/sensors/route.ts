import { NextResponse } from 'next/server'

const sensors: any[] = [
  { id: 'weight', value: 420, unit: 'g', updatedAt: new Date().toISOString() },
]

export async function GET() {
  return NextResponse.json({ data: sensors })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const record = { id: body.id || String(Date.now()), ...body, updatedAt: new Date().toISOString() }
  sensors.push(record)
  return NextResponse.json({ data: record }, { status: 201 })
}
