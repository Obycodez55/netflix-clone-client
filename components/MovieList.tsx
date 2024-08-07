/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

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
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    setMovies(ordered ? data : shuffleArray<Movie>(data));
}, [data]);
  if (isEmpty(data)) return null;
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div className="text-white text-md md:text-xl lg:2xl font-semibold mb-4">
        <p className="">{title}</p>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {movies?.slice(0, 4).map((movie) => (
            <MovieCard key={movie?.id} movie={movie}/>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default MovieList;
