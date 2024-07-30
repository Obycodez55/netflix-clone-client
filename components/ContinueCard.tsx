/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Movie } from "..";

interface MovieCardProps {
  movie: Movie;
  timestamp: number;
}

const ContinueCard: React.FC<MovieCardProps> = ({
  movie,
  timestamp
}) => {
  const router = useRouter();
  const [width, setWidth] = useState(0);
  useEffect(() => {
        setWidth((timestamp / movie.videoDuration) * 100);
  }, [timestamp, movie.videoDuration]);
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        onClick={() => router.push(`/watch/${movie.id}`)}
        className=" cursor-pointer object-cover transition duration shadow-xl rounded-md rounded-b-none w-full h-[12vw]"
        src={movie.thumbnailUrl}
        alt={movie.title}
      />
      
        <div className="w-full bg-black md:h-[0.3rem] h-[0.2rem]">
          <div
            style={{
              width: `${width}%`
            }}
            className={`bg-red-700 h-full`} // Modified color to bg-red-500
          ></div>
        </div>
    </div>
  );
};

export default ContinueCard;
