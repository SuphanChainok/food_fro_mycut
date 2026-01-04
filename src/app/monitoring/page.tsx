'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './monitoring.module.css'

export default function MonitoringPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [foodWeight, setFoodWeight] = useState(420)
  const [waterLevel, setWaterLevel] = useState(85)
  const [temperature, setTemperature] = useState(24)
  const [humidity, setHumidity] = useState(65)
  const [lastEat, setLastEat] = useState(2)
  const [batteryLevel, setBatteryLevel] = useState(92)
  const [deviceStatus, setDeviceStatus] = useState<'online' | 'offline'>('online')

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate minor fluctuations
      setTemperature(prev => Math.max(20, Math.min(30, prev + (Math.random() - 0.5) * 0.5)))
      setHumidity(prev => Math.max(40, Math.min(80, prev + (Math.random() - 0.5) * 2)))
      setLastEat(prev => prev + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getFoodStatus = () => {
    if (foodWeight > 300) return { status: 'Good', color: 'success' }
    if (foodWeight > 150) return { status: 'Low', color: 'warning' }
    return { status: 'Critical', color: 'danger' }
  }

  const getWaterStatus = () => {
    if (waterLevel > 60) return { status: 'Good', color: 'success' }
    if (waterLevel > 30) return { status: 'Low', color: 'warning' }
    return { status: 'Critical', color: 'danger' }
  }

  const getBatteryStatus = () => {
    if (batteryLevel > 60) return { status: 'Good', color: 'success' }
    if (batteryLevel > 30) return { status: 'Low', color: 'warning' }
    return { status: 'Critical', color: 'danger' }
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
            <div className={styles.headerTop}>
              <div>
                <h1 className={styles.title}>Real-time Monitoring</h1>
                <p className={styles.subtitle}>Live sensor data and device status</p>
              </div>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot}></span>
                <span className={styles.statusText}>Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Time Display */}
        <div className={styles.timeCard}>
          <div className={styles.timeDisplay}>
            <div className={styles.clock}>{formatTime(currentTime)}</div>
            <div className={styles.date}>{formatDate(currentTime)}</div>
          </div>
          <div className={styles.deviceInfo}>
            <div className={styles.deviceIcon}>📡</div>
            <div className={styles.deviceContent}>
              <div className={styles.deviceLabel}>Device Status</div>
              <div className={styles.deviceValue}>
                <span className={`${styles.deviceDot} ${styles[deviceStatus]}`}></span>
                {deviceStatus === 'online' ? 'Online' : 'Offline'}
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className={styles.mainGrid}>
          
          {/* Sensors Grid */}
          <div className={styles.sensorsSection}>
            <h2 className={styles.sectionTitle}>Sensors</h2>
            
            <div className={styles.sensorsGrid}>
              
              {/* Food Weight */}
              <div className={styles.sensorCard}>
                <div className={styles.sensorHeader}>
                  <div className={styles.sensorIcon}>⚖️</div>
                  <div className={styles.sensorMeta}>
                    <div className={styles.sensorLabel}>Food Weight</div>
                    <span className={`${styles.sensorBadge} ${styles[getFoodStatus().color]}`}>
                      {getFoodStatus().status}
                    </span>
                  </div>
                </div>
                <div className={styles.sensorValue}>{foodWeight}g</div>
                <div className={styles.sensorProgress}>
                  <div 
                    className={`${styles.sensorProgressBar} ${styles[getFoodStatus().color]}`}
                    style={{ width: `${Math.min((foodWeight / 500) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className={styles.sensorFooter}>Capacity: 500g</div>
              </div>

              {/* Water Level */}
              <div className={styles.sensorCard}>
                <div className={styles.sensorHeader}>
                  <div className={styles.sensorIcon}>💧</div>
                  <div className={styles.sensorMeta}>
                    <div className={styles.sensorLabel}>Water Level</div>
                    <span className={`${styles.sensorBadge} ${styles[getWaterStatus().color]}`}>
                      {getWaterStatus().status}
                    </span>
                  </div>
                </div>
                <div className={styles.sensorValue}>{waterLevel}%</div>
                <div className={styles.sensorProgress}>
                  <div 
                    className={`${styles.sensorProgressBar} ${styles[getWaterStatus().color]}`}
                    style={{ width: `${waterLevel}%` }}
                  ></div>
                </div>
                <div className={styles.sensorFooter}>Full: 1000ml</div>
              </div>

              {/* Temperature */}
              <div className={styles.sensorCard}>
                <div className={styles.sensorHeader}>
                  <div className={styles.sensorIcon}>🌡️</div>
                  <div className={styles.sensorMeta}>
                    <div className={styles.sensorLabel}>Temperature</div>
                    <span className={`${styles.sensorBadge} ${styles.success}`}>
                      Normal
                    </span>
                  </div>
                </div>
                <div className={styles.sensorValue}>{temperature.toFixed(1)}°C</div>
                <div className={styles.sensorProgress}>
                  <div 
                    className={`${styles.sensorProgressBar} ${styles.info}`}
                    style={{ width: `${((temperature - 15) / 20) * 100}%` }}
                  ></div>
                </div>
                <div className={styles.sensorFooter}>Range: 15-35°C</div>
              </div>

              {/* Humidity */}
              <div className={styles.sensorCard}>
                <div className={styles.sensorHeader}>
                  <div className={styles.sensorIcon}>💨</div>
                  <div className={styles.sensorMeta}>
                    <div className={styles.sensorLabel}>Humidity</div>
                    <span className={`${styles.sensorBadge} ${styles.success}`}>
                      Normal
                    </span>
                  </div>
                </div>
                <div className={styles.sensorValue}>{humidity.toFixed(0)}%</div>
                <div className={styles.sensorProgress}>
                  <div 
                    className={`${styles.sensorProgressBar} ${styles.info}`}
                    style={{ width: `${humidity}%` }}
                  ></div>
                </div>
                <div className={styles.sensorFooter}>Optimal: 40-70%</div>
              </div>

            </div>
          </div>

          {/* Activity Section */}
          <div className={styles.activitySection}>
            
            {/* Activity Card */}
            <div className={styles.activityCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Recent Activity</h3>
                <span className={styles.badge}>Live</span>
              </div>
              
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>🍽️</div>
                <div className={styles.activityContent}>
                  <div className={styles.activityLabel}>Last Feeding</div>
                  <div className={styles.activityValue}>{lastEat} min ago</div>
                </div>
              </div>

              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>🔋</div>
                <div className={styles.activityContent}>
                  <div className={styles.activityLabel}>Battery Level</div>
                  <div className={styles.activityValue}>{batteryLevel}%</div>
                </div>
                <div className={styles.activityProgress}>
                  <div 
                    className={`${styles.activityProgressBar} ${styles[getBatteryStatus().color]}`}
                    style={{ width: `${batteryLevel}%` }}
                  ></div>
                </div>
              </div>

              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>📶</div>
                <div className={styles.activityContent}>
                  <div className={styles.activityLabel}>Signal Strength</div>
                  <div className={styles.activityValue}>Excellent</div>
                </div>
              </div>

              <div className={styles.activityItem}>
                <div className={styles.activityIcon}>🔄</div>
                <div className={styles.activityContent}>
                  <div className={styles.activityLabel}>Last Sync</div>
                  <div className={styles.activityValue}>Just now</div>
                </div>
              </div>
            </div>

            {/* Alerts Card */}
            <div className={styles.alertsCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>System Alerts</h3>
                <span className={styles.alertCount}>0</span>
              </div>

              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>✓</div>
                <div className={styles.emptyText}>All Systems Normal</div>
                <div className={styles.emptySubtext}>No alerts or warnings</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <Link href="/feeding" className={styles.actionButton}>
                <span className={styles.actionIcon}>🍽️</span>
                <span className={styles.actionText}>Feed Now</span>
              </Link>
              <button className={styles.actionButton} onClick={() => window.location.reload()}>
                <span className={styles.actionIcon}>🔄</span>
                <span className={styles.actionText}>Refresh Data</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}