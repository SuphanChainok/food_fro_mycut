'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import styles from './cats.module.css'

type Cat = {
  id: string
  name: string
  ageMonths: number
  weightKg: number
  breed?: string
  color?: string
}

export default function CatsPage() {
  const [cats, setCats] = useState<Cat[]>([
    { 
      id: '1', 
      name: 'Mimi', 
      ageMonths: 24, 
      weightKg: 4.2,
      breed: 'Persian',
      color: 'White'
    }
  ])

  const [isAddingCat, setIsAddingCat] = useState(false)
  const [editingCat, setEditingCat] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    ageMonths: 12,
    weightKg: 4.0,
    breed: '',
    color: ''
  })

  const handleAddCat = () => {
    if (!formData.name.trim()) {
      alert('Please enter a name')
      return
    }

    const newCat: Cat = {
      id: String(Date.now()),
      name: formData.name,
      ageMonths: formData.ageMonths,
      weightKg: formData.weightKg,
      breed: formData.breed || undefined,
      color: formData.color || undefined
    }

    setCats([...cats, newCat])
    setIsAddingCat(false)
    setFormData({ name: '', ageMonths: 12, weightKg: 4.0, breed: '', color: '' })
  }

  const handleUpdateCat = (id: string) => {
    setCats(cats.map(cat => 
      cat.id === id 
        ? { ...cat, ...formData }
        : cat
    ))
    setEditingCat(null)
    setFormData({ name: '', ageMonths: 12, weightKg: 4.0, breed: '', color: '' })
  }

  const handleDeleteCat = (id: string) => {
    if (confirm('Are you sure you want to remove this cat?')) {
      setCats(cats.filter(cat => cat.id !== id))
    }
  }

  const handleEditClick = (cat: Cat) => {
    setEditingCat(cat.id)
    setFormData({
      name: cat.name,
      ageMonths: cat.ageMonths,
      weightKg: cat.weightKg,
      breed: cat.breed || '',
      color: cat.color || ''
    })
  }

  const formatAge = (months: number) => {
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    
    if (years === 0) return `${months} months`
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`
    return `${years}y ${remainingMonths}m`
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
                <h1 className={styles.title}>My Cats</h1>
                <p className={styles.subtitle}>Manage your cat profiles and information</p>
              </div>
              <button 
                className={styles.addBtn}
                onClick={() => setIsAddingCat(true)}
              >
                <span className={styles.addIcon}>+</span>
                Add Cat
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🐱</div>
            <div>
              <div className={styles.statLabel}>Total Cats</div>
              <div className={styles.statValue}>{cats.length}</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📊</div>
            <div>
              <div className={styles.statLabel}>Avg Age</div>
              <div className={styles.statValue}>
                {cats.length > 0 
                  ? formatAge(Math.round(cats.reduce((sum, cat) => sum + cat.ageMonths, 0) / cats.length))
                  : '—'
                }
              </div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⚖️</div>
            <div>
              <div className={styles.statLabel}>Avg Weight</div>
              <div className={styles.statValue}>
                {cats.length > 0 
                  ? `${(cats.reduce((sum, cat) => sum + cat.weightKg, 0) / cats.length).toFixed(1)} kg`
                  : '—'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {(isAddingCat || editingCat) && (
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>
                {editingCat ? 'Edit Cat Profile' : 'Add New Cat'}
              </h2>
              <button 
                className={styles.closeBtn}
                onClick={() => {
                  setIsAddingCat(false)
                  setEditingCat(null)
                  setFormData({ name: '', ageMonths: 12, weightKg: 4.0, breed: '', color: '' })
                }}
              >
                ×
              </button>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Name *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Mimi"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Age (months) *</label>
                <input
                  type="number"
                  className={styles.input}
                  value={formData.ageMonths}
                  onChange={(e) => setFormData({ ...formData, ageMonths: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Weight (kg) *</label>
                <input
                  type="number"
                  step="0.1"
                  className={styles.input}
                  value={formData.weightKg}
                  onChange={(e) => setFormData({ ...formData, weightKg: parseFloat(e.target.value) || 0 })}
                  min="0"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Breed</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  placeholder="e.g., Persian"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Color</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="e.g., White"
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <button 
                className={styles.cancelBtn}
                onClick={() => {
                  setIsAddingCat(false)
                  setEditingCat(null)
                  setFormData({ name: '', ageMonths: 12, weightKg: 4.0, breed: '', color: '' })
                }}
              >
                Cancel
              </button>
              <button 
                className={styles.saveBtn}
                onClick={() => editingCat ? handleUpdateCat(editingCat) : handleAddCat()}
              >
                {editingCat ? 'Update Cat' : 'Add Cat'}
              </button>
            </div>
          </div>
        )}

        {/* Cats Grid */}
        {cats.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🐱</div>
            <div className={styles.emptyText}>No cats added yet</div>
            <div className={styles.emptySubtext}>Add your first cat to start tracking their feeding</div>
            <button 
              className={styles.emptyBtn}
              onClick={() => setIsAddingCat(true)}
            >
              <span>+</span>
              Add Your First Cat
            </button>
          </div>
        ) : (
          <div className={styles.catsGrid}>
            {cats.map(cat => (
              <div key={cat.id} className={styles.catCard}>
                <div className={styles.catAvatar}>
                  <span className={styles.catEmoji}>🐱</span>
                </div>

                <div className={styles.catInfo}>
                  <h3 className={styles.catName}>{cat.name}</h3>
                  
                  <div className={styles.catDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>🎂</span>
                      <span className={styles.detailText}>{formatAge(cat.ageMonths)}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>⚖️</span>
                      <span className={styles.detailText}>{cat.weightKg} kg</span>
                    </div>
                  </div>

                  {(cat.breed || cat.color) && (
                    <div className={styles.catTags}>
                      {cat.breed && <span className={styles.tag}>{cat.breed}</span>}
                      {cat.color && <span className={styles.tag}>{cat.color}</span>}
                    </div>
                  )}
                </div>

                <div className={styles.catActions}>
                  <button 
                    className={styles.editBtn}
                    onClick={() => handleEditClick(cat)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button 
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteCat(cat.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}