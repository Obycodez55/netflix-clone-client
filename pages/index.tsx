import axios from "axios";
import { parse } from "cookie";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import { use } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { useRouter } from "next/router";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";

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
  const profile = req.headers.cookie
    ? parse(req.headers.cookie).profile
    : undefined;
  if (!profile)
    return {
      redirect: {
        destination: "/profiles",
        permanent: false
      }
    };
  return {
    props: {
      token
    }
  };
}

export default function Home() {
  const { movies } = useMovieList();

  const router = useRouter();
  const profileContext = useProfile();
  if (!profileContext) router.push("/profiles");  
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies}/>
      </div>
    </>
  );
}
