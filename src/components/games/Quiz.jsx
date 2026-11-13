import { useEffect, useRef, useState } from 'react'
import { QUIZ } from '../../data/content.js'
import { useFx } from '../../context.js'

export default function Quiz() {
  const fx = useFx()
  const [qi, setQi] = useState(0)
  const [pick, setPick] = useState(null)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  if (qi >= QUIZ.length) {
    return (
      <div>
        <h3>Us quiz</h3>
        <p className="qq">100% us.</p>
        <p className="qfb" style={{ minHeight: 0 }}>Every answer was right, because every answer is something we share. I love you.</p>
        <p><button className="btn ghost" onClick={() => setQi(0)}>Play again</button></p>
      </div>
    )
  }
  const q = QUIZ[qi]
  const choose = (i, e) => {
    if (pick !== null) return
    setPick(i)
    const r = e.currentTarget.getBoundingClientRect(); fx.burst(r.left + 40, r.top + 10, 12, 200)
    timer.current = setTimeout(() => {
      const next = qi + 1
      setQi(next); setPick(null)
      if (next >= QUIZ.length) { const { W, H } = fx.size(); fx.burst(W / 2, H / 2, 40, 380) }
    }, 1500)
  }
  return (
    <div>
      <h3>Us quiz</h3>
      <p className="how">There are no wrong answers. Pick the one that feels most like us.</p>
      <p className="qq">{q.q}</p>
      <div className="qopts">
        {q.o.map((a, i) => <button key={a[0]} className={pick === i ? 'pick' : ''} disabled={pick !== null} onClick={(e) => choose(i, e)}>{a[0]}</button>)}
      </div>
      <p className="qfb" aria-live="polite">{pick !== null ? q.o[pick][1] : ''}</p>
    </div>
  )
}
