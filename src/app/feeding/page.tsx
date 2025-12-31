"use client"
import React from 'react'
import FeedButton from '../../components/feeding/FeedButton'
import ScheduleForm from '../../components/feeding/ScheduleForm'

export default function FeedingPage() {
  return (
    <main style={{ padding: 16 }}>
      <h2>Feeding</h2>
      <div style={{ display: 'flex', gap: 12 }}>
        <FeedButton onClick={() => alert('Feed triggered (simulated)')} />
        <div style={{ width: 320 }}>
          <ScheduleForm onSave={(d) => alert('Saved: ' + JSON.stringify(d))} />
        </div>
      </div>
    </main>
  )
}
