import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyGenerate from './generate'
import Test from './test'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className=''>
    {/* <MyGenerate /> */}
    <Test />
    </div>
     
    </>
  )
}

export default App
