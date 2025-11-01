export function MainButton({label , clickHandler}){
    return <div onClick={clickHandler} className="  bg-gray-800 text-white mt-1.75 text-center cursor-pointer p-1.25 w-full hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        {label}
    </div>
}