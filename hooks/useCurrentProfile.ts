import fetcher from "@/lib/fetcher"
import useSWR from "swr"
import { ProfileA } from "..";

const useCurrentProfile= (endpoint? : string) => {
    const url = endpoint || "api/currentProfile";
    let {data, error, isLoading, mutate} = useSWR(url, fetcher);
    const profile = data as ProfileA;
    return {
        profile,
        error,
        isLoading,
        mutate
    }
}

export default useCurrentProfile;