"use client"
import React from 'react'

export default function FeedButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 16px',
        borderRadius: 10,
        background: 'linear-gradient(90deg, #7c3aed, #6d28d9)',
        color: '#fff',
        border: 'none',
        fontWeight: 700,
        boxShadow: '0 8px 20px rgba(124,58,237,0.12)',
        cursor: 'pointer'
      }}
    >
      Feed Now
    </button>
  )
}
