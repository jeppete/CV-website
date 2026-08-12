import { useMemo, useReducer } from 'react'
import { OSContext } from './osContext'

// Window-manager state: which windows are open, stacking order, focus.
const initialState = { windows: [], focusedId: null, nextZ: 10 }

function reducer(state, action) {
  switch (action.type) {
    case 'open': {
      const existing = state.windows.find((w) => w.id === action.id)
      if (existing) {
        return {
          ...state,
          focusedId: action.id,
          nextZ: state.nextZ + 1,
          windows: state.windows.map((w) =>
            w.id === action.id ? { ...w, z: state.nextZ } : w,
          ),
        }
      }
      return {
        ...state,
        focusedId: action.id,
        nextZ: state.nextZ + 1,
        windows: [...state.windows, { id: action.id, z: state.nextZ, spawn: state.windows.length }],
      }
    }
    case 'close': {
      const windows = state.windows.filter((w) => w.id !== action.id)
      const top = windows.reduce((a, b) => (!a || b.z > a.z ? b : a), null)
      return { ...state, windows, focusedId: top ? top.id : null }
    }
    case 'focus': {
      if (state.focusedId === action.id) return state
      if (!state.windows.some((w) => w.id === action.id)) return state
      return {
        ...state,
        focusedId: action.id,
        nextZ: state.nextZ + 1,
        windows: state.windows.map((w) => (w.id === action.id ? { ...w, z: state.nextZ } : w)),
      }
    }
    default:
      return state
  }
}

export default function OSProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo(
    () => ({
      windows: state.windows,
      focusedId: state.focusedId,
      openWindow: (id) => dispatch({ type: 'open', id }),
      closeWindow: (id) => dispatch({ type: 'close', id }),
      focusWindow: (id) => dispatch({ type: 'focus', id }),
    }),
    [state],
  )

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>
}
