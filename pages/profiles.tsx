import useCurrentUser from "@/hooks/useCurrentUser";
import { parse } from "cookie";
import { IncomingMessage } from "http";
import { NextPageContext } from "next";
import Profile from '../components/profile';
import { ProfileA, User } from "..";

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

    const {data} = useCurrentUser();
    const user = data as User;
  const profiles = user?.profiles;
    return (
        <div className="flex items-center h-full justify-center">
           <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
           
           {profiles?.map((profile : ProfileA, index) => {
        return (
          <Profile
            key={index}
            id={profile.id}
            name={profile.name}
            color={profile.profilePic}
          />
        );
      })}
        </div>
           </div>
        </div>
    )
}

export default Profiles;