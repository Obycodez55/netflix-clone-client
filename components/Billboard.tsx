import useBillboard from "@/hooks/useBillboard";
import PlayButton from "./PlayButton";
import { useCallback, useState, useEffect } from "react";
import useInfoModal from "@/hooks/useInfoModal";
import FavoriteButton from "./FavoriteButton";
import { Movie } from "..";

const TOP_OFFSET = 300;

const Billboard = ({searchOpen, type}: {searchOpen: boolean, type?: "series" | "movies"}) =>{
    const { movie, refetch } = useBillboard(type);
    const {openModal, isOpen} = useInfoModal();
    const [muted, setMuted] = useState<boolean>(false);

    const handleOPenModal = useCallback(()=>{
        // setMuted(true);
        openModal(movie);
    }, [openModal, movie]);

    useEffect(() => {
        refetch(); // Trigger the API request whenever the type changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    useEffect(() =>{
        if (isOpen){
            return setMuted(true);
        }
        const handleScroll = () =>{
            if(window.scrollY >= TOP_OFFSET){
                setMuted(true);
            }else{
                setMuted(false);
            }
        }
            if (searchOpen){
                setMuted(true);
            } else{
                setMuted(false);
                window.addEventListener("scroll", handleScroll);
            }
            

        return () =>{
            window.removeEventListener("scroll", handleScroll);
        }
    }, [searchOpen, isOpen])

    return (
        <div className="relative h-[56.25vw]">
            <video 
            className="
                w-full
                md:h-[56.25vw]
                h-[70vw]
                object-cover
                brightness-[60%]
            "

            autoPlay
            loop
            muted={muted}
            poster={movie?.thumbnailUrl} 
            src={movie?.trailerUrl}>


            </video>
            <div className="absolute top-[40%] ml-4 md:ml-16">
                <p className="text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
                    {movie?.title}
                </p>
                <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                    {movie?.description}
                </p>
                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    <PlayButton movieId={movie?.id}/>
                    <button 
                    onClick={handleOPenModal}
                    className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row item-center hover:bg-opacity-20 transition" >
                    <svg className="mr-1 md:mr-2 text-white lg:h-6 lg:w-6 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" role="img" data-icon="CircleIStandard" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg>
                        More info
                    </button>
                    <FavoriteButton movie={movie}/>
                </div>
            </div>
        </div>
    )
}

export default Billboard;