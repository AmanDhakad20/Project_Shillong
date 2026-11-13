import { CFG } from '../config.js'
import { nextDate } from '../utils.js'
import { useCountdown } from '../hooks/useCountdown.js'
import { Buddy } from './Sprite.jsx'

function monthNumber(today) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(CFG.startDate)) return 0
  const sd = CFG.startDate.split('-'), nd = today ? new Date() : nextDate()
  return (nd.getFullYear() - +sd[0]) * 12 + (nd.getMonth() + 1 - +sd[1])
}

export default function Hero() {
  const c = useCountdown()
  const mn = monthNumber(c.today)
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <h1>Shillong<br />Diaries</h1>
          <p className="sub">our October trip, and every 15th of the month</p>
          <p className="next-label" style={{ marginTop: -14 }}>18 to 24 October, with your birthday on the 20th</p>
          <p className="next-label" id="nextLabel">{c.today ? `Happy monthly anniversary, ${CFG.her}` : 'Next monthly anniversary in'}</p>
          {c.today ? (
            <p className="today" style={{ display: 'block' }}>Today is our day!</p>
          ) : (
            <div className="count">
              <div><b>{c.d}</b><span>days</span></div>
              <div><b>{c.h}</b><span>hours</span></div>
              <div><b>{c.m}</b><span>minutes</span></div>
              <div><b>{c.s}</b><span>seconds</span></div>
            </div>
          )}
          {mn > 0 && <p className="next-label">This one is our <b style={{ color: 'var(--gold)' }}>month {mn}</b> together.</p>}
          <div className="buddies"><Buddy which={1} /><Buddy which={2} /><span className="bubble">Counting down to the 15th</span></div>
        </div>
        <div className="arch-wrap" style={{ position: 'relative', justifySelf: 'center', width: 'min(100%,380px)' }}>
          <div className="arch" style={{ width: '100%' }}><img src="img/full/19.jpg" alt="Us at sunrise above the clouds" /></div>
          <div className="heartwrap"><div className="heartpic"><img src="img/sq/14.jpg" alt="Us smiling" /></div></div>
        </div>
      </div>
      <p className="scroll-hint">scroll down, there is a lot more waiting for you</p>
    </header>
  )
}
