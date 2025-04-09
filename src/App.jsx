import { useState } from 'react'
import profpicture from '/med.jpg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <img src={profpicture} className="picture" alt="Jeppe" />
      </div>
      <h1>404</h1>
      <div className="card">
      </div>
      <p className="read-the-docs">
        brb
      </p>
    </>
  )
}

export default App
