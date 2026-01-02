import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
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
              <div className={styles.statValue}>2m ago</div>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statWarning}`}>
            <div className={styles.statIcon}>⚖️</div>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Food Level</div>
              <div className={styles.statValue}>68%</div>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.statInfo}`}>
            <div className={styles.statIcon}>⏰</div>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Next Feed</div>
              <div className={styles.statValue}>08:00</div>
            </div>
          </div>
        </div>

        {/* Main Info Card */}
        <div className={styles.mainCard}>
          <div className={styles.mainCardHeader}>
            <h2 className={styles.mainCardTitle}>Feeding Status</h2>
            <div className={styles.badge}>Real-time</div>
          </div>
          
          <div className={styles.progressSection}>
            <div className={styles.progressInfo}>
              <span className={styles.progressLabel}>Daily Progress</span>
              <span className={styles.progressValue}>3 / 4 meals</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Food Remaining</span>
              <span className={styles.detailValue}>420 g</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Avg. Portion</span>
              <span className={styles.detailValue}>140 g</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Today's Total</span>
              <span className={styles.detailValue}>420 g</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Battery</span>
              <span className={styles.detailValue}>92%</span>
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

            <Link href="/schedule" className={`${styles.actionBtn} ${styles.actionSecondary}`}>
              <div className={styles.actionIcon}>📅</div>
              <div className={styles.actionContent}>
                <div className={styles.actionLabel}>Schedule</div>
                <div className={styles.actionDesc}>Set feeding times</div>
              </div>
            </Link>

            <Link href="/history" className={`${styles.actionBtn} ${styles.actionSecondary}`}>
              <div className={styles.actionIcon}>📊</div>
              <div className={styles.actionContent}>
                <div className={styles.actionLabel}>History</div>
                <div className={styles.actionDesc}>View logs</div>
              </div>
            </Link>

            <Link href="/settings" className={`${styles.actionBtn} ${styles.actionSecondary}`}>
              <div className={styles.actionIcon}>⚙️</div>
              <div className={styles.actionContent}>
                <div className={styles.actionLabel}>Settings</div>
                <div className={styles.actionDesc}>Configure device</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className={styles.scheduleCard}>
          <div className={styles.scheduleHeader}>
            <h3 className={styles.scheduleTitle}>Today's Schedule</h3>
            <Link href="/schedule" className={styles.scheduleLink}>View all →</Link>
          </div>
          
          <div className={styles.scheduleList}>
            <div className={`${styles.scheduleItem} ${styles.completed}`}>
              <div className={styles.scheduleTime}>06:00</div>
              <div className={styles.scheduleContent}>
                <div className={styles.scheduleName}>Morning Feed</div>
                <div className={styles.scheduleAmount}>140 g</div>
              </div>
              <div className={styles.scheduleStatus}>✓</div>
            </div>

            <div className={`${styles.scheduleItem} ${styles.completed}`}>
              <div className={styles.scheduleTime}>12:00</div>
              <div className={styles.scheduleContent}>
                <div className={styles.scheduleName}>Lunch Feed</div>
                <div className={styles.scheduleAmount}>140 g</div>
              </div>
              <div className={styles.scheduleStatus}>✓</div>
            </div>

            <div className={`${styles.scheduleItem} ${styles.completed}`}>
              <div className={styles.scheduleTime}>18:00</div>
              <div className={styles.scheduleContent}>
                <div className={styles.scheduleName}>Dinner Feed</div>
                <div className={styles.scheduleAmount}>140 g</div>
              </div>
              <div className={styles.scheduleStatus}>✓</div>
            </div>

            <div className={`${styles.scheduleItem} ${styles.upcoming}`}>
              <div className={styles.scheduleTime}>22:00</div>
              <div className={styles.scheduleContent}>
                <div className={styles.scheduleName}>Night Feed</div>
                <div className={styles.scheduleAmount}>140 g</div>
              </div>
              <div className={styles.scheduleStatus}>⏱</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}