import { useState } from "react";
import { BottomLine } from "../components/BottomLine";
import { InputBox } from "../components/InputBox";
import { MainButton } from "../components/MainButton";
import { PageTitle } from "../components/PageTitle";
import { SubHeading } from "../components/SubHeading";
import axios from "axios"
import { useNavigate } from "react-router-dom";
export function Signup(){
const navigate = useNavigate();
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

 return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
    <PageTitle label={"Sign up"}></PageTitle>
    <SubHeading label={"Enter your information to create a new account"}></SubHeading>
    <InputBox title={"First Name"} type={"text"} placeholder={"John"} onclick={(e)=>{
        setFirstName(e.target.value);
    }} ></InputBox>
    <InputBox title={"Last Name"} type={"text"} placeholder={"Doe"} onclick={(e)=>{
        setLastName(e.target.value);
    }}></InputBox>
    <InputBox title={"username"} type={"text"} placeholder={"example@example.com"} onclick={(e)=>{
        setUsername(e.target.value);
    }}></InputBox>
    <InputBox title={"Password"} type={"password"} placeholder={""}onclick={(e)=>{
        setPassword(e.target.value);
    }} ></InputBox>
    <MainButton label={"Sign up"} clickHandler={async()=>{
       try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        firstName,
        lastName,
        password
      });

      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

      navigate("/dashboard");  
    } catch (error) {
      console.log("Signup failed", error);
    }}} ></MainButton>
    <BottomLine label={"Already have an account?"} toLink={"/signin"} toText={"Sign in"} ></BottomLine>
    </div>
    </div>
    </div>
}