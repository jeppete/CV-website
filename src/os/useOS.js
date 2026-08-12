import { useContext } from 'react'
import { OSContext } from './osContext'

export function useOS() {
  return useContext(OSContext)
}
