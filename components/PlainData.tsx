import React from "react";
import { isEmpty } from "lodash";
import { Movie } from "..";
import PlainCard from "./PlainCard";

type Props = {
    data: Movie[];
    emptyText?: string;
};

const PlainData = ({ data, emptyText="No results found" }: Props) => {
    if (isEmpty(data)) return (
        <div className="text-white text-md md:text-xl lg:2xl font-semibold flex items-center justify-center mt-5">
            <p className="">{emptyText}</p>
        </div>
    );
  return (
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-5">
          {data.map((movie) => (
            <div key={movie?.id}>
            <PlainCard movie={movie}/>
            </div>
          ))}
        </div>
  );
};

export default PlainData;
