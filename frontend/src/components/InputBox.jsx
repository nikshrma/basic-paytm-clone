export function InputBox({title , placeholder , type , onclick}){
  return <div className=" text-[0.8rem]">
    <div className="pt-[5px] pb-[2.5px] font-medium text-left">
    {title}
    </div>
    <input onChange={onclick}type={type} placeholder={placeholder} className="border w-full rounded-sm px-2 py-1 border-slate-200 focus:outline-none"></input>
    </div>
  
}
