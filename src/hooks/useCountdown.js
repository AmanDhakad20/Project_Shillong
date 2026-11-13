import { useEffect, useState } from 'react'
import { nextDate, pad } from '../utils.js'

export function useCountdown() {
  const calc = () => {
    const n = new Date()
    if (n.getDate() === 15) return { today: true }
    const s = Math.floor((nextDate() - n) / 1000)
    return { today: false, d: Math.floor(s / 86400), h: pad(Math.floor(s % 86400 / 3600)), m: pad(Math.floor(s % 3600 / 60)), s: pad(s % 60) }
  }
  const [v, setV] = useState(calc)
  useEffect(() => { const id = setInterval(() => setV(calc()), 1000); return () => clearInterval(id) }, [])
  return v
}
