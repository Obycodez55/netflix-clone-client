import fetcher from "@/lib/fetcher"
import useSWR from "swr";
import { Movie } from "..";

const useMovie= (id? : string) => {
    let {data, error, isLoading, mutate} = useSWR(id? `api/currentProfile${id}` : null, fetcher, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnMount: false
    });
    const movie = data as Movie;
    return {
        movie,
        error,
        isLoading,
        mutate
    }
}

export default useMovie;