import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Header from './components/Header.jsx'
import SpecialtyCard from './components/SpecialtyCard.jsx'
import TemplateCard from './components/TemplateCard.jsx'
import NoteForm from './components/NoteForm.jsx'
import NotePreview from './components/NotePreview.jsx'
import SavedNotes from './components/SavedNotes.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import { specialties, getSpecialty } from './data/specialties.js'
import { getTemplatesBySpecialty, getTemplate } from './data/templates.js'
import { getSavedNotes, saveNote, deleteNote } from './utils/storage.js'

export default function App() {
  const [view, setView] = useState('home') // home | specialty | workspace | saved
  const [specialtyId, setSpecialtyId] = useState(null)
  const [templateId, setTemplateId] = useState(null)
  const [formValues, setFormValues] = useState({})
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    setSavedNotes(getSavedNotes())
  }, [])

  const selectedSpecialty = specialtyId ? getSpecialty(specialtyId) : null
  const selectedTemplate = templateId ? getTemplate(templateId) : null

  const goHome = () => {
    setView('home')
    setSpecialtyId(null)
    setTemplateId(null)
  }

  const handleSelectSpecialty = (specialty) => {
    setSpecialtyId(specialty.id)
    setView('specialty')
  }

  const handleSelectTemplate = (template) => {
    setTemplateId(template.id)
    setFormValues(template.sample || {})
    setView('workspace')
  }

  const handleSaveNote = () => {
    if (!selectedTemplate || !selectedSpecialty) return
    const titleField = selectedTemplate.fields.find((f) => f.role === 'title' || f.role === 'central')
    const note = saveNote({
      title: formValues[titleField.key] || titleField.placeholder,
      specialtyId: selectedSpecialty.id,
      templateId: selectedTemplate.id,
      templateName: selectedTemplate.name,
      values: formValues,
    })
    setSavedNotes((prev) => [note, ...prev])
  }

  const handleOpenSavedNote = (note) => {
    setSpecialtyId(note.specialtyId)
    setTemplateId(note.templateId)
    setFormValues(note.values)
    setView('workspace')
  }

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId)
    setSavedNotes((prev) => prev.filter((n) => n.id !== noteId))
  }

  const handleNavigate = (target) => {
    if (target === 'home') goHome()
    else if (target === 'saved') setView('saved')
    else if (target === 'specialty') setView('specialty')
  }

  const crumbs = []
  if (view === 'specialty' && selectedSpecialty) {
    crumbs.push({ label: selectedSpecialty.name, to: 'specialty' })
  }
  if (view === 'workspace' && selectedSpecialty && selectedTemplate) {
    crumbs.push({ label: selectedSpecialty.name, to: 'specialty' })
    crumbs.push({ label: selectedTemplate.name, to: 'workspace' })
  }
  if (view === 'saved') {
    crumbs.push({ label: 'ملاحظاتي', to: 'saved' })
  }

  return (
    <div className="app">
      <Header crumbs={crumbs} onNavigate={handleNavigate} />

      <main className="app-main">
        {view === 'home' && (
          <>
            <section className="hero">
              <span className="hero__eyebrow">📓 دفتر ملاحظات دراسي رقمي</span>
              <h1 className="hero__title">ملاحظاتك الدراسية في مكان واحد</h1>
              <p className="hero__subtitle">اختر تخصصك، اختر قالبًا جاهزًا، وأدخل معلوماتك.</p>
            </section>

            <section className="specialty-section">
              <h2 className="section-title">اختر تخصصك</h2>
              <div className="specialty-grid">
                {specialties.map((s) => (
                  <SpecialtyCard key={s.id} specialty={s} onSelect={handleSelectSpecialty} />
                ))}
              </div>
            </section>

            <HowItWorks />
          </>
        )}

        {view === 'specialty' && selectedSpecialty && (
          <section className="template-section">
            <button className="back-link" onClick={() => setView('home')}>
              <ArrowRight size={16} /> التخصصات
            </button>
            <h2 className="specialty-heading">
              <span>{selectedSpecialty.icon}</span> {selectedSpecialty.name}
            </h2>
            <p className="section-hint">اختر نوع الملاحظة</p>
            <div className="template-grid">
              {getTemplatesBySpecialty(selectedSpecialty.id).map((tpl) => (
                <TemplateCard key={tpl.id} template={tpl} onSelect={handleSelectTemplate} />
              ))}
            </div>
          </section>
        )}

        {view === 'workspace' && selectedSpecialty && selectedTemplate && (
          <section className="workspace">
            <button className="back-link" onClick={() => setView('specialty')}>
              <ArrowRight size={16} /> {selectedSpecialty.name}
            </button>
            <div className="workspace__grid">
              <div className="workspace__form">
                <h2 className="section-title">{selectedTemplate.name}</h2>
                <NoteForm
                  template={selectedTemplate}
                  values={formValues}
                  onChange={setFormValues}
                  onSubmit={() => {}}
                />
              </div>
              <div className="workspace__preview">
                <h2 className="section-title">المعاينة</h2>
                <NotePreview template={selectedTemplate} values={formValues} onSave={handleSaveNote} />
              </div>
            </div>
          </section>
        )}

        {view === 'saved' && (
          <section className="saved-section">
            <button className="back-link" onClick={() => setView('home')}>
              <ArrowRight size={16} /> الرئيسية
            </button>
            <h2 className="section-title">ملاحظاتي</h2>
            <SavedNotes notes={savedNotes} onOpen={handleOpenSavedNote} onDelete={handleDeleteNote} />
          </section>
        )}
      </main>
    </div>
  )
}
