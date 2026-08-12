import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import TopBar from './TopBar'
import Dock from './Dock'
import Window from './Window'
import { useOS } from '../os/useOS'
import { getAppMeta } from '../os/appMeta'
import { windowRegistry } from '../os/windowRegistry'
import { useIsMobile } from './useIsMobile'

export default function Shell() {
  const { windows, focusedId, openWindow, closeWindow, focusWindow } = useOS()
  const isMobile = useIsMobile()
  const desktopRef = useRef(null)
  const openedRef = useRef(false)

  useEffect(() => {
    if (openedRef.current) return
    openedRef.current = true
    openWindow('terminal')
    if (!window.matchMedia('(max-width: 767px)').matches) openWindow('about')
  }, [openWindow])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && focusedId) closeWindow(focusedId)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focusedId, closeWindow])

  return (
    <div className="flex h-dvh flex-col">
      <TopBar />
      <div ref={desktopRef} className="relative min-h-0 flex-1 overflow-hidden">
        <div className="wallpaper" aria-hidden="true" />
        <AnimatePresence>
          {windows.map((w) => {
            const meta = getAppMeta(w.id)
            const AppBody = windowRegistry[w.id]
            if (!meta || !AppBody) return null
            return (
              <Window
                key={w.id}
                meta={meta}
                z={w.z}
                spawn={w.spawn}
                focused={focusedId === w.id}
                isMobile={isMobile}
                constraintsRef={desktopRef}
                onClose={() => closeWindow(w.id)}
                onFocus={() => focusWindow(w.id)}
              >
                <AppBody />
              </Window>
            )
          })}
        </AnimatePresence>
      </div>
      <Dock />
    </div>
  )
}
