import fetcher from "@/lib/fetcher"
import baseUrl from "@/Utils"
import useSWR from "swr"
import { Movie } from "..";

const useBillboard = (type? : string) => {
    let url = `api/billboard`
    if (type) url = `api/billboard?type=${type}`;
    const { data, error, isLoading } = useSWR(url, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
    const movie = data as Movie;
    return {
        movie,
        error,
        isLoading
    }
}

export default useBillboard;