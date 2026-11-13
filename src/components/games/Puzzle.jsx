import { useState } from 'react'
import { useFx } from '../../context.js'

const adj = (i, j) => Math.abs(Math.floor(i / 3) - Math.floor(j / 3)) + Math.abs((i % 3) - (j % 3)) === 1
const solved = (t) => t.every((v, k) => v === k)

function scramble() {
  for (;;) {
    const t = [0, 1, 2, 3, 4, 5, 6, 7, 8]; let e = 8
    for (let k = 0; k < 160; k++) {
      const ns = []; for (let j = 0; j < 9; j++) if (adj(j, e)) ns.push(j)
      const n = ns[Math.floor(Math.random() * ns.length)]
      t[e] = t[n]; t[n] = 8; e = n
    }
    if (!solved(t)) return t
  }
}

export default function Puzzle() {
  const fx = useFx()
  const [tiles, setTiles] = useState(scramble)
  const [moves, setMoves] = useState(0)
  const [done, setDone] = useState(false)

  const reset = () => { setTiles(scramble()); setMoves(0); setDone(false) }
  const move = (i) => {
    if (done) return
    const e = tiles.indexOf(8); if (!adj(i, e)) return
    const t = tiles.slice(); [t[i], t[e]] = [t[e], t[i]]
    setTiles(t); setMoves((m) => m + 1)
    if (solved(t)) { setDone(true); const { W, H } = fx.size(); fx.burst(W / 2, H / 2, 50, 400) }
  }

  return (
    <div>
      <h3>Photo puzzle</h3>
      <p className="how">Slide the pieces to put us back together. Tap a piece next to the gap.</p>
      <div className="stat"><span>Moves: <b>{moves}</b></span></div>
      <div className={`pz${done ? ' done' : ''}`}>
        {tiles.map((v, i) => {
          const empty = v === 8 && !done
          return (
            <button key={i} className={`pt${empty ? ' e' : ''}`} aria-label={v === 8 ? 'Empty space' : 'Puzzle piece'}
              style={empty ? undefined : { backgroundImage: 'url(img/puzzle.jpg)', backgroundPosition: `${(v % 3) * 50}% ${Math.floor(v / 3) * 50}%` }} onClick={() => move(i)} />
          )
        })}
      </div>
      <p className={`win${done ? ' on' : ''}`}>Back together, exactly where we belong.</p>
      <p><button className="btn ghost" onClick={reset}>Shuffle again</button></p>
    </div>
  )
}
