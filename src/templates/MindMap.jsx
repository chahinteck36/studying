import React from 'react'

// إحداثيات ثابتة ضمن مساحة عمل 1000×700 — نفس النسبة المستخدمة في aspect-ratio
// بحيث تتطابق الخطوط في SVG مع مواضع الصناديق دائمًا مهما تغير حجم العرض.
const CENTER = { x: 500, y: 350 }
const BRANCH_POSITIONS = [
  { x: 175, y: 120 }, // أعلى يسار
  { x: 825, y: 120 }, // أعلى يمين
  { x: 115, y: 350 }, // وسط يسار
  { x: 885, y: 350 }, // وسط يمين
  { x: 175, y: 580 }, // أسفل يسار
  { x: 825, y: 580 }, // أسفل يمين
]

const toPercent = (v, max) => `${(v / max) * 100}%`

export default function MindMap({ template, values }) {
  const centralField = template.fields.find((f) => f.role === 'central')
  const branchFields = template.fields.filter((f) => f.role === 'branch').slice(0, 6)

  return (
    <div className="tpl tpl-mindmap">
      <div className="tpl-mindmap__canvas">
        <svg
          className="tpl-mindmap__lines"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {branchFields.map((field, i) => {
            const pos = BRANCH_POSITIONS[i]
            return (
              <line
                key={field.key}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={pos.x}
                y2={pos.y}
                stroke="#C9B8ED"
                strokeWidth="3"
              />
            )
          })}
        </svg>

        <div
          className="tpl-mindmap__central"
          style={{ left: toPercent(CENTER.x, 1000), top: toPercent(CENTER.y, 700) }}
        >
          {values[centralField.key] || centralField.placeholder}
        </div>

        {branchFields.map((field, i) => {
          const pos = BRANCH_POSITIONS[i]
          return (
            <div
              key={field.key}
              className="tpl-mindmap__branch"
              style={{ left: toPercent(pos.x, 1000), top: toPercent(pos.y, 700) }}
            >
              <span className="tpl-mindmap__branch-label">{field.label}</span>
              <p className="tpl-mindmap__branch-text">{values[field.key] || field.placeholder}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
