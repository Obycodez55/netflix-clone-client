import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';
import React, { useState, useEffect, useCallback } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import PlayButton from './PlayButton';
import FavoriteButton from './FavoriteButton';
import { Movie } from '..';
import { Dialog } from "@headlessui/react";
import { useRef } from "react";

interface InfoModalProps {
    visible: boolean;
    onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({visible, onClose}) => {
    const [isVisible, setIsVisible] = useState(!!visible);
    let overlayRef = useRef(null);

    let {movie} = useInfoModal();movie = movie as Movie;
    // const {movie} = useMovie(movieId);

    useEffect(() => {
         setIsVisible(!!visible)
    }, [visible])

   const handleClose = useCallback(()=>{
        setIsVisible(false);
        setTimeout(() => {
        onClose();
        }, 300)
   }, [onClose])

   if (!isVisible) return null;
  return (
    // <div
    // className="
    //   z-50
    //   transition
    //   duration-300
    //   bg-black
    //   bg-opacity-80
    //   flex
    //   justify-center
    //   items-center
    //   overflow-x-hidden
    //   overflow-y-auto
    //   fixed
    //   inset-0  
    // ">
    <Dialog
    open={true}
    onClose={handleClose}
    initialFocus={overlayRef}
    className="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div ref={overlayRef} className="fixed inset-0 bg-gray-900/90" />
    <div className="relative flex items-center justify-center w-auto
      mx-auto
      max-w-3xl
      rounded-md
      overflow-hidden">
    {/* <div 
    className="
      relative
      
    "> */}
      <div className={`
        ${isVisible? "scale-100" : "scale-0"}
        transform
        duration-100
        relative
        flex-auto
        bg-zinc-900
        drop-shadow-red
        `}>
          <div className="relative h-96">
          <video 
          className="
            w-full
            h-full
            brightness-[60%]
            object-cover
          "
          autoPlay
          muted
          loop
          src={movie?.trailerUrl} 
          poster={movie?.thumbnailUrl}>
          </video>
        <div onClick={handleClose} className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
          <AiOutlineClose  className="text-white" size={20}/>
        </div>
        <div className="absolute bottom-[10%] left-10">
          <p className="text-white text-3xl md:text-4xl lg:text-5xl h-full font-bold mb-8">
            {movie?.title}
          </p>
          <div className="flex flex-row gap-4 items-center">
            <PlayButton movieId={movie?.id} />
            <FavoriteButton movieId={movie?.id}/>
          </div>
        </div>
      </div>
      <div className="px-12 py-8">
          <p className="text-green-400 font-semibold text-lg">
            New
          </p>
          <p className="text-white text-lg">
            {movie?.duration}
          </p>
          <p className="text-white text-lg font-semibold">
          {movie.genre.map(genre=> (
                <span key={genre} className="mr-1">{genre}</span>
              ))}
          </p>
          <p className="text-white text-lg">
            {movie?.description}
          </p>
      </div>
      </div>
      {/* </div> */}
    </div>
  </Dialog>
   
      // </div>
  )
}

export default InfoModal