import React from 'react'

export default function SpecialtyCard({ specialty, onSelect }) {
  return (
    <button
      className="specialty-card"
      style={{ '--tint': specialty.tint }}
      onClick={() => onSelect(specialty)}
    >
      <span className="specialty-card__icon-tile">
        <span className="specialty-card__icon">{specialty.icon}</span>
      </span>
      <span className="specialty-card__name">{specialty.name}</span>
    </button>
  )
}
