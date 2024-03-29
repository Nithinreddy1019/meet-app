import { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import UserNavigation from './UserNavigation'

const NavBar = () => {

  const [searchVisible, setSearchVisible] = useState(false)
  const [loggedin, setLoggedin] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkForToken = () => {
      const token = localStorage.getItem('token');
      if(token){
        setLoggedin(true)
        toast.success("loggedin")
      } else {
        setLoggedin(false)
      }
    }

    checkForToken();

    const handleStorage = (event: StorageEvent) => {
      if(event.key === 'token'){
        checkForToken()
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => {
      window.addEventListener('storage', handleStorage)
    }

  }, [])


  const handleWriteClick = async () => {
    const token =await localStorage.getItem('token');
    if(token){
      navigate("/write")
    } else {
      navigate("/signin")
    }
  }

  return (
    <div className="flex items-center bg-white sticky z-10 h-[64px] px-[5vw] border-b justify-between">


      <Link to={'/'}>
        
          <img src={logo} className='w-14 h-14'/>
      
      </Link>

      <div className={`absolute top-full px-[5vw] mt-2 w-full right-0 h-[48px] transition-all duration-500 md:flex md:inset-0 md:w-auto md:left-[64px] ${searchVisible ? "" : "hidden"}`}>
        <input className='w-full focus:outline-purple-200 h-[48px] rounded-full px-12 bg-lighta text-textlightb md:w-auto' /> 

        <i className="fi fi-rr-search absolute left-[5vw] pl-5 pt-1 top-1/2 -translate-y-1/2 text-textlightb"></i>     
      </div>

      
      

      <div className='absolute right-[5vw] flex items-center gap-2 md:gap-4 md:right-[5vw]'>

        <button className='flex items-center justify-center bg-lighta text-textlightb rounded-full w-10 h-10 absolute mr-[8px]  right-full hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:hidden ' onClick={() => {
          setSearchVisible(!searchVisible)
        }}>
            <i className="fi fi-rr-search"></i>
        </button>


          <div className=' bg-lighta text-textlightb px-2 py-2 mr-auto rounded-lg hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hidden md:block' onClick={handleWriteClick}>
            <button className='flex items-center gap-2 justify-center' >
              <i className="fi fi-rr-edit pt-1 text-sm"></i>
              <p>write</p>
            </button>
          </div>
        


        { loggedin ? <div>
                        <button className='flex items-center justify-center bg-lighta text-textlightb rounded-full pt-1 w-10 h-10 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
                          <i className="fi fi-rr-bell"></i>
                        </button>
                      </div> : ''} 
        



        {loggedin ? <div >
                      <button className='flex items-center justify-center bg-lighta text-textlightb rounded-full h-10 w-10 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]' onClick={() => {
                        setUserNavPanel(!userNavPanel)
                      }} onBlur={() => {setTimeout(() => {setUserNavPanel(false)}, 200)}}>
                        <i className="fi fi-rr-user"></i>
                      </button>

                      {
                        userNavPanel ? <UserNavigation /> : ''
                      }

                    </div> : '' }
        


        {loggedin ? '' :  <Link to={'/signup'}>
                            <div className={`hidden md:block ${loggedin ? "hidden md:hidden": ""}`}>
                              <button className='hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-gray-700 text-lightb px-2 py-1 rounded-full '>
                                signup
                              </button>
                            </div>
                          </Link> }
        


        {loggedin ? '' :<Link to={'/signin'}>
                          <div className={`${loggedin ? "hidden": ""}`}>
                            <button className=' hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-lighta text-textlightb px-2 py-1 rounded-full'>
                              signin
                            </button>
                          </div>
                        </Link> }
        



      </div>

      <Toaster richColors/>
    </div>
  )
}

export default NavBar
