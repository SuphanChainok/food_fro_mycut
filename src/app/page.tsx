import Link from 'next/link'
import styles from './page.module.css'
import StatusCard from '../components/dashboard/StatusCard'

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.hero}>
          <div className={styles['avatar-row']}>
            <div className={styles.avatar}>
              🐱
            </div>
            <div>
              <div className={styles.title}>Cat Feeder</div>
              <div className={styles.subtitle}>
                Smart feeding <span className={styles.chip}>AUTO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className={styles['card-grid']}>
          <div className={styles.card}>
            <StatusCard title="Cats" value={1} />
          </div>
          <div className={styles.card}>
            <StatusCard title="Last Feed" value="Just now" />
          </div>
        </div>

        {/* Info */}
        <div className={styles['card-grid']}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Food Weight</div>
            <div className={styles.cardValue}>420 g</div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Next Feeding</div>
            <div className={styles.cardValue}>08:00</div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.bigCta}>
          <Link href="/feeding" className={`${styles.btn} ${styles.primary}`}>
            🍽 Feed Now
          </Link>
          <Link href="/feeding" className={`${styles.btn} ${styles.secondary}`}>
            ⏰ Schedule
          </Link>
        </div>

      </div>
    </div>
  )
}
