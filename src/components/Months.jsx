import { useMemo, useState } from 'react'
import { MONTH_NOTES } from '../data/content.js'
import { nextDate } from '../utils.js'
import { useFx } from '../context.js'
import Reveal from './Reveal.jsx'
import HiddenHeart from './HiddenHeart.jsx'
import { Heart } from './Sprite.jsx'

const MS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function Months({ onFind }) {
  const fx = useFx()
  const [note, setNote] = useState('')
  const { list, today } = useMemo(() => {
    const t = new Date().getDate() === 15, base = t ? new Date() : nextDate()
    return { today: t, list: Array.from({ length: 12 }, (_, m) => new Date(base.getFullYear(), base.getMonth() + m, 15)) }
  }, [])
  const open = (i, e) => {
    setNote(MONTH_NOTES[(i + list[0].getMonth()) % 12])
    const r = e.currentTarget.getBoundingClientRect(); fx.burst(r.left + r.width / 2, r.top + 20, 14, 260)
  }
  return (
    <section id="monthly">
      <div className="wrap center">
        <Reveal as="h2">Every 15th</Reveal>
        <Reveal as="p" className="lede">One more month together, again and again. Tap a month to open its note.</Reveal>
        <div className="months">
          {list.map((d, i) => (
            <Reveal as="button" key={i} className={`mo${i === 0 ? ' next' : ''}`} onClick={(e) => open(i, e)}>
              <Heart /><b>15 {MS[d.getMonth()]}</b><small>{i === 0 ? (today ? 'today' : 'up next') : d.getFullYear()}</small>
            </Reveal>
          ))}
        </div>
        <p className="mnote" aria-live="polite">{note}</p>
      </div>
      <HiddenHeart onFind={onFind} />
    </section>
  )
}
