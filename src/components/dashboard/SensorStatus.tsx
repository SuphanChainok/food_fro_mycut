"use client"
import React from 'react'

export default function SensorStatus({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ padding: 8 }}>
      <div style={{ fontSize: 12, color: '#666' }}>{label}</div>
      <div style={{ fontSize: 16 }}>{value}</div>
    </div>
  )
}
