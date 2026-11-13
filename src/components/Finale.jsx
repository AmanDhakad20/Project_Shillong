import { useRef, useState } from 'react'
import { NO_TEXTS } from '../data/content.js'
import { rnd } from '../utils.js'
import { useFx } from '../context.js'
import Reveal from './Reveal.jsx'
import { Buddy } from './Sprite.jsx'

export default function Finale() {
  const fx = useFx()
  const box = useRef(null)
  const [dodge, setDodge] = useState(0)
  const [noPos, setNoPos] = useState(null)
  const [yes, setYes] = useState(false)

  const runAway = (e) => {
    if (e.type === 'touchstart') e.preventDefault()
    const n = dodge + 1; setDodge(n)
    const b = box.current.getBoundingClientRect()
    setNoPos({ left: rnd(0, Math.max(0, b.width - 90)), top: rnd(0, b.height - 60) })
  }
  const accept = () => {
    setYes(true); document.documentElement.classList.add('celebrate')
    let n = 0
    const iv = setInterval(() => {
      const { W, H } = fx.size()
      fx.burst(rnd(W * .15, W * .85), rnd(H * .2, H * .6), 40, 420); fx.rain(14)
      if (++n > 7) clearInterval(iv)
    }, 450)
  }

  return (
    <section className="final" id="final">
      <div className="wrap">
        <div className="fpair">
          <Buddy which={1} side />
          <Reveal as="svg" className="bouquet" viewBox="0 0 320 300" aria-hidden="true">
            <g stroke="#2f7a46" strokeWidth="5" fill="none" strokeLinecap="round"><path d="M160 290V170M160 290C140 230 100 200 80 150M160 290C180 230 220 200 240 150M160 290C120 250 60 230 50 200M160 290C200 250 260 230 270 200" /></g>
            <g fill="#2f7a46"><ellipse cx="130" cy="240" rx="22" ry="9" transform="rotate(-35 130 240)" /><ellipse cx="192" cy="240" rx="22" ry="9" transform="rotate(35 192 240)" /></g>
            <use href="#rose" x="104" y="90" width="112" height="112" /><use href="#rose" x="38" y="86" width="84" height="84" /><use href="#rose" x="198" y="86" width="84" height="84" /><use href="#rose" x="6" y="150" width="70" height="70" /><use href="#rose" x="244" y="150" width="70" height="70" />
            <path d="M110 290h100l-14-30h-72z" fill="#f4dcd0" opacity=".9" />
          </Reveal>
          <Buddy which={2} side />
        </div>
        <Reveal as="p" className="ask">{yes ? 'I knew it!' : 'Will you be mine for another month?'}</Reveal>
        {!yes && (
          <div className="btns" ref={box}>
            <button className="btn" style={{ transform: `scale(${Math.min(1 + dodge * .1, 1.6)})` }} id="yes" onClick={accept}>Yes, always</button>
            <button className="btn ghost" id="no" style={noPos ? { right: 'auto', ...noPos } : undefined}
              onPointerEnter={runAway} onClick={runAway} onTouchStart={runAway}>{NO_TEXTS[Math.min(dodge, NO_TEXTS.length - 1)]}</button>
          </div>
        )}
        <div className={`after${yes ? ' on' : ''}`}>
          <p>Then it is settled. See you on the 15th, and on every day in between.</p>
          <p style={{ fontFamily: 'var(--f-script)', fontSize: 44, color: 'var(--rose)' }}>I love you</p>
        </div>
      </div>
    </section>
  )
}
