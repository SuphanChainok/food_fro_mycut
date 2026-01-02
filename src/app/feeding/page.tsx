"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import styles from './feeding.module.css'


export default function FeedingPage() {
  const [amount, setAmount] = useState(140)
  const [isFeeding, setIsFeeding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Schedule form state
  const [schedules, setSchedules] = useState([
    { id: 1, time: '06:00', amount: 140, enabled: true },
    { id: 2, time: '12:00', amount: 140, enabled: true },
    { id: 3, time: '18:00', amount: 140, enabled: true },
  ])
  const [newTime, setNewTime] = useState('08:00')
  const [newAmount, setNewAmount] = useState(140)

  const handleFeedNow = async () => {
    setIsFeeding(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsFeeding(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleAddSchedule = () => {
    if (!newTime) return
    
    const newSchedule = {
      id: Date.now(),
      time: newTime,
      amount: newAmount,
      enabled: true
    }
    
    setSchedules([...schedules, newSchedule].sort((a, b) => 
      a.time.localeCompare(b.time)
    ))
    
    setNewTime('08:00')
    setNewAmount(140)
  }

  const handleToggleSchedule = (id: number) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ))
  }

  const handleDeleteSchedule = (id: number) => {
    setSchedules(schedules.filter(s => s.id !== id))
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <Link href="/" className={styles.backBtn}>
            ← Back to Dashboard
          </Link>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Feeding Control</h1>
            <p className={styles.subtitle}>Manage manual feeding and automatic schedules</p>
          </div>
        </div>

        {/* Success Banner */}
        {showSuccess && (
          <div className={styles.successBanner}>
            <span className={styles.successIcon}>✓</span>
            <span className={styles.successText}>Fed successfully! Your cat is happy 🐱</span>
          </div>
        )}

        <div className={styles.mainGrid}>
          
          {/* Left Column - Manual Feed */}
          <div className={styles.leftColumn}>
            
            {/* Manual Feed Card */}
            <div className={styles.feedCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>🍽️</div>
                <div>
                  <h2 className={styles.cardTitle}>Manual Feed</h2>
                  <p className={styles.cardSubtitle}>Feed your cat instantly</p>
                </div>
              </div>

              <div className={styles.amountSelector}>
                <label className={styles.label}>Food Amount (grams)</label>
                <div className={styles.amountControl}>
                  <button 
                    className={styles.amountBtn}
                    onClick={() => setAmount(Math.max(10, amount - 10))}
                  >
                    −
                  </button>
                  <div className={styles.amountDisplay}>{amount}g</div>
                  <button 
                    className={styles.amountBtn}
                    onClick={() => setAmount(amount + 10)}
                  >
                    +
                  </button>
                </div>

                <div className={styles.quickAmounts}>
                  {[50, 100, 140, 200].map(val => (
                    <button
                      key={val}
                      className={`${styles.quickBtn} ${amount === val ? styles.quickBtnActive : ''}`}
                      onClick={() => setAmount(val)}
                    >
                      {val}g
                    </button>
                  ))}
                </div>
              </div>

              <button
                className={styles.feedNowBtn}
                onClick={handleFeedNow}
                disabled={isFeeding}
              >
                {isFeeding ? (
                  <>
                    <span className={styles.spinner}></span>
                    Feeding...
                  </>
                ) : (
                  <>
                    <span className={styles.btnIcon}>🍽️</span>
                    Feed Now
                  </>
                )}
              </button>

              <div className={styles.infoBox}>
                <span className={styles.infoIcon}>ℹ️</span>
                <span className={styles.infoText}>This will dispense food immediately</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📅</div>
                <div>
                  <div className={styles.statLabel}>Today's Feeds</div>
                  <div className={styles.statValue}>3 times</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>⚖️</div>
                <div>
                  <div className={styles.statLabel}>Total Amount</div>
                  <div className={styles.statValue}>420 g</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Schedule */}
          <div className={styles.rightColumn}>
            
            {/* Add Schedule Card */}
            <div className={styles.scheduleCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>⏰</div>
                <div>
                  <h2 className={styles.cardTitle}>Schedule</h2>
                  <p className={styles.cardSubtitle}>Automatic feeding times</p>
                </div>
              </div>

              {/* Add New Schedule */}
              <div className={styles.addScheduleForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Time</label>
                    <input
                      type="time"
                      className={styles.timeInput}
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Amount</label>
                    <input
                      type="number"
                      className={styles.numberInput}
                      value={newAmount}
                      onChange={(e) => setNewAmount(parseInt(e.target.value) || 0)}
                      min="10"
                      step="10"
                    />
                  </div>
                </div>
                <button 
                  className={styles.addBtn}
                  onClick={handleAddSchedule}
                >
                  <span>+</span>
                  Add Schedule
                </button>
              </div>

              {/* Schedule List */}
              <div className={styles.scheduleList}>
                <div className={styles.scheduleListHeader}>
                  <span className={styles.scheduleCount}>
                    {schedules.length} schedule{schedules.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {schedules.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📅</div>
                    <div className={styles.emptyText}>No schedules yet</div>
                    <div className={styles.emptySubtext}>Add your first feeding schedule above</div>
                  </div>
                ) : (
                  <div className={styles.scheduleItems}>
                    {schedules.map((schedule) => (
                      <div 
                        key={schedule.id} 
                        className={`${styles.scheduleItem} ${!schedule.enabled ? styles.scheduleItemDisabled : ''}`}
                      >
                        <div className={styles.scheduleTime}>
                          <span className={styles.timeText}>{schedule.time}</span>
                          <span className={styles.amountText}>{schedule.amount}g</span>
                        </div>
                        <div className={styles.scheduleActions}>
                          <button
                            className={`${styles.toggleBtn} ${schedule.enabled ? styles.toggleBtnActive : ''}`}
                            onClick={() => handleToggleSchedule(schedule.id)}
                            title={schedule.enabled ? 'Disable' : 'Enable'}
                          >
                            {schedule.enabled ? '●' : '○'}
                          </button>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDeleteSchedule(schedule.id)}
                            title="Delete"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}