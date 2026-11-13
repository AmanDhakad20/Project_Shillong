import { useState } from 'react'
import Reveal from './Reveal.jsx'
import HiddenHeart from './HiddenHeart.jsx'
import Memory from './games/Memory.jsx'
import Catch from './games/Catch.jsx'
import Puzzle from './games/Puzzle.jsx'
import Quiz from './games/Quiz.jsx'
import Scratch from './games/Scratch.jsx'

const GAMES = [
  { id: 'memory', label: 'Memory match', C: Memory },
  { id: 'catch', label: 'Catch the treats', C: Catch },
  { id: 'puzzle', label: 'Photo puzzle', C: Puzzle },
  { id: 'quiz', label: 'Us quiz', C: Quiz },
  { id: 'scratch', label: 'Scratch cards', C: Scratch },
]

export default function Games({ onFind }) {
  const [active, setActive] = useState('memory')
  // Scratch cards need real sizes, so they mount the first time their tab opens, then stay mounted.
  const [seen, setSeen] = useState(new Set(['memory', 'catch', 'puzzle', 'quiz']))
  const pick = (id) => { setActive(id); setSeen((s) => new Set(s).add(id)) }
  return (
    <section id="games">
      <div className="wrap">
        <Reveal as="h2">Play with me</Reveal>
        <Reveal as="p" className="lede">Five little games. Win them and you unlock things.</Reveal>
        <div className="tabs" role="tablist">
          {GAMES.map((g) => <button key={g.id} className="tab" role="tab" aria-selected={active === g.id} onClick={() => pick(g.id)}>{g.label}</button>)}
        </div>
        {GAMES.map(({ id, C }) => seen.has(id) && <div key={id} className={`game${active === id ? ' on' : ''}`}><C /></div>)}
      </div>
      <HiddenHeart onFind={onFind} />
    </section>
  )
}
