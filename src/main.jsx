import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'

document.documentElement.classList.add('js')
// Always start at the top, even after a refresh. Browsers otherwise restore the old scroll position.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
createRoot(document.getElementById('root')).render(<App />)
