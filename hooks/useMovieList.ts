import fetcher from "@/lib/fetcher"
import useSWR from "swr"
import { Movie } from "..";

const useMovieList= () => {
    let {data, error, isLoading, mutate} = useSWR("api/movieList", fetcher, {
        revalidateOnFocus: true,
        revalidateIfStale: true,
        revalidateOnReconnect: true
    });
    const movies = data as Movie[];
    return {
        movies, 
        error,
        isLoading,
        mutate
    }
}

export default useMovieList;