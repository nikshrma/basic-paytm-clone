import { Link } from "react-router-dom";

export function BottomLine({label , toLink , toText }){
return <div className="flex justify-center text-wrap text-slate-400 text-xs pt-1">
    <div className=" text-nowrap">
    {`${label} `}
    <Link className=" underline" to={toLink} >{toText}</Link>
    </div>
</div>
}