import React, { useRef, useState } from 'react'
import { Download, Save, Check } from 'lucide-react'
import StickyNote from '../templates/StickyNote.jsx'
import HandwrittenNote from '../templates/HandwrittenNote.jsx'
import MindMap from '../templates/MindMap.jsx'
import { downloadNodeAsPng, slugifyFileName } from '../utils/exportImage.js'

const TEMPLATE_COMPONENTS = {
  sticky: StickyNote,
  handwritten: HandwrittenNote,
  mindmap: MindMap,
}

export default function NotePreview({ template, values, onSave }) {
  const exportRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)
  const [justSaved, setJustSaved] = useState(false)

  const TemplateComponent = TEMPLATE_COMPONENTS[template.type]
  const titleField = template.fields.find((f) => f.role === 'title' || f.role === 'central')
  const titleValue = values[titleField.key] || titleField.placeholder

  const handleDownload = async () => {
    setIsExporting(true)
    try {
      await downloadNodeAsPng(exportRef.current, slugifyFileName(titleValue))
    } catch (err) {
      console.error('فشل تصدير الصورة:', err)
    } finally {
      setIsExporting(false)
    }
  }

  const handleSave = () => {
    onSave()
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 1800)
  }

  return (
    <div className="note-preview">
      <div className="note-preview__frame">
        <div className="note-preview__export-target" ref={exportRef}>
          <TemplateComponent template={template} values={values} />
        </div>
      </div>

      <div className="note-preview__actions">
        <button className="btn btn--ghost" onClick={handleSave}>
          {justSaved ? <Check size={18} /> : <Save size={18} />}
          {justSaved ? 'تم الحفظ' : 'حفظ الملاحظة'}
        </button>
        <button className="btn btn--primary" onClick={handleDownload} disabled={isExporting}>
          <Download size={18} />
          {isExporting ? 'جارٍ التحميل...' : 'تحميل PNG'}
        </button>
      </div>
    </div>
  )
}
