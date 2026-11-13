import { useCallback, useEffect, useMemo, useState } from 'react'
import { CFG } from './config.js'
import { CHAPTERS } from './data/content.js'
import { PhotoContext, useFx } from './context.js'
import { useMusic } from './hooks/useMusic.js'
import FxLayer from './FxLayer.jsx'
import Sprite from './components/Sprite.jsx'
import Gate from './components/Gate.jsx'
import TopBar from './components/TopBar.jsx'
import Hero from './components/Hero.jsx'
import Divider from './components/Divider.jsx'
import Letter from './components/Letter.jsx'
import Chapters from './components/Chapters.jsx'
import Games from './components/Games.jsx'
import Cake from './components/Cake.jsx'
import Months from './components/Months.jsx'
import Finale from './components/Finale.jsx'
import Lightbox from './components/Lightbox.jsx'
import SecretModal from './components/SecretModal.jsx'

function Page() {
  const fx = useFx()
  const music = useMusic()
  const [found, setFound] = useState(0)
  const [secret, setSecret] = useState(false)
  const [lb, setLb] = useState(null)

  const order = useMemo(() => CHAPTERS.flatMap((c) => c.ph.map((p) => p[0])), [])
  const openPhoto = useCallback((n) => setLb(Math.max(0, order.indexOf(n))), [order])
  const step = useCallback((d) => setLb((i) => (i === null ? i : (i + d + order.length) % order.length)), [order])
  const closeLb = useCallback(() => setLb(null), [])

  const onFind = useCallback(() => setFound((f) => f + 1), [])
  useEffect(() => {
    if (found !== 5) return
    const t = setTimeout(() => { setSecret(true); fx.rain(60) }, 700)
    return () => clearTimeout(t)
  }, [found, fx])

  const opened = () => {
    music.playTrack(0)
    if (new Date().getDate() === 15) setTimeout(() => { const { W, H } = fx.size(); fx.rain(70); fx.burst(W / 2, H / 3, 50, 420) }, 500)
  }

  return (
    <PhotoContext.Provider value={openPhoto}>
      <Sprite />
      <Gate onOpened={opened} />
      <TopBar found={found} music={music} />
      <Hero />
      <Divider />
      <Letter onFind={onFind} />
      <Chapters onFind={onFind} />
      <Divider />
      <Games onFind={onFind} />
      <Cake />
      <Months onFind={onFind} />
      <Finale />
      <p id="np" className="np" aria-live="polite">{music.note}</p>
      <footer>Made with love, for {CFG.fullName}, my {CFG.her}. Happy monthly anniversary.</footer>
      <Lightbox order={order} current={lb} onClose={closeLb} onStep={step} />
      <SecretModal open={secret} onClose={() => setSecret(false)} />
    </PhotoContext.Provider>
  )
}

export default function App() {
  return <FxLayer><Page /></FxLayer>
}
