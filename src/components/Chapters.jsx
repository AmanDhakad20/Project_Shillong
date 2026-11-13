import { CHAPTERS, LANDSCAPE } from '../data/content.js'
import { img } from '../utils.js'
import { usePhoto } from '../context.js'
import Reveal from './Reveal.jsx'
import HiddenHeart from './HiddenHeart.jsx'

function Polaroid({ n, caption }) {
  const open = usePhoto()
  return (
    <Reveal as="button" className={`poly${LANDSCAPE.has(n) ? ' l' : ''}`} onClick={() => open(n)}>
      <img src={img(n, 'thumb')} alt={caption} loading="lazy" />
      <span>{caption}</span>
    </Reveal>
  )
}

function Chapter({ c, index, onFind }) {
  const heading = (
    <>
      <span className="tag">{c.tag}</span>
      <h2>{c.title}</h2>
    </>
  )
  return (
    <section id={`ch${index}`} style={{ paddingBlock: '0 56px' }}>
      {c.cover ? (
        <div className="cover">
          <img src={img(+c.cover, 'full')} alt="" style={{ objectPosition: c.pos }} loading="lazy" />
          <div className="wrap">{heading}</div>
        </div>
      ) : (
        <div className="wrap" style={{ paddingTop: 64 }}>{heading}</div>
      )}
      <div className="wrap">
        <Reveal as="p" className="note">{c.note}</Reveal>
        <div className="polys">
          {c.ph.map(([n, cap]) => <Polaroid key={n} n={n} caption={cap} />)}
        </div>
      </div>
      {onFind && <HiddenHeart onFind={onFind} />}
    </section>
  )
}

// Hidden hearts live in the second and fourth chapters.
export default function Chapters({ onFind }) {
  return (
    <div id="chapters">
      {CHAPTERS.map((c, i) => <Chapter key={c.title} c={c} index={i} onFind={i === 1 || i === 3 ? onFind : null} />)}
    </div>
  )
}
