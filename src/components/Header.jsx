import React from 'react'
import { NotebookText, ChevronRight } from 'lucide-react'

export default function Header({ crumbs = [], onNavigate }) {
  return (
    <header className="app-header">
      <button className="app-header__brand" onClick={() => onNavigate('home')}>
        <span className="app-header__logo">
          <NotebookText size={20} strokeWidth={2.2} />
        </span>
        <span className="app-header__name">StudyNotes</span>
      </button>

      {crumbs.length > 0 && (
        <nav className="app-header__crumbs" aria-label="مسار التنقل">
          {crumbs.map((crumb, i) => (
            <span key={i} className="app-header__crumb-group">
              <ChevronRight size={14} className="app-header__crumb-sep" />
              {i === crumbs.length - 1 ? (
                <span className="app-header__crumb app-header__crumb--current">{crumb.label}</span>
              ) : (
                <button className="app-header__crumb" onClick={() => onNavigate(crumb.to)}>
                  {crumb.label}
                </button>
              )}
            </span>
          ))}
        </nav>
      )}

      <button className="app-header__saved" onClick={() => onNavigate('saved')}>
        ملاحظاتي
      </button>
    </header>
  )
}
