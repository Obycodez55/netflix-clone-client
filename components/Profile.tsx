import { useProfile } from "@/contexts/ProfileContext";
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
        const updateProfile = useProfile()?.updateProfile;
        const setProfile = useCallback(async()=>{
            try {
                await axios.post(`api/setProfile`, {
                   id
                });
                updateProfile!();
                router.push("/");
            } catch (error:unknown) {
                console.log(error);
            }
        }, [id, router])

    const img = `/images/profiles/${color}.png`
    return(
        <div onClick={setProfile}>

        <div className="group flex-row w-24 md:w-36 mx-auto">

            <div 
            className="
            h-24
            w-24
            md:w-36
            md:h-36
            rounded-md
            flex
            items-center
            justify-center
            border-2
            border-transparent
            group-hover:cursor-pointer
            group-hover:border-gray-300
            overflow-hidden
            ">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="Profile" />
            </div>

            <div className="mt-2 text-gray-500 text-xl text-center group-hover:text-gray-300">
        {name}
            </div>

        </div>

            </div>
        
    )
}

export default Profile;