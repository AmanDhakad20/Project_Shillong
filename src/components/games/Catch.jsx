import { useEffect, useRef, useState } from 'react'
import { rnd } from '../../utils.js'
import { useFx } from '../../context.js'

const CW = 480, CH = 440
const GOOD = ['🌹', '🍰', '🍝', '🍬', '🍫']
const BAD = '🥀'

export default function Catch() {
  const fx = useFx()
  const cv = useRef(null)
  const g = useRef({ run: false, items: [], score: 0, lives: 3, bx: CW / 2, sp: 0, t: 0, raf: 0 })
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [msg, setMsg] = useState({ show: true, title: 'Ready?', btn: 'Start' })
  const [won, setWon] = useState(false)

  const draw = () => {
    const c2 = cv.current.getContext('2d'), s = g.current
    c2.clearRect(0, 0, CW, CH); c2.textAlign = 'center'; c2.textBaseline = 'middle'
    s.items.forEach((it) => { c2.font = '36px serif'; c2.fillText(it.e, it.x, it.y) })
    c2.font = '56px serif'; c2.fillText('🧺', s.bx, CH - 34)
  }
  useEffect(() => { draw(); return () => cancelAnimationFrame(g.current.raf) }, [])

  const end = (win) => {
    const s = g.current; s.run = false
    setMsg({ show: true, title: win ? 'You did it!' : 'Oh no, the roses wilted. Try again?', btn: win ? 'Play again' : 'Try again' })
    if (win) { setWon(true); const { W, H } = fx.size(); fx.burst(W / 2, H / 2, 60, 450); fx.rain(40) }
  }

  const loop = (t) => {
    const s = g.current; if (!s.run) return
    const dt = Math.min((t - s.t) / 1000, .05); s.t = t; s.sp -= dt
    if (s.sp <= 0) {
      s.sp = Math.max(.42, .85 - s.score * .025)
      const bad = Math.random() < .22
      s.items.push({ x: rnd(30, CW - 30), y: -20, e: bad ? BAD : GOOD[Math.floor(rnd(0, GOOD.length))], bad, v: rnd(130, 190) + s.score * 7 })
    }
    for (let i = s.items.length - 1; i >= 0; i--) {
      const it = s.items[i]; it.y += it.v * dt
      if (it.y > CH - 62 && it.y < CH - 10 && Math.abs(it.x - s.bx) < 46) {
        s.items.splice(i, 1)
        if (it.bad) { s.lives--; setLives(s.lives); if (s.lives <= 0) { draw(); return end(false) } }
        else { s.score++; setScore(s.score); if (s.score >= 15) { draw(); return end(true) } }
      } else if (it.y > CH + 30) s.items.splice(i, 1)
    }
    draw(); s.raf = requestAnimationFrame(loop)
  }

  const start = () => {
    const s = g.current
    s.items = []; s.score = 0; s.lives = 3; s.sp = 0
    setScore(0); setLives(3); setWon(false); setMsg((m) => ({ ...m, show: false }))
    s.run = true; s.t = performance.now(); s.raf = requestAnimationFrame(loop)
  }
  const move = (e) => {
    const r = cv.current.getBoundingClientRect()
    g.current.bx = Math.max(30, Math.min(CW - 30, (e.clientX - r.left) / r.width * CW))
  }

  return (
    <div>
      <h3>Catch the treats</h3>
      <p className="how">Slide the basket. Catch roses, chocolate truffle cake, pasta and milk cake. Skip the wilted ones. Collect 15.</p>
      <div className="stat"><span>Caught: <b>{score}</b>/15</span><span>Lives: {lives}</span></div>
      <div className="cw">
        <canvas ref={cv} id="catch" width={CW} height={CH} onPointerMove={move} onPointerDown={move} />
        <div className={`cover-msg${msg.show ? '' : ' off'}`}>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 24 }}>{msg.title}</div>
          <button className="btn" onClick={start}>{msg.btn}</button>
        </div>
      </div>
      <p className={`win${won ? ' on' : ''}`}>15 treats caught! Your prize: one real pasta date, and the chocolate truffle cake is on me.</p>
    </div>
  )
}
