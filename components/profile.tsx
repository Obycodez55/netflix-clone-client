import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface ProfileProps{
    key?: number,
    id: string,
    name: string,
    color: string,
}


const Profile: React.FC<ProfileProps> = ({
    id,
   name,
   color
}
    )=>{
        const router = useRouter();
        const setProfile = useCallback(async()=>{
            try {
                await axios.post(`api/setProfile`, {
                   id
                });
                
                router.push("/");
            } catch (error:unknown) {
                console.log(error);
            }
        }, [id, router])

    const img = `/images/profiles/${color}.png`
    return(
        <div onClick={setProfile}>

        <div className="group flex-row w-44 mx-auto">

            <div 
            className="
            w-36
            h-36
            md:w-44
            md:h-44
            rounded-md
            flex
            items-center
            justify-center
            border-2
            border-transparent
            group-hover:cursor-pointer
            group-hover:border-white
            overflow-hidden
            ">
                <img src={img} alt="Profile" />
            </div>

            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
        {name}
            </div>

        </div>

            </div>
        
    )
}

export default Profile;