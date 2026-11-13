import { createContext, useContext } from 'react'
export const FxContext = createContext({ burst() {}, rain() {}, size: () => ({ W: 1000, H: 800 }) })
export const useFx = () => useContext(FxContext)
export const PhotoContext = createContext(() => {})
export const usePhoto = () => useContext(PhotoContext)
