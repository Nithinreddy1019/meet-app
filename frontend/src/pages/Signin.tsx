import { useState } from "react"
import Heading from "../ui/Heading"
import InputBox from "../ui/InputBox"
import SubmitButton from "../ui/SubmitButton"
import logo from '../assets/logo.svg'
import { Link } from "react-router-dom"
import Animate from "../components/Animate"
import { SigninWithGoogle } from "../Firebaseconfig"

const Signup = () => {

    const [passwordIsVisible, setPasswordIsVisible] = useState(false)

  return (
    <Animate>
        <div className="h-screen flex justify-center p-2">
        <div className="flex items-center">
            <div className="flex flex-col items-center justify-center w-[360px]">

                <Link to={"/"}>
                    <img src={logo} className="w-24 h-24"/>
                </Link>

                <Heading heading="Welcome back" subheading="Don't have an account?" toLink="/signup" toLabel="Signup"/>

                <InputBox label={"Email"} inputtype={'email'} />

                
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

                <SubmitButton label={"Login"} />

                <div className="w-full border-b mt-4 px-8">
                    <span className="relative top-2.5 left-[136px] bg-white px-2 py-2 text-textlightb text-lg">or</span>
                </div>
                
                <div className="bg-lighta rounded-full px-4 py-2 mt-4 text-textlightb hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                    <button className="flex items-center gap-x-2 " onClick={async () => {
                        try {
                            const res = await SigninWithGoogle();
                            const user = res.user as {accessToken?: string, email:string, displayName: string}
                            console.log(user.displayName);
                            console.log(user.email)
                            console.log(user.accessToken)
                            
                        } catch (error: unknown) {
                            if (error instanceof Error) {
                                const typedError = error as { code?: string }; 
                                if (typedError.code === 'auth/cancelled-popup-request') {
                                    console.log("User cancelled signup");
                                } else {
                                    console.error(error.message);
                                }
                            } else {
                                console.log('An unknown error occurred');
                            }
                        }
                    }}>
                        <i className="fi fi-brands-google pt-1"></i>
                        <p>Signin with Google</p>
                    </button>
                </div>

                

            </div>
        </div>
        </div>
    </Animate>
  )
}

export default Signup
