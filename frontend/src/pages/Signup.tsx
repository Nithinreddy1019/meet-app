import { useState } from "react"
import Heading from "../ui/Heading"
import InputBox from "../ui/InputBox"
import SubmitButton from "../ui/SubmitButton"
import logo from '../assets/logo.svg'
import { Link } from "react-router-dom"
import Animate from "../components/Animate"

const Signup = () => {

    const [passwordIsVisible, setPasswordIsVisible] = useState(false)

  return (
    <Animate >
        <div className="h-screen flex justify-center p-2">
        <div className="flex items-center">
            <div className="flex flex-col items-center justify-center w-[360px]">

                <Link to={"/"}>
                    <img src={logo} className="w-24 h-24"/>
                </Link>

                <Heading heading="Come join us" subheading="Already have an account?" toLink="/signin" toLabel="Login"/>

                <InputBox label={"Email"} inputtype={'email'}/>

                <InputBox label={'Username'} inputtype={'username'}/>

                
                <div className="flex flex-col w-full px-2 pt-3 text-textlightb">
                    
                    <input className={`border rounded-xl h-10 px-2 pl-8 bg-gray-100 focus:outline-purple-200 pr-8 `} type={passwordIsVisible? "text" :"password"} placeholder={'Password'}/>

                    <div className="absolute">
                        <i className="fi fi-rr-key text-textlighta absolute top-2.5 left-2.5"></i>
                    </div>

                    <div className="relative w-fit left-80 -top-8">
                        <button className={` ${passwordIsVisible ? 'hidden' : ''} `} onClick={() => {
                            setPasswordIsVisible(!passwordIsVisible)
                        }}> 
                            <i className="fi fi-rr-eye relative right-0"></i>
                        </button>
                        <button className={` ${passwordIsVisible ? '' : 'hidden'} `} onClick={() => {
                            setPasswordIsVisible(!passwordIsVisible)
                        }}> 
                            <i className="fi fi-rr-eye-crossed relative right-0"></i>
                        </button>
                    </div>

                </div>

                <SubmitButton label={"Signup"} />

                <div className="w-full border-b mt-4 px-8"></div>
                

            </div>
        </div>
        </div>
    </Animate>
  )
}

export default Signup
