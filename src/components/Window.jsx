import { useRef, useState } from 'react'
import { motion, useDragControls, useReducedMotion } from 'framer-motion'

const MotionDiv = motion.div
import { useLocale } from '../i18n/useLocale'

export default function Window({
  meta,
  z,
  spawn,
  focused,
  isMobile,
  constraintsRef,
  onClose,
  onFocus,
  children,
}) {
  const controls = useDragControls()
  const reduced = useReducedMotion()
  const { t } = useLocale()
  const bodyRef = useRef(null)
  const title = t(meta.titleKey)

  // Spawn position: app hint + small cascade offset, clamped to the viewport.
  const [pos] = useState(() => {
    const offset = (spawn % 4) * 22
    return {
      x: Math.max(8, Math.min(meta.x + offset, window.innerWidth - meta.w - 20)),
      y: Math.max(8, Math.min(meta.y + offset, window.innerHeight * 0.35)),
    }
  })

  if (isMobile) {
    return (
      <MotionDiv
        initial={reduced ? { opacity: 0 } : { y: '100%' }}
        animate={reduced ? { opacity: 1 } : { y: 0 }}
        exit={reduced ? { opacity: 0 } : { y: '100%' }}
        transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
        style={{ zIndex: z }}
        className="window-frame absolute inset-0 flex flex-col bg-crt-raised"
      >
        <div className="flex items-center gap-2 border-b border-chrome-edge bg-chrome px-3 py-2">
          <span className="text-phosphor-bright" aria-hidden="true">
            {meta.glyph}
          </span>
          <h2 className="flex-1 text-sm font-bold tracking-widest uppercase">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('window.close')}
            className="border border-chrome-edge px-2.5 py-0.5 text-sm text-phosphor-dim hover:text-alert"
          >
            ×
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
      </MotionDiv>
    )
  }

  return (
    <MotionDiv
      drag
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={constraintsRef}
      onPointerDownCapture={onFocus}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      transition={{ type: 'tween', duration: 0.18, ease: 'easeOut' }}
      style={{ zIndex: z, left: pos.x, top: pos.y, width: meta.w }}
      className={`window-frame absolute flex max-h-[78%] max-w-[calc(100vw-24px)] flex-col bg-crt-raised ${
        focused ? '' : 'opacity-90'
      }`}
    >
      <div
        onPointerDown={(e) => controls.start(e)}
        style={{ touchAction: 'none' }}
        className={`flex cursor-grab select-none items-center gap-2 border-b border-chrome-edge px-3 py-1.5 active:cursor-grabbing ${
          focused ? 'titlebar-focused' : 'bg-chrome'
        }`}
      >
        <span className={focused ? 'text-phosphor-bright glow' : 'text-phosphor-faint'} aria-hidden="true">
          {meta.glyph}
        </span>
        <h2
          className={`flex-1 text-xs font-bold tracking-widest uppercase ${
            focused ? 'text-phosphor-bright' : 'text-phosphor-dim'
          }`}
        >
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={t('window.close')}
          className="border border-chrome-edge px-2 text-sm leading-5 text-phosphor-dim hover:border-alert hover:text-alert"
        >
          ×
        </button>
      </div>
      <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto" style={{ height: meta.id === 'terminal' ? 420 : 'auto' }}>
        {meta.id === 'terminal' ? (
          children
        ) : (
          <div className="p-4">{children}</div>
        )}
      </div>
    </MotionDiv>
  )
}
