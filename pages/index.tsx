import axios from "axios";
import { parse } from "cookie";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import { useProfile } from "@/contexts/ProfileContext";
import { useRouter } from "next/router";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import { useEffect } from "react";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";
import ContinueWatching from "@/components/ContinueWatching";
import { IMovieList } from "..";
import { Modal } from "@/components/Modal";
import Search from "@/components/Search";

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

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getMovieTitles (data: IMovieList[]) {
  const titles: string[] = [];
  data?.forEach(list => {
    if (list.title == "Most Watched" || list.title == "Most Loved") {
      list.data.forEach(movie => {
        titles.push(movie.title);
      });
    }
  });
  return titles;
}

export default function Home() {
  const { lists } = useMovieList();
  const router = useRouter();
  const text = router.query.search as string;
  const profileContext = useProfile();
  if (!profileContext) router.push("/profiles");
  const favourites = profileContext?.profile?.favourites;
  const myList = favourites?.map(fav => fav.movie);
  const continueWatching = profileContext?.profile?.ContinueWatching;
  const updateProfile = profileContext?.updateProfile;
  const shuffledLists = lists ? shuffleArray<IMovieList>(lists) : [];
  const {isOpen, closeModal} = useInfoModal();
  
  useEffect(() => {
    updateProfile!();
  }, []);
  return (
    <>
    {text && (
      <Modal onClose={()=> router.push("/")}>
      <Search text={text} placeholders={getMovieTitles(lists)} router={router}/>
    </Modal>
    )}
    <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar router={router}/>
      <Billboard />
      <div className="max-md:mt-8">
        <MovieList key="favourites" title="My List" data={myList!} ordered/>
        <ContinueWatching data={continueWatching!} />
        {shuffledLists.map(({title, data}) => (
          <MovieList key={title} title={title} data={data} />
        ))}
      </div>
    </>
  );
}
