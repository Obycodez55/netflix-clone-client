// components/MovieSlider.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/virtual";
import "swiper/css/navigation";
import "swiper/css/keyboard";
import "swiper/css/mousewheel";
import { Movie } from '..';
import { Navigation, Virtual, Keyboard, Mousewheel } from 'swiper/modules';
import MovieCard from './MovieSlide';



const MovieSlider = ({movies}: {movies: Movie[]}) => {
  return (
    <div className='px-10'>
       <Swiper
    modules={[Virtual, Keyboard, Mousewheel, Navigation]}
          spaceBetween={10}
          slidesPerView={4}
          keyboard={{ enabled: true }}
          mousewheel={{ enabled: true }}
          className='!overflow-visible !z-0 !relative'
    >
      {movies?.map((movie, index) => (
        <SwiperSlide key={movie.id} virtualIndex={index} className=''>
          <MovieCard key={movie?.id} movie={movie}/>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
   
  );
};

export default MovieSlider;
