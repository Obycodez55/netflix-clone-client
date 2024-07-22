import React from "react";

import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
import { Movie } from "..";
import { shuffleArray } from "@/pages";

interface MovieListProps {
  key: string;
  data: Movie[];
  title: string;
  ordered?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({key, data, title, ordered }) => {
  if (isEmpty(data)) return null;
  // console.log(data);
  // if (key === "favourites") console.log(data);
  const movies = ordered ? data : shuffleArray<Movie>(data);
  // if (key === "favourites") console.log(movies);
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div className="text-white text-md md:text-xl lg:2xl font-semibold mb-4">
        <p className="">{title}</p>
        <div className="grid grid-cols-4 gap-2">
          {movies.slice(0, 4).map((movie) => (
            <MovieCard key={movie?.id} movie={movie}/>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default MovieList;
