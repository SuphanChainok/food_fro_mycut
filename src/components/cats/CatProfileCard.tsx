"use client"
import React from 'react'

export default function CatProfileCard({ cat }: { cat: any }) {
  return (
    <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 6 }}>
      <div style={{ fontWeight: 700 }}>{cat?.name}</div>
      <div>Age: {cat?.ageMonths} months</div>
      <div>Weight: {cat?.weightKg} kg</div>
    </div>
  )
}
