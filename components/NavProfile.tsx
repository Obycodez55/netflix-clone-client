import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface NavProfileProps{
    key: number,
    id: string,
    profilePic: string,
    name: string
}

const NavProfile: React.FC<NavProfileProps> = ({
    profilePic,
    name,
    id
}) =>{
    const router = useRouter();
    const changeProfile = useCallback(async() => {
        try {
            await axios.post(`api/setProfile`, {
               id
            });
            router.reload();
        } catch (error:unknown) {
            console.log(error);
        }
    }, [id, router]);

    return (
        <div onClick={changeProfile} className="px-3 group/item flex flow-row gap-3 items-center w-full">
                    <img src={`/images/profiles/${profilePic}.png` }alt={name}className="w-8 rounded-md"/>
                    <p className="text-white text-sm group-hover/item:underline">
                        {name}
                    </p>
        </div>
    )
}

export default NavProfile;