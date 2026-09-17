import React from 'react'

// ألوان ثابتة للـSticky Notes — لا يمكن للمستخدم تغييرها، فقط النص يتغير
const STICKY_COLORS = ['#F3E8FF', '#E0ECFF', '#FFF1DE', '#E4F5EA']

export default function StickyNote({ template, values }) {
  const titleField = template.fields.find((f) => f.role === 'title')
  const itemFields = template.fields.filter((f) => f.role === 'item')

  return (
    <div className="tpl tpl-sticky">
      <div className="tpl-sticky__header">
        <span className="tpl-sticky__badge">{template.nameEn}</span>
        <h2 className="tpl-sticky__title">{values[titleField.key] || titleField.placeholder}</h2>
      </div>
      <div className="tpl-sticky__grid">
        {itemFields.map((field, i) => (
          <div
            key={field.key}
            className="tpl-sticky__note"
            style={{ background: STICKY_COLORS[i % STICKY_COLORS.length] }}
          >
            <span className="tpl-sticky__note-label">{field.label}</span>
            <p className="tpl-sticky__note-text">{values[field.key] || field.placeholder}</p>
          </div>
        ))}
      </div>
      <div className="tpl-sticky__footer">StudyNotes</div>
    </div>
  )
}
