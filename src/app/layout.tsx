import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from './layout.module.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cat Feeder Pro - Smart Feeding System",
  description: "Manage your cat's feeding schedule with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.layout}>
          <Header />
          <div className={styles.container}>
            <Sidebar />
            <main className={styles.main}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

// Header Component
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🐱</span>
          <span className={styles.logoText}>Cat Feeder Pro</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.notificationBtn}>
            <span className={styles.bellIcon}>🔔</span>
            <span className={styles.notificationDot}></span>
          </button>
          <div className={styles.userMenu}>
            <div className={styles.userAvatar}>👤</div>
          </div>
        </div>
      </div>
    </header>
  )
}

// Sidebar Component
function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <a href="/" className={styles.navItem}>
          <span className={styles.navIcon}>🏠</span>
          <span className={styles.navText}>Dashboard</span>
        </a>
        <a href="/feeding" className={styles.navItem}>
          <span className={styles.navIcon}>🍽️</span>
          <span className={styles.navText}>Feeding</span>
        </a>
        <a href="/history" className={styles.navItem}>
          <span className={styles.navIcon}>📊</span>
          <span className={styles.navText}>History</span>
        </a>
        <a href="/cats" className={styles.navItem}>
          <span className={styles.navIcon}>🐱</span>
          <span className={styles.navText}>My Cats</span>
        </a>
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.deviceStatus}>
          <div className={styles.statusIcon}>📡</div>
          <div className={styles.statusContent}>
            <div className={styles.statusLabel}>Device Status</div>
            <div className={styles.statusValue}>
              <span className={styles.statusDot}></span>
              Online
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}