import { useEffect, useRef, useState } from 'react'

// Fades and lifts its content in the first time it scrolls into view.
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    if (seen || !ref.current) return
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: .12 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [seen])
  return <Tag ref={ref} className={`rv ${className} ${seen ? 'in' : ''}`} {...rest}>{children}</Tag>
}
