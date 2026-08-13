import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// Looping ASCII fireworks, shown when the 5th CTF flag is captured.
// Rockets rise from the bottom, burst into expanding sparks, and respawn forever.

const ROWS = 12
const COLS = 44
const NUM_ROCKETS = 3
const TICK_MS = 90
const BURST_AGES = 6

const DIRS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2
  return [Math.cos(a), Math.sin(a)]
})

const STATIC_ART = [
  '     .       *          .           *      ',
  "         .       .'.        *   .          ",
  "   *          -= *#* =-      .:*:.     .   ",
  "        .      './|\\.'      ':*:'          ",
  '     .    *      |      .     :      *     ',
]

function spawnRocket() {
  return {
    delay: Math.floor(Math.random() * 14),
    col: 5 + Math.floor(Math.random() * (COLS - 10)),
    burstRow: 1 + Math.floor(Math.random() * 4),
    row: ROWS - 1,
    age: -1, // -1 = rising, 0..BURST_AGES = bursting
  }
}

export default function CtfArt() {
  const reducedMotion = useReducedMotion()
  const [, setTick] = useState(0)
  const [rockets] = useState(() => Array.from({ length: NUM_ROCKETS }, spawnRocket))

  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(() => {
      rockets.forEach((r, i) => {
        if (r.delay > 0) r.delay -= 1
        else if (r.age < 0) {
          r.row -= 1
          if (r.row <= r.burstRow) r.age = 0
        } else if (r.age < BURST_AGES) r.age += 1
        else rockets[i] = spawnRocket()
      })
      setTick((t) => t + 1)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [reducedMotion, rockets])

  if (reducedMotion) {
    return (
      <pre aria-label="fireworks" className="my-2 text-[8px] leading-[1.2] text-phosphor-bright sm:text-[10px]">
        {STATIC_ART.join('\n')}
      </pre>
    )
  }

  const grid = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => null))
  const put = (row, col, ch, cls) => {
    if (row >= 0 && row < ROWS && col >= 0 && col < COLS) grid[row][col] = { ch, cls }
  }

  for (const r of rockets) {
    if (r.delay > 0) continue
    if (r.age < 0) {
      put(r.row, r.col, '|', 'text-phosphor-bright')
      put(r.row + 1, r.col, '.', 'text-phosphor-faint')
    } else if (r.age === 0) {
      put(r.burstRow, r.col, '*', 'text-signal glow')
    } else {
      const sparkCh = r.age <= 2 ? '*' : r.age <= 4 ? "'" : '.'
      const sparkCls = r.age <= 2 ? 'text-signal glow' : r.age <= 4 ? 'text-phosphor' : 'text-phosphor-faint'
      for (const [dx, dy] of DIRS) {
        put(r.burstRow + Math.round(dy * r.age), r.col + Math.round(dx * r.age * 2), sparkCh, sparkCls)
      }
      if (r.age >= 2) put(r.burstRow, r.col, r.age <= 3 ? ':' : '.', 'text-phosphor-faint')
    }
  }

  return (
    <pre aria-label="fireworks" className="my-2 text-[8px] leading-[1.2] sm:text-[10px]">
      {grid.map((row, ri) => (
        <div key={ri}>
          {row.map((cell, ci) =>
            cell ? (
              <span key={ci} className={cell.cls}>
                {cell.ch}
              </span>
            ) : (
              <span key={ci}> </span>
            ),
          )}
        </div>
      ))}
    </pre>
  )
}
