import React from 'react'
import type { ContinueWatching } from '..';
import { isEmpty } from 'lodash';
import MovieCard from './MovieCard';

type ContinueWatchingProps = {
    data: ContinueWatching[]
}

const ContinueWatching: React.FC<ContinueWatchingProps> = ({data}) => {
    if (isEmpty(data)) return null;
    return (
      <div className="px-4 md:px-12 mt-4 space-y-8">
        <div className="text-white text-md md:text-xl lg:2xl font-semibold mb-4">
          <p className="">Continue Watching</p>
          <div className="grid grid-cols-4 gap-2">
            {data.slice(0, 4).map((item) => (
              <MovieCard key={item.movie.id} movie={item.movie}/>
            ))}
          </div>
          
        </div>
      </div>
    );
}

export default ContinueWatching