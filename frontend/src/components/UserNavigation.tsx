import { Link } from "react-router-dom"
import Animate from "./Animate"
import { useNavigate } from "react-router-dom"

const UserNavigation = () => {
  const navigate = useNavigate()

    return (
        <Animate transition={{duration: 0.2}}>

            <div className="bg-white absolute right-0 mt-1 rounded-lg text-textlightb border border-gray-100 w-40 overflow-hidden duration-200 z-50">
                
                <Link to={"/write"} className="flex gap-2 md:hidden pl-6 py-3 hover:bg-lighta transition-all duration-200">
                    <i className="fi fi-rr-edit pt-1 text-sm"></i>
                    <p>write</p>
                </Link>

                <Link to={`/user/:id`} className="flex gap-2 pl-6 py-3 hover:bg-lighta transition-all duration-200">
                    <i className="fi fi-rr-user"></i>
                    <p>Profile</p>
                </Link>

                <Link to={`/user/:id`} className="flex gap-2 pl-6 py-3 hover:bg-lighta transition-all duration-200">
                    <i className="fi fi-rr-chart-histogram"></i>
                    <p>Dashboard</p>
                </Link>

                <span className="absolute border-t border-gray-200 w-[100%]"></span>

                <button className="text-left p-2 pl-6 py-2 hover:bg-lighta w-full hover:text-black" onClick={() => {
                    localStorage.removeItem("token");
                    
                    navigate("/")
                }}>
                    <h1 className="font-semibold pl-0.5">Sign out</h1>
                    <p className="text-sm italic">@username</p>
                </button>

            </div>

        </Animate>
    )
}

export default UserNavigation
