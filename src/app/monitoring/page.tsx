import React from 'react'
import SensorStatus from '../../components/dashboard/SensorStatus'

export default function MonitoringPage() {
  return (
    <main style={{ padding: 16 }}>
      <h2>Monitoring</h2>
      <div style={{ display: 'flex', gap: 12 }}>
        <SensorStatus label="Weight" value="420 g" />
        <SensorStatus label="Last Eat" value="2 min ago" />
      </div>
    </main>
  )
}
