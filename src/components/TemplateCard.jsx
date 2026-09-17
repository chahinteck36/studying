import React from 'react'
import { StickyNote, PenLine, GitBranch } from 'lucide-react'

const TYPE_ICON = {
  sticky: StickyNote,
  handwritten: PenLine,
  mindmap: GitBranch,
}

export default function TemplateCard({ template, onSelect }) {
  const Icon = TYPE_ICON[template.type]

  return (
    <button className="template-card" onClick={() => onSelect(template)}>
      <span className="template-card__icon">
        <Icon size={20} strokeWidth={2} />
      </span>
      <span className="template-card__body">
        <span className="template-card__name">{template.name}</span>
        <span className="template-card__type">{template.nameEn}</span>
      </span>
    </button>
  )
}
