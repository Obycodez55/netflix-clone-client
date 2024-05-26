import fetcher from "@/lib/fetcher"
import baseUrl from "@/Utils"
import useSWR from "swr"

const useBillboard = () => {
    const { data, error, isLoading } = useSWR(`${baseUrl}/movies/random`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
    return {
        data,
        error,
        isLoading
    }
}

export default useBillboard;