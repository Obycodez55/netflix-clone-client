import useBillboard from "@/hooks/useBillboard";

const Billboard = () =>{
    const { movie } = useBillboard();
    return (
        <div className="relative h-[56.25vw]">
            <video 
            className="
                w-full
                h-[56.25vw]
                object-cover
                brightness-[60%]
            "

            autoPlay
            loop
            muted
            poster={movie?.thumbnailUrl} 
            src={movie?.trailerUrl}>


            </video>
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                <p className="text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
                    {movie?.title}
                </p>
                <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                    {movie?.description}
                </p>
            </div>
        </div>
    )
}

export default Billboard;