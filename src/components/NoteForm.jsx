import React from 'react'

export default function NoteForm({ template, values, onChange, onSubmit }) {
  const handleChange = (key, value) => {
    onChange({ ...values, [key]: value })
  }

  return (
    <form
      className="note-form"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      {template.fields.map((field) => (
        <div className="note-form__field" key={field.key}>
          <label className="note-form__label" htmlFor={field.key}>
            {field.label}
          </label>
          {field.role === 'title' || field.role === 'central' ? (
            <input
              id={field.key}
              className="note-form__input"
              type="text"
              placeholder={field.placeholder}
              value={values[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
          ) : (
            <textarea
              id={field.key}
              className="note-form__textarea"
              rows={2}
              placeholder={field.placeholder}
              value={values[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
          )}
        </div>
      ))}

      <button type="submit" className="btn btn--primary note-form__submit">
        إنشاء الملاحظة
      </button>
    </form>
  )
}
