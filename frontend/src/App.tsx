import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'
import { RecoilRoot } from 'recoil'


const Home = lazy(() => import('./pages/Home'))
const Signup = lazy(() => import ('./pages/Signup'))
const Signin = lazy(() => import ('./pages/Signin'))
const Write = lazy(() => import ('./pages/Write'))



function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>     
            <Route path={'/'} element={<Home />}/>
            <Route path={'/signup'} element={<Signup />}/>
            <Route path={'/signin'} element={<Signin />} />
            <Route path={'/write'} element={<Write />}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
