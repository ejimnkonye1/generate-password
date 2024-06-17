import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Generate from './generate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className=''>
    
    <Generate />
    </div>
     
    </>
  )
}

export default App
