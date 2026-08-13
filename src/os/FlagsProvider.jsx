import { useCallback, useEffect, useMemo, useState } from 'react'
import { FlagsContext } from './flagsContext'
import { TOTAL_FLAGS, loadCaptured, saveCaptured, checkFlag, plantStorageFlag } from './flagState'

export default function FlagsProvider({ children }) {
  const [captured, setCaptured] = useState(loadCaptured)

  useEffect(() => {
    plantStorageFlag()
  }, [])

  const capture = useCallback(
    (input) => {
      const res = checkFlag(input, captured)
      if (res.status === 'ok') {
        const next = [...captured, res.id]
        setCaptured(next)
        saveCaptured(next)
        return { ...res, count: next.length, allCaptured: next.length === TOTAL_FLAGS }
      }
      return { ...res, count: captured.length, allCaptured: captured.length === TOTAL_FLAGS }
    },
    [captured],
  )

  const reset = useCallback(() => {
    setCaptured([])
    saveCaptured([])
  }, [])

  const value = useMemo(
    () => ({
      captured,
      total: TOTAL_FLAGS,
      allCaptured: captured.length === TOTAL_FLAGS,
      capture,
      reset,
    }),
    [captured, capture, reset],
  )

  return <FlagsContext.Provider value={value}>{children}</FlagsContext.Provider>
}
