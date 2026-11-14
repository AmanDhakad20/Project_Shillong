import { useState } from 'react'
import { CFG } from '../config.js'
import { useFx } from '../context.js'
import { Heart } from './Sprite.jsx'
import { useEffect} from 'react'

// Envelope opening screen. Tapping the seal opens it, then starts the music.
export default function Gate({ onOpened }) {
  const fx = useFx()
    // Keep the page still behind the envelope, then start at the very top once it opens.
    useEffect(() => {
      const root = document.documentElement
      root.classList.add('locked')
      return () => root.classList.remove('locked')
    }, [])
    const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  const [phase, setPhase] = useState('idle')
  const open = () => {
    if (phase !== 'idle') return
    setPhase('open'); toTop()
    setTimeout(() => { const { W, H } = fx.size(); fx.burst(W / 2, H / 2, 40, 420); fx.rain(40) }, 900)
    setTimeout(() => { document.documentElement.classList.remove('locked'); toTop(); setPhase('gone'); onOpened() }, 2300)
  }
  return (
    <div id="gate" className={phase === 'idle' ? '' : phase === 'open' ? 'open' : 'open gone'} role="dialog" aria-label="Open your surprise" aria-hidden={phase === 'gone'}>
      <div className="gate-in">
        <p className="sm">A little something for</p>
        <p className="big">{CFG.her}</p>
        <button className="env" onClick={open} aria-label="Open the envelope" tabIndex={phase === 'gone' ? -1 : 0}>
          <span className="flap" /><span className="card">Happy Monthly<br />Anniversary</span><span className="pocket" />
          <span className="seal"><Heart /></span>
        </button>
        <p className="tap">TAP THE SEAL TO OPEN</p>
      </div>
    </div>
  )
}
