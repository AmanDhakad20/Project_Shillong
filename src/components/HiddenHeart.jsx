import { useState } from 'react'
import { rnd } from '../utils.js'
import { useFx } from '../context.js'
import { Heart } from './Sprite.jsx'

// A small heart tucked somewhere in a section. Finding all five unlocks a secret.
export default function HiddenHeart({ onFind }) {
  const fx = useFx()
  const [pos] = useState(() => ({ left: rnd(8, 86) + '%', top: rnd(30, 85) + '%' }))
  const [got, setGot] = useState(false)
  const click = (e) => {
    e.stopPropagation()
    if (got) return
    setGot(true)
    const r = e.currentTarget.getBoundingClientRect()
    fx.burst(r.left + 13, r.top + 13, 18, 300)
    onFind()
  }
  return <button className={`hh${got ? ' got' : ''}`} style={pos} aria-label="A hidden heart" onClick={click}><Heart /></button>
}
