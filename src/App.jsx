import { useState } from 'react'
import './App.css'
import LoadingScreen from './component/LoadingScreen'

function App() {
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      {!isLoading && <LoadingScreen onComplete={() => setIsLoading(true)} />}
    </>
  )
}

export default App
