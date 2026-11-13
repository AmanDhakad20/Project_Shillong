import { useEffect, useRef } from 'react'
import { COUPONS } from '../../data/content.js'
import { useFx } from '../../context.js'

function Card({ text }) {
  const fx = useFx()
  const box = useRef(null), cv = useRef(null)
  useEffect(() => {
    const d = box.current, c = cv.current, w = d.offsetWidth, h = d.offsetHeight
    c.width = w; c.height = h
    const x = c.getContext('2d')
    const g = x.createLinearGradient(0, 0, w, h)
    g.addColorStop(0, '#d9a85c'); g.addColorStop(.5, '#f6dba0'); g.addColorStop(1, '#c98f3d')
    x.fillStyle = g; x.fillRect(0, 0, w, h)
    x.fillStyle = 'rgba(120,60,20,.55)'; x.font = '700 20px "Nunito Sans",sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('SCRATCH HERE', w / 2, h / 2)
    let down = false, done = false
    const scratch = (e) => {
      if (!down || done) return
      const r = c.getBoundingClientRect()
      x.globalCompositeOperation = 'destination-out'; x.beginPath()
      x.arc((e.clientX - r.left) * w / r.width, (e.clientY - r.top) * h / r.height, 20, 0, 6.3); x.fill()
    }
    const downH = (e) => { down = true; c.setPointerCapture(e.pointerId); scratch(e) }
    const upH = () => {
      down = false; if (done) return
      const dd = x.getImageData(0, 0, w, h).data; let n = 0, tot = 0
      for (let i = 3; i < dd.length; i += 64) { tot++; if (dd[i] < 40) n++ }
      if (n / tot > .5) {
        done = true; c.style.opacity = 0; c.style.pointerEvents = 'none'
        const r = d.getBoundingClientRect(); fx.burst(r.left + r.width / 2, r.top + r.height / 2, 24, 300)
      }
    }
    c.addEventListener('pointerdown', downH); c.addEventListener('pointermove', scratch); c.addEventListener('pointerup', upH)
    return () => { c.removeEventListener('pointerdown', downH); c.removeEventListener('pointermove', scratch); c.removeEventListener('pointerup', upH) }
  }, [fx])
  return <div className="sk" ref={box}><span>{text}</span><canvas ref={cv} /></div>
}

export default function Scratch() {
  return (
    <div>
      <h3>Scratch cards</h3>
      <p className="how">Scratch with your finger. Every card is a real promise.</p>
      <div className="sc">{COUPONS.map((t) => <Card key={t} text={t} />)}</div>
    </div>
  )
}
