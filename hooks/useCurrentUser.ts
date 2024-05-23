import fetcher from "@/lib/fetcher"
import useSWR from "swr"

const useCurrentUser = (endpoint? : string) => {
    const url = endpoint || "api/currentUser";
    const {data, error, isLoading, mutate} = useSWR(url, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useCurrentUser;