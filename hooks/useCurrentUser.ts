import fetcher from "@/lib/fetcher"
import useSWR from "swr"
import { User } from "..";

const useCurrentUser = (endpoint? : string) => {
    const url = endpoint || "api/currentUser";
    const {data, error, isLoading, mutate} = useSWR(url, fetcher);
    const user = data as User;
    return {
        user,
        error,
        isLoading,
        mutate
    }
}

export default useCurrentUser;