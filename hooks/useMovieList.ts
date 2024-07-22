import fetcher from "@/lib/fetcher"
import useSWR from "swr"
import { IMovieList } from "..";

const useMovieList= () => {
    let {data, error, isLoading, mutate} = useSWR("api/movieList", fetcher, {
        revalidateOnFocus: true,
        revalidateIfStale: true,
        revalidateOnReconnect: true
    });
    const lists = data as IMovieList[];
    return {
        lists, 
        error,
        isLoading,
        mutate
    }
}

export default useMovieList;