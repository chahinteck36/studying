// كل تخصص: معرّف، اسم، أيقونة (Emoji)، ولون مميز خفيف يُستخدم في التمييز البصري فقط
export const specialties = [
  {
    id: 'medicine',
    name: 'الطب',
    icon: '🩺',
    tint: '#F4EDFB',
  },
  {
    id: 'engineering',
    name: 'الهندسة',
    icon: '⚙️',
    tint: '#EEF1FB',
  },
  {
    id: 'physics',
    name: 'الفيزياء',
    icon: '⚛️',
    tint: '#EFF6F5',
  },
  {
    id: 'chemistry',
    name: 'الكيمياء',
    icon: '🧪',
    tint: '#FBF0F3',
  },
  {
    id: 'math',
    name: 'الرياضيات',
    icon: '📐',
    tint: '#F6F1FB',
  },
  {
    id: 'cs',
    name: 'الإعلام الآلي',
    icon: '💻',
    tint: '#EEF3F7',
  },
]

export const getSpecialty = (id) => specialties.find((s) => s.id === id)
