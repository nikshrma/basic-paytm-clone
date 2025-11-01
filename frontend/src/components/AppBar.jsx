import { useNavigate } from "react-router-dom";
import { MainButton } from "./MainButton";

export function AppBar(){
    const navigate = useNavigate();
    return <div className="flex justify-between h-14 shadow font-medium">
        <div className="flex flex-col justify-center h-full ml-4">
    PayTM App
        </div><div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
            Hello
        </div>
       <div className="rounded-full h-11 w-11 bg-slate-300 flex items-center justify-center mt-1 mr-2 text-xl">
         U
        </div>
    <div className="mr-1">
        <MainButton label={"Log out"}  clickHandler={() => {
            localStorage.removeItem("token");
            navigate("/signin", { replace: true });
            }}></MainButton>
    </div>
        
        </div>
    </div>
}