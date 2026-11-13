import { SECRET_TEXT } from '../data/content.js'

export default function SecretModal({ open, onClose }) {
  return (
    <div id="secret" className={open ? 'on' : ''} role="dialog" aria-label="Secret letter">
      <div className="paper">
        <p style={{ fontFamily: 'var(--f-script)', fontSize: 44, color: 'var(--rose-d)', lineHeight: 1.1, minHeight: 0 }}>You found all five!</p>
        <p>{open ? SECRET_TEXT : ''}</p>
        <p><button className="btn" onClick={onClose}>Close</button></p>
      </div>
    </div>
  )
}
