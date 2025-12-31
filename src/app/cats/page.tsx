import React from 'react'
import CatProfileCard from '../../components/cats/CatProfileCard'

const sampleCat = { id: '1', name: 'Mimi', ageMonths: 24, weightKg: 4.2 }

export default function CatsPage() {
  return (
    <main style={{ padding: 16 }}>
      <h2>Cats</h2>
      <div style={{ maxWidth: 480 }}>
        <CatProfileCard cat={sampleCat} />
      </div>
    </main>
  )
}
