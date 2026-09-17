import React from 'react'

const STEPS = [
  { title: 'اختر تخصصك', text: 'من بين ستة تخصصات دراسية شائعة' },
  { title: 'اختر قالبًا', text: 'قوالب جاهزة صممت لكل مادة' },
  { title: 'أدخل معلوماتك', text: 'فقط اكتب المحتوى في الحقول' },
  { title: 'احفظ أو حمّل', text: 'ملاحظة PNG جاهزة للمراجعة والمشاركة' },
]

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2 className="section-title">كيف تعمل؟</h2>
      <div className="how-it-works__steps">
        {STEPS.map((step, i) => (
          <div className="how-step" key={step.title}>
            <span className="how-step__index">{i + 1}</span>
            <div>
              <h3 className="how-step__title">{step.title}</h3>
              <p className="how-step__text">{step.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="how-it-works__samples">
        <div className="sample-card">
          <div className="sample-sticky">
            <div className="sample-sticky__note" style={{ background: '#F3E8FF' }} />
            <div className="sample-sticky__note" style={{ background: '#E0ECFF' }} />
            <div className="sample-sticky__note" style={{ background: '#FFF1DE' }} />
          </div>
          <span className="sample-card__label">Sticky Note</span>
        </div>
        <div className="sample-card">
          <div className="sample-handwritten">
            <span className="sample-handwritten__line" />
            <span className="sample-handwritten__line" />
            <span className="sample-handwritten__line" />
          </div>
          <span className="sample-card__label">Handwritten Note</span>
        </div>
        <div className="sample-card">
          <div className="sample-mindmap">
            <span className="sample-mindmap__center" />
            <span className="sample-mindmap__node" style={{ top: '10%', right: '15%' }} />
            <span className="sample-mindmap__node" style={{ bottom: '10%', right: '15%' }} />
            <span className="sample-mindmap__node" style={{ top: '10%', left: '15%' }} />
          </div>
          <span className="sample-card__label">Mind Map</span>
        </div>
      </div>
    </section>
  )
}
