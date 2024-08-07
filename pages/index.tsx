/* eslint-disable react-hooks/exhaustive-deps */
import { parse } from "cookie";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import { useProfile } from "@/contexts/ProfileContext";
import { useRouter } from "next/router";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import { useEffect, useState } from "react";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";
import ContinueWatching from "@/components/ContinueWatching";
import { IMovieList } from "..";
import { Modal } from "@/components/Modal";
import Search from "@/components/Search";
import MovieSlider from "@/components/Swiper";

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

interface Query {
  search?: string
  series: string
  movies: string
  popular: string
}

export default function Home() {
  const { lists } = useMovieList();
  const router = useRouter();
  const {search, series, movies, popular} = router.query as unknown as Query;
  const profileContext = useProfile();
  if (!profileContext) router.push("/profiles");
  const favourites = profileContext?.profile?.favourites;
  let myList = favourites?.map(fav => fav.movie);
  let continueWatching = profileContext?.profile?.ContinueWatching;
  const updateProfile = profileContext?.updateProfile;
  const {isOpen, closeModal} = useInfoModal();
  const [shuffledLists, setShuffledLists] = useState<IMovieList[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  
  let billboardType : undefined | "series" | "movies";
  if (series){
    billboardType = "series";
    continueWatching = continueWatching?.filter(item => item.movie.isSeries == true);
    myList = myList?.filter(movie => movie.isSeries == true);
  }
  if (movies){
    billboardType = "movies"
    continueWatching = continueWatching?.filter(item => item.movie.isSeries == false);
    myList = myList?.filter(movie => movie.isSeries == false);
  } 

  useEffect(() => {
    updateProfile!();
}, []);

  useEffect(() => {
    setShuffledLists(lists ? shuffleArray<IMovieList>(lists) : []); 
}, [lists]);

  return (
    <>
    {search && (
      <Modal onClose={()=> router.push("/")}>
      <Search text={search} placeholders={getMovieTitles(lists)} router={router} setSearchOpen={setSearchOpen}/>
    </Modal>
    )}
    <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar router={router}/>
      <Billboard searchOpen={searchOpen} type={billboardType}/>
      <div className="max-md:mt-8 pb-20">
        <MovieList key="favourites" title="My List" data={myList!} ordered/>
        <ContinueWatching data={continueWatching!} />
        {shuffledLists.map(({title, data}) => (
          <MovieList key={title} title={title} data={data} />
        ))}
        {/* <MovieSlider movies={myList!} /> */}
      </div>
    </>
  );
}