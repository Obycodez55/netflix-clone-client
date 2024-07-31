import React from "react";
import { isEmpty } from "lodash";
import { Movie } from "..";
import SearchCard from "./SearchCard";

type Props = {
    data: Movie[];
};

const SearchData = ({ data }: Props) => {
    if (isEmpty(data)) return (
        <div className="text-white text-md md:text-xl lg:2xl font-semibold flex items-center justify-center mt-5">
            <p className="">No results found</p>
        </div>
    );
  return (
      <div className="grid grid-cols-4 gap-2 mt-5">
          {data.map((movie) => (
            <div key={movie?.id}>
            <SearchCard movie={movie}/>
            </div>
          ))}
        </div>
  );
};

export default SearchData;
