import NavBar from "../components/NavBar"
import Heading from "../components/ui/Heading"
import InputBox from "../components/ui/InputBox"

const Signup = () => {
  return (
    <div className='h-screen dark:bg-back-dark'>
      <NavBar type={"signup"}/>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-col justify-center w-80 border p-2">
            <Heading title={"Create an account"} subtitle={"Already have an account?"} toLink={"/signin"} toTitle={"Login"}/>
            <div className="pt-8">
                <InputBox label={"Email"} placeholder={"Johndoe@gmail.com"} type={"text"} onChange={() => {}}/>
                <InputBox label={"Name"} placeholder={"John doe"} type={"text"} onChange={() => {}}/>
                <InputBox label={"Password"} placeholder={"Your password"} type={"password"} onChange={() => {}}/>    
            </div>
            <div className="w-full flex justify-center py-2">
                <button className="font-semibold border py-2 px-2 w-full rounded-lg bg-back-text-low-light hover:bg-back-text-light hover:text-back-low-light transition-all duration-300">Singup</button>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default Signup
