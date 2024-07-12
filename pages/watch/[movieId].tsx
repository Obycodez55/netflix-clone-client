import { useProfile } from "@/contexts/ProfileContext";
import useMovie from "@/hooks/useMovie";
import { parse } from "cookie";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export async function getServerSideProps(context: NextPageContext) {
  const req = context.req as IncomingMessage;
  const token = req.headers.cookie
    ? parse(req.headers.cookie).token
    : undefined;
  if (!token)
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      }
    };
  return {
    props: {
      token
    }
  };
}

const Watch = () => {
  const router = useRouter();
  const {profile, updateProfile} = useProfile()!;
  const movieId = router.query.movieId as string;
  const {movie} = useMovie(movieId);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

    const handleFullscreen = () => {
     if (document.fullscreenElement) {
        document.exitFullscreen();
    } else if (videoRef.current) {
          const current = videoRef.current as any
            if (current.requestFullscreen) {
              current.requestFullscreen();
            } else if (current.mozRequestFullScreen) { /* Firefox */
                current.mozRequestFullScreen();
            } else if (current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                current.webkitRequestFullscreen();
            } else if (current.msRequestFullscreen) { /* IE/Edge */
                current.msRequestFullscreen();
            }
        }
    };
// TODO: TimeStamp Request
    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === 'f' || event.key === 'F') {
                handleFullscreen();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
      const videoElement = videoRef.current as any;
      console.log(currentTime.toFixed(2))
      const handleTimeUpdate = () => {
          if (videoElement) {
              setCurrentTime(videoElement.currentTime);
          }
      };

      if (videoElement) {
          videoElement.addEventListener('timeupdate', handleTimeUpdate);
          videoElement.focus(); // Focus on the video element when the component mounts
      }

      return () => {
          if (videoElement) {
              videoElement.removeEventListener('timeupdate', handleTimeUpdate);
          }
      };
  }, [currentTime]);

  return (
    <div className="h-screen w-screen bg-black">
        <nav 
            className="
                fixed
                w-full
                p-4
                z-10
                flex
                flex-row
                gap-8
                bg-black
                bg-opacity-70
            "
        >
            <AiOutlineArrowLeft onClick={() => router.back()} className="text-white cursor-pointer" size={40}/>
            <p className="text-white text-xl md:text-3xl font-bold">
                <span className="font-light">
                    Watching: 
                </span>
                {" "}{movie?.title}
            </p>
        </nav>
        <video 
        ref={videoRef}
            autoPlay
            controls
            className="h-full w-full"
            src={movie?.videoUrl}></video>
    </div>
    );
};

export default Watch;
