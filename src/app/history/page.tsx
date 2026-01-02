'use client'
import React, { useEffect, useState } from 'react'
import StatusCard from '../../components/dashboard/StatusCard'
import FeedingChart from '../../components/dashboard/FeedingChart'
import styles from './history.module.css'

type Feeding = {
  id: string
  createdAt: string
  amount?: number
  notes?: string
}

export default function HistoryPage() {
  const [feedings, setFeedings] = useState<Feeding[]>([])

  useEffect(() => {
    loadFeedings()
  }, [])

  const loadFeedings = async () => {
    try {
      const res = await fetch('/api/feeding')
      const json = await res.json()
      setFeedings(json.data || [])
    } catch (err) {
      console.error('Failed to load feedings', err)
    }
  }

  const formatTime = (iso: string) => {
    const date = new Date(iso)
    const now = new Date()
    const diffMins = Math.floor((now.getTime() - date.getTime()) / 60000)
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
    return date.toLocaleString()
  }

  const totalToday = feedings
    .filter(f => new Date(f.createdAt).toDateString() === new Date().toDateString())
    .reduce((s, f) => s + (f.amount || 0), 0)

  const lastFeeding = feedings.length
    ? formatTime(feedings.slice().sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))[0].createdAt)
    : '—'

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>History</h2>

      <div className={styles.statusGrid}>
        <StatusCard title="Total Feedings" value={feedings.length} />
        <StatusCard title="Today's Total" value={`${totalToday} g`} />
        <StatusCard title="Last Feeding" value={lastFeeding} />
      </div>

      <div className={styles.chartWrapper}>
        <FeedingChart />
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>Recent Feedings</div>

        {feedings.length === 0 ? (
          <div className={styles.emptyText}>No feeding records yet — start by feeding your cat.</div>
        ) : (
          <div className={styles.feedList}>
            {feedings.slice().reverse().map(f => (
              <div key={f.id} className={styles.feedItem}>
                <div className={styles.feedLeft}>
                  <div className={styles.feedAmount}>{f.amount || 0} g</div>
                  {f.notes && <div className={styles.feedNotes}>{f.notes}</div>}
                </div>
                <div className={styles.feedTime}>{formatTime(f.createdAt)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
