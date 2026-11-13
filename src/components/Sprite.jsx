import { SPRITE } from './sprite.js'
import { useFx } from '../context.js'

export default function Sprite() {
  return <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: SPRITE }} />
}

export function Heart({ className, fill }) {
  return <svg className={className} viewBox="0 0 32 29.6" fill={fill}><use href="#heart" /></svg>
}

// The two little round characters. Tap one for a burst of hearts.
export function Buddy({ which = 1, side = false }) {
  const fx = useFx()
  const tap = (e) => { const r = e.currentTarget.getBoundingClientRect(); fx.burst(r.left + r.width / 2, r.top + 10, 16, 280) }
  return (
    <svg className={`buddy${which === 2 ? ' b2' : ''}${side ? ' side' : ''}`} onClick={tap}>
      <use href={`#mo${which}`} />
    </svg>
  )
}
