"use client"
import React from 'react'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside style={{ width: 220, padding: 12, borderRight: '1px solid #eee' }}>
      <nav>
        <ul style={{ padding: 0, listStyle: 'none' }}>
          <li><Link href="/">Dashboard</Link></li>
          <li><Link href="/cats">Cats</Link></li>
          <li><Link href="/feeding">Feeding</Link></li>
          <li><Link href="/monitoring">Monitoring</Link></li>
          <li><Link href="/history">History</Link></li>
          <li><Link href="/settings">Settings</Link></li>
        </ul>
      </nav>
    </aside>
  )
}
