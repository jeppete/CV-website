import { useState } from 'react'
import LocaleProvider from './i18n/LocaleProvider'
import ThemeProvider from './theme/ThemeProvider'
import OSProvider from './os/OSProvider'
import Shell from './components/Shell'
import BootScreen from './components/BootScreen'

function alreadyBooted() {
  try {
    return sessionStorage.getItem('jeppeos.booted') === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [booted, setBooted] = useState(alreadyBooted)

  const finishBoot = () => {
    try {
      sessionStorage.setItem('jeppeos.booted', '1')
    } catch {
      /* storage unavailable */
    }
    setBooted(true)
  }

  return (
    <LocaleProvider>
      <ThemeProvider>
        <OSProvider>
          {booted ? <Shell /> : <BootScreen onDone={finishBoot} />}
          <div className="crt-overlay" aria-hidden="true" />
        </OSProvider>
      </ThemeProvider>
    </LocaleProvider>
  )
}
