import React from 'react'
import { FolderOpen, Trash2, FileStack } from 'lucide-react'
import { getSpecialty } from '../data/specialties.js'

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('ar-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function SavedNotes({ notes, onOpen, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="saved-empty">
        <FileStack size={36} strokeWidth={1.6} />
        <p>لا توجد ملاحظات محفوظة بعد.</p>
        <p className="saved-empty__hint">أنشئ ملاحظتك الأولى وستظهر هنا.</p>
      </div>
    )
  }

  return (
    <div className="saved-list">
      {notes.map((note) => {
        const specialty = getSpecialty(note.specialtyId)
        return (
          <div className="saved-card" key={note.id}>
            <div className="saved-card__info">
              <h3 className="saved-card__title">{note.title}</h3>
              <div className="saved-card__meta">
                <span>{specialty?.icon} {specialty?.name}</span>
                <span>·</span>
                <span>{note.templateName}</span>
                <span>·</span>
                <span>{formatDate(note.createdAt)}</span>
              </div>
            </div>
            <div className="saved-card__actions">
              <button className="icon-btn" title="فتح" onClick={() => onOpen(note)}>
                <FolderOpen size={18} />
              </button>
              <button className="icon-btn icon-btn--danger" title="حذف" onClick={() => onDelete(note.id)}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
