"use client"
import React from 'react'

export default function FeedButton({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ padding: '8px 12px', borderRadius: 6 }}>
      Feed Now
    </button>
  )
}
