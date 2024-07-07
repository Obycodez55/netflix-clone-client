import React, { useCallback } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

type FavoriteButtonProps = {
  movieId: string;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { profile, updateProfile } = useProfile()!;
  const isFavourite = profile?.favouriteIds?.includes(movieId);

  const toggleFavourite = useCallback(async () => {
    if (isFavourite) {
      await axios.delete("api/favourites", { data: { movieId } });
    } else {
      await axios.post("api/favourites", { movieId });
    }
    updateProfile();
  }, [updateProfile, isFavourite, movieId]);

  const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleFavourite}
      className="
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
    "
    >
      <Icon size={25} className="text-white" />
    </div>
  );
};

export default FavoriteButton;
