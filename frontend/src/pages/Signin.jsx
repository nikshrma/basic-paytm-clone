import { useState } from "react";
import { BottomLine } from "../components/BottomLine";
import { InputBox } from "../components/InputBox";
import { MainButton } from "../components/MainButton";
import { PageTitle } from "../components/PageTitle";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin(){
      const [username,setUsername] = useState("")
      const [password,setPassword] = useState("")
      const navigate = useNavigate();
 return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
    <PageTitle label={"Sign in"}></PageTitle>
    <SubHeading label={"Enter your information to login to your account"}></SubHeading>
    <InputBox title={"Email"} type={"text"} placeholder={"example@example.com"} onclick={(e)=>{
        setUsername(e.target.value);
    }} ></InputBox>
    <InputBox title={"Password"} type={"password"} placeholder={""} onclick={(e)=>{
        setPassword(e.target.value);
    }} ></InputBox>
    <MainButton label={"Sign In"} clickHandler={async()=>{
       try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password
      });

      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

      navigate("/dashboard");  
    } catch (error) {
      console.log("Signin failed", error);
    }}} ></MainButton>
    <BottomLine label={"Don't have an account?"} toLink={"/signup"} toText={"Sign up"} ></BottomLine>
    </div>
    </div>
    </div>
}