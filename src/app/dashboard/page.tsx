'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './dashboard.module.css'

type Feeding = {
  id: string
  createdAt: string
  amount?: number
}

export default function DashboardPage() {
  const [feedings, setFeedings] = useState<Feeding[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // Calculate stats
  const totalToday = feedings
    .filter(f => new Date(f.createdAt).toDateString() === new Date().toDateString())
    .reduce((s, f) => s + (f.amount || 0), 0)

  const feedingsToday = feedings.filter(f => 
    new Date(f.createdAt).toDateString() === new Date().toDateString()
  ).length

  const lastFeeding = feedings.length > 0
    ? formatTime(feedings.slice().sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))[0].createdAt)
    : '—'

  const weekTotal = feedings
    .filter(f => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return new Date(f.createdAt) >= weekAgo
    })
    .reduce((s, f) => s + (f.amount || 0), 0)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              <span className={styles.avatarIcon}>🐱</span>
            </div>
            <div className={styles.statusDot}></div>
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Cat Feeder Pro</h1>
            <div className={styles.subtitle}>
              <span className={styles.subtitleText}>Smart feeding system</span>
              <span className={styles.chip}>
                <span className={styles.chipDot}></span>
                AUTO MODE
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.statPrimary}`}>
            <div className={styles.statIcon}>🐾</div>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Active Cats</div>
              <div className={styles.statValue}>1</div>
            </div>
          </div>
          
          <div className={`${styles.statCard} ${styles.statSuccess}`}>
            <div className={styles.statIcon}>✓</div>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Last Feed</div>
              <div className={styles.statValue}>{lastFeeding}</div>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statWarning}`}>
            <div className={styles.statIcon}>⚖️</div>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Today's Total</div>
              <div className={styles.statValue}>{totalToday}g</div>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statInfo}`}>
            <div className={styles.statIcon}>📊</div>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>This Week</div>
              <div className={styles.statValue}>{weekTotal}g</div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className={styles.mainGrid}>
          
          {/* Left Column */}
          <div className={styles.leftColumn}>
            
            {/* Today's Progress */}
            <div className={styles.progressCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Today's Progress</h2>
                <div className={styles.badge}>Live</div>
              </div>
              
              <div className={styles.progressSection}>
                <div className={styles.progressInfo}>
                  <span className={styles.progressLabel}>Daily Goal</span>
                  <span className={styles.progressValue}>{feedingsToday} / 4 meals</span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${Math.min((feedingsToday / 4) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Total Amount</span>
                  <span className={styles.detailValue}>{totalToday}g</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Times Fed</span>
                  <span className={styles.detailValue}>{feedingsToday}x</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.actionsCard}>
              <h3 className={styles.actionsTitle}>Quick Actions</h3>
              <div className={styles.actionsGrid}>
                <Link href="/feeding" className={`${styles.actionBtn} ${styles.actionPrimary}`}>
                  <div className={styles.actionIcon}>🍽</div>
                  <div className={styles.actionContent}>
                    <div className={styles.actionLabel}>Feed Now</div>
                    <div className={styles.actionDesc}>Instant feeding</div>
                  </div>
                </Link>

                <Link href="/feeding" className={`${styles.actionBtn} ${styles.actionSecondary}`}>
                  <div className={styles.actionIcon}>📅</div>
                  <div className={styles.actionContent}>
                    <div className={styles.actionLabel}>Schedule</div>
                    <div className={styles.actionDesc}>Set times</div>
                  </div>
                </Link>

                <Link href="/history" className={`${styles.actionBtn} ${styles.actionSecondary}`}>
                  <div className={styles.actionIcon}>📊</div>
                  <div className={styles.actionContent}>
                    <div className={styles.actionLabel}>History</div>
                    <div className={styles.actionDesc}>View logs</div>
                  </div>
                </Link>

                <Link href="/cats" className={`${styles.actionBtn} ${styles.actionSecondary}`}>
                  <div className={styles.actionIcon}>🐱</div>
                  <div className={styles.actionContent}>
                    <div className={styles.actionLabel}>My Cats</div>
                    <div className={styles.actionDesc}>Manage cats</div>
                  </div>
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            
            {/* Chart Card */}
            <div className={styles.chartCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Weekly Overview</h2>
                <div className={styles.badge}>Last 7 days</div>
              </div>
              <div className={styles.chartPlaceholder}>
                <div className={styles.chartIcon}>📈</div>
                <div className={styles.chartText}>Feeding trends</div>
                <div className={styles.chartSubtext}>Track daily patterns</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className={styles.activityCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Recent Activity</h2>
                <Link href="/history" className={styles.viewAllLink}>View all →</Link>
              </div>

              {isLoading ? (
                <div className={styles.loadingState}>
                  <div className={styles.spinner}></div>
                  <div className={styles.loadingText}>Loading...</div>
                </div>
              ) : feedings.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>🍽️</div>
                  <div className={styles.emptyText}>No activity yet</div>
                  <div className={styles.emptySubtext}>Start feeding to see history</div>
                </div>
              ) : (
                <div className={styles.activityList}>
                  {feedings
                    .slice()
                    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
                    .slice(0, 5)
                    .map(feeding => (
                      <div key={feeding.id} className={styles.activityItem}>
                        <div className={styles.activityIcon}>🍽️</div>
                        <div className={styles.activityContent}>
                          <div className={styles.activityAmount}>{feeding.amount || 0}g</div>
                          <div className={styles.activityTime}>{formatTime(feeding.createdAt)}</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}