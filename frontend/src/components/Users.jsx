import { memo ,useEffect, useState } from "react"
import { MainButton } from "./MainButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
     const [users, setUsers] = useState([]);
     const [filter,setFilter] = useState("");
     useEffect(()=>{
        let timeout = setTimeout(()=>{
            axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
            .then(response=>{
                setUsers(response.data.users);
            })
        } ,300)
        return()=> clearTimeout(timeout);
     },[filter])
  return <>
   <div className="font-bold mt-6 text-lg ">
    Users
   </div>
   <div className="my-2">
    <input onChange={(e)=>{
        setFilter(e.target.value);
    }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded-sm border-slate-200 focus:outline-none"  />
   </div>
   <div>
    {users.map(user=><User key={user._id} user={user}></User>)}
   </div>
  </>
}

const User = memo(function User({user}){
    const navigate = useNavigate();
    return <div className="flex justify-between border border-slate-200 rounded w-full">
        <div className="flex">
        <div className="rounded-full h-11 w-11 bg-slate-300 flex items-center justify-center mt-1 ml-1 mr-2 text-xl">
         {user.firstName[0]}
        </div>
        <div className="flex justify-center items-center h-full">
            {`${user.firstName} ${user.lastName}`}
        </div>
        </div>
        <div className="flex justify-center items-center h-full">
            <MainButton clickHandler={()=>{
                console.log("CLickingggg");
                navigate("/send" , {
                    state:{
                        user
                    }
                })
            }} label={"Send Money"}></MainButton>
        </div>
    </div>
})