import { useCallback, useEffect, useRef, useState } from 'react'
import { TRACKS } from '../config.js'
import { startBox, stopBox } from '../fx/musicBox.js'

// Plays the chosen song on loop. If a song file is missing, a soft tune plays instead.
export function useMusic() {
  const au = useRef(null)
  const fbOn = useRef(false)
  const [tcur, setTcur] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [note, setNote] = useState('')
  const mutedRef = useRef(false)

  useEffect(() => {
    au.current = new Audio(); au.current.loop = true; au.current.preload = 'auto'
    return () => { au.current.pause(); stopBox() }
  }, [])

  const useBox = useCallback(() => {
    if (fbOn.current) return
    fbOn.current = true
    setNote('Song file not added yet, so a soft tune is playing')
    if (!mutedRef.current) startBox()
  }, [])

  const playTrack = useCallback((i) => {
    const a = au.current; if (!a) return
    setTcur(i); setPlaying(true)
    setNote('Now playing: ' + TRACKS[i].n + ' by ' + TRACKS[i].a)
    a.src = TRACKS[i].src; a.muted = mutedRef.current
    a.onerror = useBox
    let p; try { p = a.play() } catch (e) { /* ignore */ }
    if (p && p.catch) p.catch(useBox)
  }, [useBox])

  const toggleTrack = useCallback((i) => {
    const a = au.current
    if (playing && tcur === i) { setPlaying(false); a.pause(); stopBox(); setNote('Paused'); return }
    if (fbOn.current) {
      setTcur(i); setPlaying(true)
      setNote('Song file not added yet, so a soft tune is playing')
      if (!mutedRef.current) startBox()
      return
    }
    playTrack(i)
  }, [playing, tcur, playTrack])

  const toggleMute = useCallback(() => {
    const m = !mutedRef.current
    mutedRef.current = m; setMuted(m)
    if (au.current) au.current.muted = m
    if (fbOn.current && playing) { m ? stopBox() : startBox() }
  }, [playing])

  return { tcur, playing, muted, note, playTrack, toggleTrack, toggleMute }
}
