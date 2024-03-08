import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useState } from 'react';

interface NavBarProps {
    type: string
}

const NavBar = ({type}: NavBarProps) => {
    const [navVisible, setNavvisible] = useState(false);
  return (
    <nav className="fixed flex justify-between items-center border-b-back-text-low-light border-b dark:border-none dark:bg-back-dark py-2 px-2 w-full">
        <div>
            <Link to={"/"}>
                <div className='flex items-center'>
                    <img src={logo} className='w-16'/>
                    <p className='text-2xl font-bold text-back-text-light dark:text-back-text-dark'>Vyala</p>
                </div>
            </Link>
        </div>
        <div className='flex items-center dark:text-back-text-dark'>
            <div className='md:hidden'>
                <button onClick={() => {
                    setNavvisible(c => !c)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
            <div className={` ${navVisible ? "block" : "hidden"} ${ navVisible ? "absolute z-10 top-16 -translate-x-14 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-2 py-2 rounded-xl transition-all duration-300 ease-in-out bg-back-light dark:bg-back-dark dark:shadow-[0px_0px_5px_1px_#f7fafc] flex flex-col gap-2 items-center" : ""} md:flex `}>
                <Link to={"/signup"}>
                    <button className={` bg-green-700 px-2 py-1 rounded-full hover:bg-green-900 text-white ${type === 'signup' || '' ? 'hidden' : 'block'}`}>Singup</button>
                </Link>
                <Link to={"/signin"}>
                    <button className={`hover:text-gray-500 px-2 py-1 rounded-full bg-white ${type === 'signin' || '' ? 'hidden' : 'block'}`}>Singin</button>
                </Link>
            </div>
            
        </div>
    </nav>
  )
}

export default NavBar
