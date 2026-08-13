import { useContext } from 'react'
import { FlagsContext } from './flagsContext'

export function useFlags() {
  return useContext(FlagsContext)
}
