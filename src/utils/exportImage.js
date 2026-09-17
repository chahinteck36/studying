import html2canvas from 'html2canvas'

// يحوّل عنصر DOM (تصميم القالب فقط، بدون واجهة الموقع) إلى صورة PNG ويُنزّلها.
export async function downloadNodeAsPng(node, filename) {
  if (!node) return

  const canvas = await html2canvas(node, {
    backgroundColor: '#ffffff',
    scale: 3, // جودة عالية تناسب الطباعة والمشاركة
    useCORS: true,
  })

  const dataUrl = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename.endsWith('.png') ? filename : `${filename}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function slugifyFileName(title) {
  const cleaned = (title || 'ملاحظة').trim().replace(/\s+/g, '-')
  return `study-notes-${cleaned}`
}
