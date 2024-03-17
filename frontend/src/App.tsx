import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Write from './pages/Write'



function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Home />}/>
      <Route path={'/signup'} element={<Signup />}/>
      <Route path={'/signin'} element={<Signin />} />
      <Route path={'/write'} element={<Write />}/>
    </Routes>
  )
}

export default App
