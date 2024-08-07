import React, { useCallback } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { Movie, ProfileA } from "..";

type FavoriteButtonProps = {
  movie: Movie;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie }) => {
  const profileContext = useProfile()!;
  const profile = profileContext.profile as ProfileA;
  const updateProfile = profileContext.updateProfile;
  
  const favourites = profile?.favourites;
  const favouriteIds = profile?.favouriteIds;
  const isFavourite = favouriteIds?.includes(movie?.id);

  const toggleFavourite = useCallback(async () => {
    if (isFavourite) {
      // Remove movie from favorite and favoriteId of profile
      const updatedFavourites = favourites?.filter((fav) => fav.movieId !== movie.id);
      const updatedFavouriteIds = favouriteIds?.filter((id) => id !== movie.id);
      updateProfile({ ...profile, favourites: updatedFavourites, favouriteIds: updatedFavouriteIds });
      axios.delete("api/favourites", { data: { movieId:movie.id } });
    } else {
      // Add movie to favorite and favoriteId of profile
      const updatedFavourites = [...(favourites || []), { movieId: movie.id, movie }];
      const updatedFavouriteIds = [...(favouriteIds || []), movie.id];
      updateProfile({ ...profile, favourites: updatedFavourites, favouriteIds: updatedFavouriteIds });
      await axios.post("api/favourites", { movieId: movie.id });
      updateProfile();
    }
  }, [isFavourite, updateProfile, favourites, favouriteIds, profile, movie]);

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
