import React from 'react'
import { useProfile } from "@/contexts/ProfileContext";
import { AiOutlinePlus } from 'react-icons/ai'

type FavoriteButtonProps = {
    movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({movieId}) => {
  const {profile, updateProfile} = useProfile();
  return (
    <div className="
        cursor-pointer 
        group/item 
        w-6 h-6
        lg:w-10
        lg:h-10
        border-white
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-neutral-300
    ">
        <AiOutlinePlus size={25} className="text-white"/>
    </div>
  )
}

export default FavoriteButton