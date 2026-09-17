import React from 'react'

export default function HandwrittenNote({ template, values }) {
  const titleField = template.fields.find((f) => f.role === 'title')
  const lineFields = template.fields.filter((f) => f.role === 'line')

  return (
    <div className="tpl tpl-handwritten">
      <div className="tpl-handwritten__paper">
        <div className="tpl-handwritten__margin" />
        <h2 className="tpl-handwritten__title">{values[titleField.key] || titleField.placeholder}</h2>
        <ul className="tpl-handwritten__lines">
          {lineFields.map((field) => (
            <li key={field.key} className="tpl-handwritten__line">
              <span className="tpl-handwritten__line-label">{field.label}:</span>{' '}
              <span className="tpl-handwritten__line-text">{values[field.key] || field.placeholder}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
