import Neofetch from './Neofetch'

export function Prompt() {
  return (
    <>
      <span className="text-signal">jeppe@jeppeos</span>
      <span className="text-phosphor-dim">:~$ </span>
    </>
  )
}

export default function OutputLine({ line }) {
  switch (line.kind) {
    case 'input':
      return (
        <div className="term-line text-phosphor-bright">
          <Prompt />
          {line.text}
        </div>
      )
    case 'err':
      return <div className="term-line text-alert">{line.text}</div>
    case 'ok':
      return <div className="term-line text-signal">{line.text}</div>
    case 'link':
      return (
        <div className="term-line">
          <span className="text-phosphor-dim">→ </span>
          <a href={line.href} target={line.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
            {line.text}
          </a>
        </div>
      )
    case 'neofetch':
      return <Neofetch />
    default:
      return <div className="term-line">{line.text}</div>
  }
}
