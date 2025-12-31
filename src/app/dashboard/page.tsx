import React from 'react'
import StatusCard from '../../components/dashboard/StatusCard'
import FeedingChart from '../../components/dashboard/FeedingChart'

export default function DashboardPage() {
  return (
    <main style={{ padding: 16 }}>
      <h2>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <StatusCard title="Cats" value={1} />
        <StatusCard title="Last Feeding" value="Just now" />
        <StatusCard title="Weight (g)" value={420} />
      </div>
      <div style={{ marginTop: 16 }}>
        <FeedingChart />
      </div>
    </main>
  )
}
