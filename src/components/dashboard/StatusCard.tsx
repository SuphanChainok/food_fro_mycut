"use client"
import React from 'react'

type Props = {
  title: string
  value: string | number
  icon?: React.ReactNode
}

export default function StatusCard({ title, value, icon }: Props) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, borderRadius: 12, background: '#fff', boxShadow: '0 6px 18px rgba(16,24,40,0.06)' }}>
      <div style={{ width: 48, height: 48, display: 'grid', placeItems: 'center', borderRadius: 10, background: 'linear-gradient(180deg, rgba(124,58,237,0.08), rgba(124,58,237,0.02))' }}>
        {icon ?? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C9.243 2 7 4.243 7 7c0 2.757 5 8 5 8s5-5.243 5-8c0-2.757-2.243-5-5-5z" stroke="#7c3aed" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>{title}</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{value}</div>
      </div>
    </div>
  )
}
