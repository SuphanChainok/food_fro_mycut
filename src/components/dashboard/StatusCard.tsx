"use client"
import React from 'react'

export default function StatusCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 6 }}>
      <div style={{ fontSize: 12, color: '#666' }}>{title}</div>
      <div style={{ fontSize: 20, fontWeight: 600 }}>{value}</div>
    </div>
  )
}
