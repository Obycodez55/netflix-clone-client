import fetcher from "@/lib/fetcher"
import useSWR from "swr"

const useCurrentProfile= (endpoint? : string) => {
    const url = endpoint || "api/currentProfile";
    const {data, error, isLoading, mutate} = useSWR(url, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useCurrentProfile;