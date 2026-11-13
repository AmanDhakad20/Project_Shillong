import { useRef, useState } from 'react'
import { MEMORY_PHOTOS } from '../../data/content.js'
import { img, shuffle } from '../../utils.js'
import { useFx } from '../../context.js'
import { Heart } from '../Sprite.jsx'

const deal = () => shuffle(MEMORY_PHOTOS.concat(MEMORY_PHOTOS)).map((k, id) => ({ id, k, up: false, ok: false }))

export default function Memory() {
  const fx = useFx()
  const [cards, setCards] = useState(deal)
  const [moves, setMoves] = useState(0)
  const [pairs, setPairs] = useState(0)
  const first = useRef(null)
  const lock = useRef(false)

  const reset = () => { setCards(deal()); setMoves(0); setPairs(0); first.current = null; lock.current = false }
  const set = (ids, patch) => setCards((cs) => cs.map((c) => (ids.includes(c.id) ? { ...c, ...patch } : c)))

  const flip = (card, e) => {
    if (lock.current || card.up || card.ok) return
    set([card.id], { up: true })
    if (first.current === null) { first.current = card; return }
    const a = first.current; first.current = null
    setMoves((m) => m + 1)
    if (a.k === card.k) {
      set([a.id, card.id], { ok: true })
      const r = e.currentTarget.getBoundingClientRect()
      fx.burst(r.left + r.width / 2, r.top + r.height / 2, 12, 220)
      setPairs((p) => {
        if (p + 1 === 8) { const { W, H } = fx.size(); fx.burst(W / 2, H / 2, 50, 420) }
        return p + 1
      })
    } else {
      lock.current = true
      setTimeout(() => { set([a.id, card.id], { up: false }); lock.current = false }, 800)
    }
  }

  return (
    <div>
      <h3>Memory match</h3>
      <p className="how">Flip two cards. Match all eight pairs of us.</p>
      <div className="stat"><span>Moves: <b>{moves}</b></span><span>Pairs: <b>{pairs}</b>/8</span></div>
      <div className="mem">
        {cards.map((c) => (
          <button key={c.id} className={`mc${c.up ? ' up' : ''}${c.ok ? ' ok' : ''}`} aria-label="Card" onClick={(e) => flip(c, e)}>
            <i className="bk"><Heart /></i>
            <i className="fr"><img src={img(c.k, 'sq')} alt="" /></i>
          </button>
        ))}
      </div>
      <p className={`win${pairs === 8 ? ' on' : ''}`}>You matched every one. Of course you did, you know my face better than anyone.</p>
      <p><button className="btn ghost" onClick={reset}>Shuffle again</button></p>
    </div>
  )
}
