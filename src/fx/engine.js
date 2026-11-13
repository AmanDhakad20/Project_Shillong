import { RM, rnd } from '../utils.js'

const PET = ['#e24a66', '#c4122f', '#ff8da1', '#f7a1b0', '#b3123a']

function petal(cx, s) {
  cx.beginPath(); cx.moveTo(0, -s)
  cx.bezierCurveTo(s * .95, -s * .55, s * .8, s * .75, 0, s)
  cx.bezierCurveTo(-s * .8, s * .75, -s * .95, -s * .55, 0, -s); cx.fill()
}
function heart(cx, s) {
  cx.beginPath(); cx.moveTo(0, s * .9)
  cx.bezierCurveTo(-s * 1.5, -s * .1, -s * .8, -s * 1.1, 0, -s * .35)
  cx.bezierCurveTo(s * .8, -s * 1.1, s * 1.5, -s * .1, 0, s * .9); cx.fill()
}

// Full-screen canvas: ambient falling petals, click bursts, cursor sparkles, confetti rain.
export function createEngine(canvas) {
  const cx = canvas.getContext('2d')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  let W = 0, H = 0, raf = 0, last = performance.now()
  const parts = []
  let amb = []

  const resize = () => {
    W = innerWidth; H = innerHeight
    canvas.width = W * dpr; canvas.height = H * dpr
    cx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()
  const count = RM ? 0 : innerWidth < 600 ? 14 : 26
  for (let i = 0; i < count; i++) {
    amb.push({ x: rnd(0, W), y: rnd(-H, H), s: rnd(6, 12), vy: rnd(18, 46), vx: rnd(-14, 14), r: rnd(0, 6.28), vr: rnd(-1.5, 1.5), c: PET[i % 5], ph: rnd(0, 6) })
  }

  const burst = (x, y, n = 10, spread = 260) => {
    if (RM) n = Math.min(n, 4)
    for (let i = 0; i < n; i++) {
      const a = rnd(0, 6.28), v = rnd(spread * .3, spread)
      parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 120, s: rnd(5, 11), r: rnd(0, 6), vr: rnd(-6, 6), c: i % 3 ? PET[i % 5] : '#e8bd84', k: i % 2 ? 'h' : 'p', life: rnd(1.2, 2.2), age: 0, g: 1 })
    }
  }
  const rain = (n) => {
    for (let i = 0; i < n; i++) parts.push({ x: rnd(0, W), y: rnd(-200, -10), vx: rnd(-30, 30), vy: rnd(90, 200), s: rnd(6, 12), r: rnd(0, 6), vr: rnd(-3, 3), c: PET[i % 5], k: i % 3 ? 'p' : 'h', life: 6, age: 0, g: 0 })
  }

  const loop = (t) => {
    const dt = Math.min((t - last) / 1000, .05); last = t
    if (!document.hidden) {
      cx.clearRect(0, 0, W, H)
      amb.forEach((p) => {
        p.ph += dt; p.y += p.vy * dt; p.x += (p.vx + Math.sin(p.ph) * 22) * dt; p.r += p.vr * dt
        if (p.y > H + 20) { p.y = -20; p.x = rnd(0, W) }
        cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.scale(1, Math.abs(Math.cos(p.ph)) * .7 + .3)
        cx.globalAlpha = .42; cx.fillStyle = p.c; petal(cx, p.s); cx.restore()
      })
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.age += dt
        if (p.age > p.life || p.y > H + 40) { parts.splice(i, 1); continue }
        p.vy += (p.g === 0 ? 0 : 520) * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt
        cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r)
        cx.globalAlpha = Math.max(0, 1 - Math.pow(p.age / p.life, 3)); cx.fillStyle = p.c
        p.k === 'h' ? heart(cx, p.s) : petal(cx, p.s); cx.restore()
      }
    }
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  const onDown = (e) => burst(e.clientX, e.clientY, 7, 170)
  let lastT = 0
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || RM) return
    const n = performance.now(); if (n - lastT < 70) return; lastT = n
    parts.push({ x: e.clientX, y: e.clientY, vx: rnd(-20, 20), vy: rnd(10, 40), s: rnd(3, 6), r: 0, vr: rnd(-2, 2), c: '#e8bd84', k: 'h', life: .9, age: 0, g: 1 })
  }
  document.addEventListener('pointerdown', onDown)
  document.addEventListener('pointermove', onMove)
  addEventListener('resize', resize)

  return {
    burst, rain,
    size: () => ({ W, H }),
    destroy() {
      cancelAnimationFrame(raf)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointermove', onMove)
      removeEventListener('resize', resize)
    },
  }
}
