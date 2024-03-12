import { useState } from 'react'
import './App.css'
function App() {
  const [darkMode, setDarkMode] = useState(false)

  const darkModeHandler = () => {
    setDarkMode(c => !c)
  }

  return (
    <div className={`${darkMode ? "dark" : null}`}>
      
    </div>
  )
}

export default App
