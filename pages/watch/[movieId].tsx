import { useProfile } from "@/contexts/ProfileContext";
import useMovie from "@/hooks/useMovie";
import { parse } from "cookie";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
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
  console.log(movie)
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
            autoPlay
            controls
            className="h-full w-full"
            src={movie?.videoUrl}></video>
    </div>
    );
};

export default Watch;
