// طبقة تخزين بسيطة تعتمد على localStorage في النسخة الأولى.
// الدوال معزولة في هذا الملف حتى يسهل استبدالها بـ Firebase لاحقًا
// دون الحاجة لتغيير أي مكون في الواجهة.

const STORAGE_KEY = 'studynotes.notes'

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('تعذّرت قراءة الملاحظات المحفوظة:', err)
    return []
  }
}

function writeAll(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    return true
  } catch (err) {
    console.error('تعذّر حفظ الملاحظات:', err)
    return false
  }
}

export function getSavedNotes() {
  return readAll().sort((a, b) => b.createdAt - a.createdAt)
}

export function saveNote(note) {
  const notes = readAll()
  const newNote = {
    id: `note-${Date.now()}`,
    createdAt: Date.now(),
    ...note,
  }
  writeAll([newNote, ...notes])
  return newNote
}

export function deleteNote(noteId) {
  const notes = readAll().filter((n) => n.id !== noteId)
  writeAll(notes)
}

export function getNoteById(noteId) {
  return readAll().find((n) => n.id === noteId) || null
}
