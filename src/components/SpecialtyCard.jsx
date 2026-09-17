import React from 'react'

export default function SpecialtyCard({ specialty, onSelect }) {
  return (
    <button
      className="specialty-card"
      style={{ background: specialty.tint }}
      onClick={() => onSelect(specialty)}
    >
      <span className="specialty-card__icon">{specialty.icon}</span>
      <span className="specialty-card__name">{specialty.name}</span>
    </button>
  )
}
