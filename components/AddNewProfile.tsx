import React from "react";
import { FaCirclePlus } from "react-icons/fa6";

interface ProfileProps{
    
}


const AddNewProfile: React.FC<ProfileProps> = ({})=>{
    return(
        <div onClick={()=> {}}>

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

    </div>
    )
}

export default AddNewProfile;