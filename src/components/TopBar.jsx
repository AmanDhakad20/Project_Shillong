import { TRACKS } from '../config.js'
import { Heart } from './Sprite.jsx'

export default function TopBar({ found, music }) {
  const { tcur, playing, muted, toggleTrack, toggleMute } = music
  return (
    <div className="bar">
      <span className="pill" id="found" title="Hidden hearts are scattered through the page">
        <Heart fill="#e24a66" />
        <span><span id="fcount">{found} / 5</span><span className="lbl"> hidden hearts</span></span>
      </span>
      <div className="pill player" role="group" aria-label="Music">
        {TRACKS.map((t, i) => (
          <button key={t.src} className="trk" aria-pressed={playing && tcur === i} title={`${t.n}, ${t.a}`} onClick={() => toggleTrack(i)}>{t.label}</button>
        ))}
        <button id="mute" aria-pressed={muted} aria-label={muted ? 'Unmute' : 'Mute'} onClick={toggleMute}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M3 9v6h4l5 4V5L7 9z" />
            <path className="w" d="M16 8a5 5 0 010 8M19 5a9 9 0 010 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path className="sl" d="M4 4l16 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
