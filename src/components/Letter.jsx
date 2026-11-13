import { useEffect, useMemo, useRef, useState } from 'react'
import { CFG } from '../config.js'
import { LETTER } from '../data/content.js'
import { RM } from '../utils.js'
import Reveal from './Reveal.jsx'
import HiddenHeart from './HiddenHeart.jsx'

// The letter types itself out the first time it is seen.
export default function Letter({ onFind }) {
  const texts = useMemo(() => LETTER(CFG.her, CFG.him), [])
  const [shown, setShown] = useState(() => (RM ? texts : texts.map(() => '')))
  const [caret, setCaret] = useState(-1)
  const ref = useRef(null)

  useEffect(() => {
    if (RM) return
    let timer, io, i = 0, j = 0, dead = false
    const go = () => {
      if (dead) return
      if (i >= texts.length) { setCaret(-1); return }
      const ii = i
      j++; setCaret(ii); setShown((prev) => { const n = prev.slice(); n[ii] = texts[ii].slice(0, j); return n })
      if (j >= texts[ii].length) { i++; j = 0; setCaret(-1); timer = setTimeout(go, 380) }
      else timer = setTimeout(go, ii === texts.length - 1 ? 60 : 26)
    }
    io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { io.disconnect(); go() } }, { threshold: .3 })
    io.observe(ref.current)
    return () => { dead = true; clearTimeout(timer); io.disconnect() }
  }, [texts])

  return (
    <section id="letter">
      <div className="wrap">
        <Reveal className="paper"><div ref={ref}>
          {texts.map((t, i) => <p key={i} className={`${i === texts.length - 1 ? 'sig' : ''} ${caret === i ? 'caret' : ''}`}>{shown[i]}</p>)}
        </div></Reveal>
      </div>
      <HiddenHeart onFind={onFind} />
    </section>
  )
}
