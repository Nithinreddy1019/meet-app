import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Signin from './pages/Signin'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const darkModeHandler = () => {
    setDarkMode(c => !c)
  }

  return (
    <div className={`${darkMode ? "dark" : null}`}>
      <div className='absolute bottom-[1%] right-0 px-2 py-2 border'>
        <button onClick={darkModeHandler}>
          Dark
        </button>
      </div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signin' element={<Signin />}/>
      </Routes>
    </div>
  )
}

export default App
