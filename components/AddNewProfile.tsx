/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import { FaCirclePlus } from "react-icons/fa6";

interface ProfileProps{
    small? : boolean
}


const AddNewProfile: React.FC<ProfileProps> = ({small})=>{
    if (small) return (
        <a href="/profiles/create">
        <div onClick={() =>{}} className="px-3 group/item flex flow-row gap-3 items-center w-full">
        <FaCirclePlus className="text-neutral-400 w-7 h-7"/>
        <p className="text-white text-sm group-hover/item:underline">
            Add new
        </p>
</div>
</a>
    )

return(
        <a href="/profiles/create">

<div className="group flex-row w-44 mx-auto">

    <div 
    className="
    w-44
    h-44
    rounded-md
    flex
    items-center
    justify-center
    group-hover:cursor-pointer
    overflow-hidden
    ">
        <FaCirclePlus className="text-neutral-400 hover:scale-110 w-20 h-20"/>
    </div>

    <div className="mt-4 text-gray-400 text-xl text-center group-hover:text-white">
Add New 
    </div>

</div>

    </a>
    )
}

export default AddNewProfile;