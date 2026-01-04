'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import styles from './settings.module.css'

export default function SettingsPage() {
  // General Settings
  const [deviceName, setDeviceName] = useState('Cat Feeder Pro')
  const [language, setLanguage] = useState('en')
  const [timezone, setTimezone] = useState('Asia/Bangkok')

  // Feeding Settings
  const [defaultPortion, setDefaultPortion] = useState(140)
  const [maxDailyFeedings, setMaxDailyFeedings] = useState(4)
  const [autoMode, setAutoMode] = useState(true)

  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [lowFoodAlert, setLowFoodAlert] = useState(true)
  const [feedingComplete, setFeedingComplete] = useState(true)
  const [deviceOffline, setDeviceOffline] = useState(true)

  // Advanced Settings
  const [debugMode, setDebugMode] = useState(false)
  const [dataCollection, setDataCollection] = useState(true)

  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = () => {
    // Simulate saving
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleReset = () => {
    if (confirm('Reset all settings to default?')) {
      setDeviceName('Cat Feeder Pro')
      setLanguage('en')
      setTimezone('Asia/Bangkok')
      setDefaultPortion(140)
      setMaxDailyFeedings(4)
      setAutoMode(true)
      setEmailNotifications(true)
      setLowFoodAlert(true)
      setFeedingComplete(true)
      setDeviceOffline(true)
      setDebugMode(false)
      setDataCollection(true)
    }
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
            <h1 className={styles.title}>Settings</h1>
            <p className={styles.subtitle}>Configure your Cat Feeder system</p>
          </div>
        </div>

        {/* Success Banner */}
        {showSuccess && (
          <div className={styles.successBanner}>
            <span className={styles.successIcon}>✓</span>
            <span className={styles.successText}>Settings saved successfully!</span>
          </div>
        )}

        {/* Settings Sections */}
        <div className={styles.sectionsGrid}>
          
          {/* General Settings */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>⚙️</div>
              <div>
                <h2 className={styles.sectionTitle}>General</h2>
                <p className={styles.sectionSubtitle}>Basic device configuration</p>
              </div>
            </div>

            <div className={styles.settingsGroup}>
              <div className={styles.settingItem}>
                <label className={styles.label}>Device Name</label>
                <input
                  type="text"
                  className={styles.input}
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  placeholder="Enter device name"
                />
              </div>

              <div className={styles.settingItem}>
                <label className={styles.label}>Language</label>
                <select
                  className={styles.select}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="th">ไทย (Thai)</option>
                  <option value="ja">日本語 (Japanese)</option>
                  <option value="zh">中文 (Chinese)</option>
                </select>
              </div>

              <div className={styles.settingItem}>
                <label className={styles.label}>Timezone</label>
                <select
                  className={styles.select}
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <option value="Asia/Bangkok">Bangkok (UTC+7)</option>
                  <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
                  <option value="America/New_York">New York (UTC-5)</option>
                  <option value="Europe/London">London (UTC+0)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Feeding Settings */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>🍽️</div>
              <div>
                <h2 className={styles.sectionTitle}>Feeding</h2>
                <p className={styles.sectionSubtitle}>Configure feeding preferences</p>
              </div>
            </div>

            <div className={styles.settingsGroup}>
              <div className={styles.settingItem}>
                <label className={styles.label}>Default Portion (grams)</label>
                <div className={styles.numberControl}>
                  <button 
                    className={styles.controlBtn}
                    onClick={() => setDefaultPortion(Math.max(10, defaultPortion - 10))}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className={styles.numberInput}
                    value={defaultPortion}
                    onChange={(e) => setDefaultPortion(parseInt(e.target.value) || 0)}
                    min="10"
                    step="10"
                  />
                  <button 
                    className={styles.controlBtn}
                    onClick={() => setDefaultPortion(defaultPortion + 10)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.settingItem}>
                <label className={styles.label}>Max Daily Feedings</label>
                <select
                  className={styles.select}
                  value={maxDailyFeedings}
                  onChange={(e) => setMaxDailyFeedings(parseInt(e.target.value))}
                >
                  <option value={2}>2 times</option>
                  <option value={3}>3 times</option>
                  <option value={4}>4 times</option>
                  <option value={5}>5 times</option>
                  <option value={6}>6 times</option>
                </select>
              </div>

              <div className={styles.toggleItem}>
                <div className={styles.toggleContent}>
                  <div className={styles.toggleLabel}>Automatic Mode</div>
                  <div className={styles.toggleDesc}>Follow scheduled feeding times</div>
                </div>
                <button 
                  className={`${styles.toggle} ${autoMode ? styles.toggleActive : ''}`}
                  onClick={() => setAutoMode(!autoMode)}
                >
                  <span className={styles.toggleSlider}></span>
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>🔔</div>
              <div>
                <h2 className={styles.sectionTitle}>Notifications</h2>
                <p className={styles.sectionSubtitle}>Manage alert preferences</p>
              </div>
            </div>

            <div className={styles.settingsGroup}>
              <div className={styles.toggleItem}>
                <div className={styles.toggleContent}>
                  <div className={styles.toggleLabel}>Email Notifications</div>
                  <div className={styles.toggleDesc}>Receive updates via email</div>
                </div>
                <button 
                  className={`${styles.toggle} ${emailNotifications ? styles.toggleActive : ''}`}
                  onClick={() => setEmailNotifications(!emailNotifications)}
                >
                  <span className={styles.toggleSlider}></span>
                </button>
              </div>

              <div className={styles.toggleItem}>
                <div className={styles.toggleContent}>
                  <div className={styles.toggleLabel}>Low Food Alert</div>
                  <div className={styles.toggleDesc}>Alert when food is running low</div>
                </div>
                <button 
                  className={`${styles.toggle} ${lowFoodAlert ? styles.toggleActive : ''}`}
                  onClick={() => setLowFoodAlert(!lowFoodAlert)}
                >
                  <span className={styles.toggleSlider}></span>
                </button>
              </div>

              <div className={styles.toggleItem}>
                <div className={styles.toggleContent}>
                  <div className={styles.toggleLabel}>Feeding Complete</div>
                  <div className={styles.toggleDesc}>Notify after each feeding</div>
                </div>
                <button 
                  className={`${styles.toggle} ${feedingComplete ? styles.toggleActive : ''}`}
                  onClick={() => setFeedingComplete(!feedingComplete)}
                >
                  <span className={styles.toggleSlider}></span>
                </button>
              </div>

              <div className={styles.toggleItem}>
                <div className={styles.toggleContent}>
                  <div className={styles.toggleLabel}>Device Offline</div>
                  <div className={styles.toggleDesc}>Alert when device disconnects</div>
                </div>
                <button 
                  className={`${styles.toggle} ${deviceOffline ? styles.toggleActive : ''}`}
                  onClick={() => setDeviceOffline(!deviceOffline)}
                >
                  <span className={styles.toggleSlider}></span>
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>🔧</div>
              <div>
                <h2 className={styles.sectionTitle}>Advanced</h2>
                <p className={styles.sectionSubtitle}>Advanced system options</p>
              </div>
            </div>

            <div className={styles.settingsGroup}>
              <div className={styles.toggleItem}>
                <div className={styles.toggleContent}>
                  <div className={styles.toggleLabel}>Debug Mode</div>
                  <div className={styles.toggleDesc}>Enable detailed logging</div>
                </div>
                <button 
                  className={`${styles.toggle} ${debugMode ? styles.toggleActive : ''}`}
                  onClick={() => setDebugMode(!debugMode)}
                >
                  <span className={styles.toggleSlider}></span>
                </button>
              </div>

              <div className={styles.toggleItem}>
                <div className={styles.toggleContent}>
                  <div className={styles.toggleLabel}>Data Collection</div>
                  <div className={styles.toggleDesc}>Help improve the system</div>
                </div>
                <button 
                  className={`${styles.toggle} ${dataCollection ? styles.toggleActive : ''}`}
                  onClick={() => setDataCollection(!dataCollection)}
                >
                  <span className={styles.toggleSlider}></span>
                </button>
              </div>

              <div className={styles.dangerZone}>
                <div className={styles.dangerHeader}>
                  <span className={styles.dangerIcon}>⚠️</span>
                  <span className={styles.dangerTitle}>Danger Zone</span>
                </div>
                <button className={styles.resetBtn} onClick={handleReset}>
                  Reset All Settings
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={() => window.history.back()}>
            Cancel
          </button>
          <button className={styles.saveBtn} onClick={handleSave}>
            <span>💾</span>
            Save Changes
          </button>
        </div>

      </div>
    </div>
  )
}