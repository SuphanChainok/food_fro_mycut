import Link from 'next/link'
import styles from './page.module.css'
import StatusCard from '../components/dashboard/StatusCard'

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles['avatar-row']}>
            <div className={styles.avatar} aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C10 2 8.5 3 7.5 4.5C6.5 3 5 2 3 2C4.5 4 5 6 5 8.5C5 12 8 15 12 15C16 15 19 12 19 8.5C19 6 19.5 4 21 2C19 2 17.5 3 16.5 4.5C15.5 3 14 2 12 2Z" stroke="#6d28d9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <div className={styles.title}>Cat Feeder</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className={styles.subtitle}>Smart feeding — glanceable</div>
                <div className={styles.chip}>Auto</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles['card-grid']}>
          <div className={styles.card}>
            <StatusCard title="Cats" value={1} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 11c1-3 4-5 8-5s7 2 8 5" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
          </div>
          <div className={styles.card}>
            <StatusCard title="Last Feed" value="Just now" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
          </div>
        </div>

        <div className={styles['card-grid']}>
          <div className={styles.card}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Weight</div>
            <div style={{ fontSize: 20 }}>420 g</div>
          </div>
          <div className={styles.card}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Next Feeding</div>
            <div style={{ fontSize: 16, color: '#6b7280' }}>08:00</div>
          </div>
        </div>

        <div className={styles['big-cta']}>
          <Link href="/feeding" className={styles['btn'] + ' ' + styles['icon']}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6 }}><path d="M12 2v20" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 12h14" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Feed Now
          </Link>
          <Link href="/feeding" className={styles['btn'] + ' ' + styles['secondary'] + ' ' + styles['icon']}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6 }}><path d="M12 6v6l4 2" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Schedule
          </Link>
        </div>
      </div>
    </div>
  )
}
