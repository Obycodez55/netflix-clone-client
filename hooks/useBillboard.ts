import fetcher from "@/lib/fetcher"
import baseUrl from "@/Utils"
import useSWR from "swr"
import { Movie } from "..";

const useBillboard = (type? : string) => {
    console.log(type)
    let url = `api/billboard`
    if (type) url = `api/billboard?type=${type}`;
    const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    const refetch = () => {
        mutate(url);
    };
    const movie = data as Movie;
    console.log(movie)
    return {
        movie,
        error,
        isLoading,
        refetch
    }
}

export default useBillboard;