import { useEffect, useRef } from 'react'
import { img } from '../utils.js'

export default function Lightbox({ order, current, onClose, onStep }) {
  const tx = useRef(0)
  const on = current !== null
  useEffect(() => {
    if (!on) return
    const k = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') onStep(1); if (e.key === 'ArrowLeft') onStep(-1) }
    document.addEventListener('keydown', k)
    return () => document.removeEventListener('keydown', k)
  }, [on, onClose, onStep])
  return (
    <div id="lb" className={on ? 'on' : ''} role="dialog" aria-label="Photo viewer"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      onTouchStart={(e) => { tx.current = e.touches[0].clientX }}
      onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - tx.current; if (Math.abs(d) > 50) onStep(d < 0 ? 1 : -1) }}>
      <button className="x" aria-label="Close" onClick={onClose}>&times;</button>
      <button className="pv" aria-label="Previous" onClick={() => onStep(-1)}>&#8249;</button>
      {on && <img src={img(order[current], 'full')} alt="" />}
      <button className="nx" aria-label="Next" onClick={() => onStep(1)}>&#8250;</button>
    </div>
  )
}
