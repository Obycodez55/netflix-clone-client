import useCurrentUser from "@/hooks/useCurrentUser";
import { parse } from "cookie";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
    const req  = context.req as IncomingMessage;
    const token = req.headers.cookie? parse(req.headers.cookie) : undefined;
    if(!token) return {
          redirect: {
            destination: "/auth",
            permanent: false
          }
        }
    return {
      props: {
        token
      }
    }
  }

const Profiles = () =>{

    const {data: user} = useCurrentUser();
    console.log(user?.profiles);

    return (
        <div>
            <p className="text-white text-4xl">Profiles</p>
        </div>
    )
}

export default Profiles;