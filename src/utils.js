export const RM = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const pad = (n) => (n < 10 ? '0' + n : '' + n)
export const rnd = (a, b) => a + Math.random() * (b - a)
export const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }
export const img = (n, dir) => `img/${dir}/${pad(n)}.jpg`

export function nextDate() {
  const n = new Date(), y = n.getFullYear(), m = n.getMonth()
  return n.getDate() > 15 ? new Date(y, m + 1, 15) : new Date(y, m, 15)
}
