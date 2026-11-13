// Soft music-box tune, only used as a stand-in when a song file cannot load.
const N = { C3: 130.8, E3: 164.8, F3: 174.6, G3: 196, A3: 220, C4: 261.6, D4: 293.7, E4: 329.6, F4: 349.2, G4: 392, A4: 440, B4: 493.9, C5: 523.3, D5: 587.3, E5: 659.3, G5: 784 }
const CHORDS = [['C3', 'G3', 'C4', 'E4'], ['A3', 'E4', 'A4', 'C5'], ['F3', 'C4', 'F4', 'A4'], ['G3', 'D4', 'G4', 'B4']]
const MEL = [['E5', 0, 'D5', 0, 'C5', 0, 'D5', 0], ['C5', 0, 'E5', 0, 'D5', 0, 'C5', 0], ['A4', 0, 'C5', 0, 'A4', 0, 'G4', 0], ['B4', 0, 'D5', 0, 'G5', 0, 'D5', 0]]
let ac = null, mg = null, timer = null, step = 0

function bell(f, t, d, v) {
  const o = ac.createOscillator(), o2 = ac.createOscillator(), g = ac.createGain()
  o.type = 'sine'; o2.type = 'triangle'; o.frequency.value = f; o2.frequency.value = f * 2
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + d)
  o.connect(g); o2.connect(g); g.connect(mg); o.start(t); o2.start(t); o.stop(t + d); o2.stop(t + d)
}
function tick() {
  const t = ac.currentTime + .05, beat = 60 / 68 / 2
  for (let k = 0; k < 4; k++) {
    const s = step % 32, ch = CHORDS[Math.floor(s / 8) % 4], tt = t + k * beat
    bell(N[ch[s % 4]], tt, 1.6, .16)
    const m = MEL[Math.floor(s / 8) % 4][s % 8]; if (m) bell(N[m], tt, 2, .1)
    step++
  }
}
export function startBox() {
  try {
    if (!ac) {
      const AC = window.AudioContext || window.webkitAudioContext
      ac = new AC(); mg = ac.createGain(); mg.gain.value = .5
      const dl = ac.createDelay(); dl.delayTime.value = .32
      const fb = ac.createGain(); fb.gain.value = .35
      mg.connect(ac.destination); mg.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(ac.destination)
    }
    ac.resume(); if (!timer) timer = setInterval(tick, 4 * 60 / 68 / 2 * 1000); tick()
  } catch (e) { /* audio not available */ }
}
export function stopBox() { if (ac) ac.suspend() }
