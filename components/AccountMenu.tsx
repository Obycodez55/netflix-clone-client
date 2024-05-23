import React, { useCallback } from "react";
import NavProfile from "./NavProfile";
import AddNewProfile from "./AddNewProfile";
import { ProfileA } from "..";
import { useRouter } from "next/router";
import axios from "axios";


interface AccountMenuProps{
    visible? : boolean
    profiles: ProfileA[]
}

const AccountMenu: React.FC<AccountMenuProps> = ({
    visible,
    profiles
})=>{

    const {push} = useRouter();
    const logout = useCallback(async()=>{
        try {
        await axios.delete(`api/deleteToken`);
        await axios.delete(`api/deleteProfile`);
        push("/auth");
    } catch (error:unknown) {
        console.log(error);
  }}, [push])

    if(!visible) return null;
    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col flex border-2 border-gray-800">
            <div className="flex flex-col gap-3">
                {profiles.map((profile, index)=>{
                    return <NavProfile key={index} id={profile.id} profilePic={profile.profilePic} name={profile.name}/>
                })}

                {profiles?.length <4 && <AddNewProfile small/>}

                
                <hr className="bg-gray-600 border-0 h-px my-4"/>
                <div onClick={logout} className="px-3 text-center text-white text-sm hover:underline">
                    Sign out of Netflix
                </div>
            </div>

        </div>
    )
}

export default AccountMenu;