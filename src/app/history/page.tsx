'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './history.module.css'

type Feeding = {
  id: string
  createdAt: string
  amount?: number
  notes?: string
}

export default function HistoryPage() {
  const [feedings, setFeedings] = useState<Feeding[]>([])
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadFeedings()
  }, [])

  const loadFeedings = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/feeding')
      const json = await res.json()
      setFeedings(json.data || [])
    } catch (err) {
      console.error('Failed to load feedings', err)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (iso: string) => {
    const date = new Date(iso)
    const now = new Date()
    const diffMins = Math.floor((now.getTime() - date.getTime()) / 60000)
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (iso: string) => {
    const date = new Date(iso)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Filter feedings
  const getFilteredFeedings = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today)
    weekAgo.setDate(weekAgo.getDate() - 7)

    return feedings.filter(f => {
      const feedDate = new Date(f.createdAt)
      if (filter === 'today') return feedDate >= today
      if (filter === 'week') return feedDate >= weekAgo
      return true
    })
  }

  const filteredFeedings = getFilteredFeedings()

  // Group by date
  const groupedFeedings = filteredFeedings.reduce((groups, feeding) => {
    const date = formatDate(feeding.createdAt)
    if (!groups[date]) groups[date] = []
    groups[date].push(feeding)
    return groups
  }, {} as Record<string, Feeding[]>)

  // Calculate stats
  const totalToday = feedings
    .filter(f => new Date(f.createdAt).toDateString() === new Date().toDateString())
    .reduce((s, f) => s + (f.amount || 0), 0)

  const totalWeek = feedings
    .filter(f => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return new Date(f.createdAt) >= weekAgo
    })
    .reduce((s, f) => s + (f.amount || 0), 0)

  const avgPerDay = feedings.length > 0 
    ? Math.round(feedings.reduce((s, f) => s + (f.amount || 0), 0) / Math.max(1, getDaysSinceFirst()))
    : 0

  function getDaysSinceFirst() {
    if (feedings.length === 0) return 1
    const first = new Date(feedings[feedings.length - 1].createdAt)
    const now = new Date()
    return Math.max(1, Math.ceil((now.getTime() - first.getTime()) / (1000 * 60 * 60 * 24)))
  }

  const lastFeeding = feedings.length
    ? formatTime(feedings.slice().sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))[0].createdAt)
    : '—'

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <Link href="/" className={styles.backBtn}>
            ← Back to Dashboard
          </Link>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Feeding History</h1>
            <p className={styles.subtitle}>Track all feeding activities and patterns</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📊</div>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Total Feedings</div>
              <div className={styles.statValue}>{feedings.length}</div>
              <div className={styles.statSubtext}>All time</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>📅</div>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Today's Total</div>
              <div className={styles.statValue}>{totalToday}g</div>
              <div className={styles.statSubtext}>
                {feedings.filter(f => new Date(f.createdAt).toDateString() === new Date().toDateString()).length} times
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>📈</div>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>This Week</div>
              <div className={styles.statValue}>{totalWeek}g</div>
              <div className={styles.statSubtext}>Last 7 days</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>⚖️</div>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Avg Per Day</div>
              <div className={styles.statValue}>{avgPerDay}g</div>
              <div className={styles.statSubtext}>Daily average</div>
            </div>
          </div>
        </div>

        {/* Chart Card */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Feeding Trends</h2>
            <div className={styles.badge}>Last 7 days</div>
          </div>
          <div className={styles.chartPlaceholder}>
            <div className={styles.chartIcon}>📊</div>
            <div className={styles.chartText}>Chart visualization coming soon</div>
            <div className={styles.chartSubtext}>Track daily feeding patterns and amounts</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterCard}>
          <div className={styles.filterTabs}>
            <button 
              className={`${styles.filterTab} ${filter === 'all' ? styles.filterTabActive : ''}`}
              onClick={() => setFilter('all')}
            >
              All Time
              <span className={styles.filterCount}>{feedings.length}</span>
            </button>
            <button 
              className={`${styles.filterTab} ${filter === 'week' ? styles.filterTabActive : ''}`}
              onClick={() => setFilter('week')}
            >
              This Week
              <span className={styles.filterCount}>
                {feedings.filter(f => {
                  const weekAgo = new Date()
                  weekAgo.setDate(weekAgo.getDate() - 7)
                  return new Date(f.createdAt) >= weekAgo
                }).length}
              </span>
            </button>
            <button 
              className={`${styles.filterTab} ${filter === 'today' ? styles.filterTabActive : ''}`}
              onClick={() => setFilter('today')}
            >
              Today
              <span className={styles.filterCount}>
                {feedings.filter(f => new Date(f.createdAt).toDateString() === new Date().toDateString()).length}
              </span>
            </button>
          </div>
        </div>

        {/* Feeding List */}
        <div className={styles.listCard}>
          <div className={styles.listHeader}>
            <h2 className={styles.listTitle}>Recent Feedings</h2>
            {filteredFeedings.length > 0 && (
              <div className={styles.listCount}>
                {filteredFeedings.length} record{filteredFeedings.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <div className={styles.loadingText}>Loading feedings...</div>
            </div>
          ) : filteredFeedings.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🍽️</div>
              <div className={styles.emptyText}>No feeding records found</div>
              <div className={styles.emptySubtext}>
                {filter !== 'all' 
                  ? 'Try changing the filter to see more records'
                  : 'Start by feeding your cat to see history here'
                }
              </div>
              <Link href="/feeding" className={styles.emptyBtn}>
                Go to Feeding
              </Link>
            </div>
          ) : (
            <div className={styles.feedingGroups}>
              {Object.entries(groupedFeedings).map(([date, items]) => (
                <div key={date} className={styles.feedingGroup}>
                  <div className={styles.groupDate}>{date}</div>
                  <div className={styles.groupItems}>
                    {items.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).map(feeding => (
                      <div key={feeding.id} className={styles.feedingItem}>
                        <div className={styles.feedingIcon}>🍽️</div>
                        <div className={styles.feedingContent}>
                          <div className={styles.feedingTop}>
                            <div className={styles.feedingAmount}>{feeding.amount || 0}g</div>
                            <div className={styles.feedingTime}>{formatTime(feeding.createdAt)}</div>
                          </div>
                          {feeding.notes && (
                            <div className={styles.feedingNotes}>{feeding.notes}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}