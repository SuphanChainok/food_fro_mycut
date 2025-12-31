import { NextResponse } from 'next/server'

const feedings: any[] = []

export async function GET() {
  return NextResponse.json({ data: feedings })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const record = { id: String(Date.now()), createdAt: new Date().toISOString(), ...body }
  feedings.push(record)
  return NextResponse.json({ data: record }, { status: 201 })
}
