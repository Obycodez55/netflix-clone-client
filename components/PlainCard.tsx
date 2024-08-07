/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import { Movie } from "..";
import useInfoModal from "@/hooks/useInfoModal";

interface SearchCardProps {
  movie: Movie;
}

const PlainCard: React.FC<SearchCardProps> = ({
  movie
}) => {
  const { openModal } = useInfoModal();
  return (
    <div className=" bg-zinc-900 col-span relative h-[12vw]">
      <img
        onClick={() => openModal(movie)}
        className="
            cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounded-md
            w-full
            h-[12vw]
        "
        src={movie.thumbnailUrl}
        alt={movie.title}
      />
    </div>
  );
};

export default PlainCard;
