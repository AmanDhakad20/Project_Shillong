import { useEffect, useRef, useState } from 'react'
import { useFx } from '../context.js'
import Reveal from './Reveal.jsx'
import { Buddy } from './Sprite.jsx'

const CANDLES = [
  { id: 0, x: 136, top: 108, h: 62, flame: 'M142 78c10 14 10 24 0 30-10-6-10-16 0-30z', body: '#ffd6df', band: '#e24a66', b1: 124, b2: 144 },
  { id: 1, x: 194, top: 96, h: 74, flame: 'M200 64c10 14 10 24 0 30-10-6-10-16 0-30z', body: '#fff0e4', band: '#e8bd84', b1: 114, b2: 136 },
  { id: 2, x: 252, top: 108, h: 62, flame: 'M258 78c10 14 10 24 0 30-10-6-10-16 0-30z', body: '#ffd6df', band: '#e24a66', b1: 124, b2: 144 },
]

export default function Cake() {
  const fx = useFx()
  const [out, setOut] = useState([false, false, false])
  const [wish, setWish] = useState('')
  const [relight, setRelight] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  const blow = (i, e) => {
    if (out[i]) return
    const next = out.slice(); next[i] = true; setOut(next)
    const r = e.currentTarget.getBoundingClientRect(); fx.burst(r.left + r.width / 2, r.top, 8, 120)
    if (next.every(Boolean)) {
      setWish('Make a wish, my love...')
      timer.current = setTimeout(() => {
        setWish('May every month taste sweeter than this cake.')
        const { W, H } = fx.size(); fx.burst(W / 2, H / 2, 70, 480); fx.rain(50); setRelight(true)
      }, 2200)
    }
  }
  const lightAgain = () => { clearTimeout(timer.current); setOut([false, false, false]); setWish(''); setRelight(false) }

  return (
    <section id="cakesec" className="center">
      <div className="wrap cakebox">
        <Reveal as="h2">Cake time</Reveal>
        <Reveal as="p" className="lede">Chocolate truffle cake, of course. Tap each flame to blow it out and make a wish.</Reveal>
        <div className="cakerow">
          <Buddy which={1} side />
          <Reveal as="svg" className="cake" viewBox="0 0 400 330" aria-label="Chocolate truffle cake with candles">
            <defs>
              <linearGradient id="ckA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6b3a28" /><stop offset="1" stopColor="#3a1b12" /></linearGradient>
              <linearGradient id="ckB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3b1a10" /><stop offset="1" stopColor="#26100a" /></linearGradient>
              <radialGradient id="ckF" cx="50%" cy="70%" r="60%"><stop offset="0" stopColor="#fff6c8" /><stop offset=".5" stopColor="#ffb84a" /><stop offset="1" stopColor="#ff5a2a" /></radialGradient>
            </defs>
            <ellipse cx="200" cy="300" rx="190" ry="26" fill="#f4dcd0" /><ellipse cx="200" cy="296" rx="170" ry="20" fill="#fff0e4" />
            <path d="M60 220v60c0 14 62 24 140 24s140-10 140-24v-60z" fill="url(#ckA)" />
            <ellipse cx="200" cy="220" rx="140" ry="26" fill="#5a2e20" />
            <path d="M70 180v60c0 12 58 20 130 20s130-8 130-20v-60z" fill="url(#ckA)" />
            <path d="M62 176c0 0 8 34 18 34s12-24 22-24 10 38 22 38 12-30 24-30 12 20 24 20 12-26 24-26 12 28 24 28 12-30 24-30 12 22 22 22 16-30 16-34c0 20-56 30-128 30s-128-10-128-28z" fill="url(#ckB)" />
            <ellipse cx="200" cy="178" rx="132" ry="24" fill="#2e140c" />
            <ellipse cx="200" cy="174" rx="120" ry="18" fill="#4b2216" />
            <g fill="#c4122f"><circle cx="110" cy="176" r="9" /><circle cx="290" cy="176" r="9" /><circle cx="150" cy="190" r="9" /><circle cx="250" cy="190" r="9" /></g>
            <g fill="#ff9aa9" opacity=".7"><circle cx="107" cy="173" r="2.5" /><circle cx="287" cy="173" r="2.5" /><circle cx="147" cy="187" r="2.5" /><circle cx="247" cy="187" r="2.5" /></g>
            <g>
              {CANDLES.map((c) => (
                <g key={c.id} className="cand" onClick={(e) => blow(c.id, e)}>
                  <rect x={c.x} y={c.top} width="12" height={c.h} rx="3" fill={c.body} />
                  <rect x={c.x} y={c.b1} width="12" height="6" fill={c.band} />
                  <rect x={c.x} y={c.b2} width="12" height="6" fill={c.band} />
                  <path className={`flame${out[c.id] ? ' out' : ''}`} d={c.flame} fill="url(#ckF)" />
                </g>
              ))}
            </g>
          </Reveal>
          <Buddy which={2} side />
        </div>
        <p className="wish" aria-live="polite">{wish}</p>
        <p><button className="btn ghost" hidden={!relight} onClick={lightAgain}>Light them again</button></p>
        <Reveal className="menu">
          <div><b>Chocolate truffle cake</b>Dark, soft and a little bit dangerous. Yours, always.</div>
          <div><b>Milk cake</b>Sweet, grainy, golden. One box, no sharing.</div>
          <div><b>Pasta</b>Creamy or spicy, we will find the best bowl in town.</div>
          <div><b>Roses</b>Red ones, as many as I can carry.</div>
        </Reveal>
      </div>
    </section>
  )
}
