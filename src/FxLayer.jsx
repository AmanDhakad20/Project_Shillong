import { useEffect, useMemo, useRef } from 'react'
import { FxContext } from './context.js'
import { createEngine } from './fx/engine.js'

// Owns the full-screen canvas and shares burst/rain with the rest of the app.
export default function FxLayer({ children }) {
  const canvas = useRef(null)
  const engine = useRef(null)
  const api = useMemo(() => ({
    burst: (...a) => engine.current && engine.current.burst(...a),
    rain: (...a) => engine.current && engine.current.rain(...a),
    size: () => (engine.current ? engine.current.size() : { W: innerWidth, H: innerHeight }),
  }), [])
  useEffect(() => { engine.current = createEngine(canvas.current); return () => engine.current.destroy() }, [])
  return (
    <FxContext.Provider value={api}>
      <canvas id="fx" ref={canvas} />
      {children}
    </FxContext.Provider>
  )
}
