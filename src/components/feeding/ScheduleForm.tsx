"use client"
import React, { useState } from 'react'

export default function ScheduleForm({ onSave }: { onSave?: (data: any) => void }) {
  const [time, setTime] = useState('08:00')
  const [amount, setAmount] = useState(20)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave?.({ time, amount })
      }}
      style={{
        padding: 12,
        borderRadius: 12,
        background: '#fff',
        boxShadow: '0 6px 18px rgba(16,24,40,0.06)'
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', fontSize: 13, color: '#6b7280', marginBottom: 6 }}>Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', fontSize: 13, color: '#6b7280', marginBottom: 6 }}>Amount (g)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }}
        />
      </div>
      <div style={{ textAlign: 'right' }}>
        <button
          type="submit"
          style={{
            padding: '8px 12px',
            borderRadius: 10,
            background: 'linear-gradient(90deg, #7c3aed, #6d28d9)',
            color: '#fff',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Save
        </button>
      </div>
    </form>
  )
}
