"use client"
import React, { useState } from 'react'

export default function ScheduleForm({ onSave }: { onSave?: (data: any) => void }) {
  const [time, setTime] = useState('08:00')
  const [amount, setAmount] = useState(20)

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave?.({ time, amount }) }}>
      <div style={{ marginBottom: 8 }}>
        <label>Time: <input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></label>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Amount (g): <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></label>
      </div>
      <button type="submit">Save</button>
    </form>
  )
}
